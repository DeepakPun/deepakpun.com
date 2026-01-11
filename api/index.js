import dotenvx from '@dotenvx/dotenvx'
// Needs to be changed before deployment
dotenvx.config({ path: '.env.local' })
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import connectDB from './database-connection/db.js'
const port = process.env.PORT || 3000
import projectRoutes from './routes/projectRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import YAML from 'yamljs'
import path from 'path'
import { serve, setup } from 'swagger-ui-express'
import { portfolioGuard } from './middleware/tempGuard.js'

const app = express()

// 1. GLOBAL MIDDLEWARES (Security & Compression first)
app.use(helmet())
app.use(compression())
// Environment-based CORS configuration
const getCorsOrigins = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';

  if (nodeEnv === 'production') {
    // Production origins (will be ALB URLs)
    return [
      process.env.FRONTEND_URL || 'https://your-alb-url.com',
      process.env.UI_URL || 'https://your-ui-alb-url.com'
    ];
  } else {
    // Development origins
    return [
      'http://localhost:3002',  // Docker UI service
      'http://localhost:5173',  // Vite dev server
      'http://localhost:5174',  // Vite dev server (alternative)
      'http://localhost:3000'   // React dev server
    ];
  }
};

const corsOptions = {
  origin: getCorsOrigins(),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
}

app.use(cors(corsOptions));

// debugging
console.log('CORS enabled for origins:', getCorsOrigins())

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: 'up',
    dbStatus,
    timestamp: new Date().toISOString()
  });
});

// 5. ROUTES
// This should come prior to / when using docker. 
app.use('/api/v1/projects', portfolioGuard, projectRoutes)

const swaggerDocument = YAML.load(path.join(import.meta.dirname, './config/swagger.yaml'))
// import swaggerDocument from './swagger.json' with { type: 'json'}
app.use('/', serve, setup(swaggerDocument, { customSiteTitle: "Projects API Docs" }))
// app.use('/api-docs', serve, setup(swaggerDocument, { customSiteTitle: "Projects API Docs" }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
})
app.use('/api/', limiter)


app.all('{*splat}', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`)
  err.status = 404
  next(err)
})

app.use(errorHandler)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

const startServer = () => {
  const server = app.listen(port, () => {
    console.log(`🚀 API RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${port}`)
  })

  const shutdown = (signal) => {
    console.log(`\nReceived ${signal}. Closing HTTP server...`)

    server.close(async () => {
      console.log('HTTP server closed.')

      try {
        await mongoose.connection.close()
        console.log('MongoDB connection closed.')
        process.exit(0)
      } catch (err) {
        console.error('Error during MongoDB closure:', err)
        process.exit(1)
      }
    })

    setTimeout(() => {
      console.error('Could not close connections in time, forceful shutdown')
      process.exit(1)
    }, 10000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
};

connectDB()
  .then(() => {
    startServer()
  })
  .catch((err) => {
    console.error('Database connection failed:', err)
    process.exit(1)
  })


