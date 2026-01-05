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
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://deepakpun.com', 'https://www.deepakpun.com']
    : [
      'http://127.0.0.1:5173', 'http://127.0.0.1:5174',
      'http://localhost:5173', 'http://localhost:5174'
    ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')); // 'dev' is cleaner for console, 'combined' for logs
}

// 2. HEALTH CHECK (Fastest possible response)
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: 'up',
    dbStatus,
    timestamp: new Date().toISOString()
  });
});

// 3. DOCUMENTATION (Before rate limiter so you don't block yourself while reading)
const swaggerDocument = YAML.load(path.join(import.meta.dirname, './config/swagger.yaml'))
// import swaggerDocument from './swagger.json' with { type: 'json'}
app.use('/api-docs', serve, setup(swaggerDocument, { customSiteTitle: "Projects API Docs" }))

// 4. RATE LIMITING (Apply to API logic only)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Increased to 100 for better UX during testing
  message: 'Too many requests, please try again later.'
})
app.use('/api/', limiter)

// 5. ROUTES
app.use('/api/v1/projects', portfolioGuard, projectRoutes)

// 6. 404 HANDLER (Must be after all routes)
app.all('{*splat}', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`)
  err.status = 404
  next(err)
})

// 7. GLOBAL ERROR HANDLER (Must be the very last middleware)
app.use(errorHandler) // Your imported handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

// 8. SERVER START
connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 API RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${port}`))
})
