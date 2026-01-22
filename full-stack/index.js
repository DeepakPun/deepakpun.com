// full-stack/index.js
import { config } from '@dotenvx/dotenvx'
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import engine from 'ejs-mate';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';

// Import database connection
import database from './config/database.js';

// Import routes
import projectRoutes from './routes/projectRoutes.js';

// ES6 __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenvx based on environment
console.log('🔧 Configuring environment variables with dotenvx...');

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: Using environment variables');
  // In production, dotenvx will use environment variables set by Docker/system
  config();
} else {
  console.log('Development mode: Loading .env file');
  // In development, load from .env file
  config({ path: '.env' });
}

// Environment validation
console.log('🔍 Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SESSION_SECRET set:', !!process.env.SESSION_SECRET);
console.log('MONGODB_URI_FULLSTACK set:', !!process.env.MONGODB_URI_FULLSTACK);

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI_FULLSTACK',
  'SESSION_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });

  console.log('🔍 Available environment variables:');
  Object.keys(process.env)
    .filter(key => key.includes('MONGODB') || key.includes('SESSION'))
    .forEach(key => console.log(`   - ${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`));

  process.exit(1);
}

// Configuration
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/fullstack' : '';
const PORT = process.env.PORT || 3002;

console.log(`Base path: ${BASE_PATH}`);

// Initialize Express app
const app = express();

// Security middleware
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https:"],
//     },
//   },
//   crossOriginEmbedderPolicy: false
// }));

// app.use(compression());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://www.deepakpun.com',
      'https://deepakpun.com'
    ];

    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
// app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// View engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(`${BASE_PATH}/public`, express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0'
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  console.log('📄 Root route - rendering landing page directly')
  try {
    res.render('landing', {
      basePath: BASE_PATH,
      title: 'Deepak Pun - Fullstack Service',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error rendering landing page:', error)
    res.status(500).json({
      error: 'Template rendering failed',
      message: error.message
    })
  }
})

// Base path route - same landing page
app.get(`${BASE_PATH}/`, (req, res) => {
  console.log('📄 Base path route - rendering landing page directly')
  try {
    res.render('landing', {
      basePath: BASE_PATH,
      title: 'Deepak Pun - Fullstack Service',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error rendering landing page:', error)
    res.status(500).json({
      error: 'Template rendering failed',
      message: error.message
    })
  }
})

// Database connection and session setup
async function initializeApp() {
  try {
    console.log('🚀 Initializing application...');

    // Connect to database first
    console.log('📊 Connecting to database...');
    await database.connect();
    console.log('✅ Database connection established');

    // Session configuration (after database connection)
    console.log('🔐 Setting up session store...');
    app.use(session({
      name: 'sessionId',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI_FULLSTACK,
        collectionName: 'user_sessions',
        ttl: 24 * 60 * 60, // 1 day
        autoRemove: 'native',
        touchAfter: 24 * 3600 // lazy session update
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
      }
    }));
    console.log('✅ Session store configured');

    // Routes
    console.log('🛣️  Setting up routes...');

    // Landing page route
    // app.get(`${BASE_PATH}/`, (req, res) => {
      // try {
        // console.log('📄 Rendering landing page');
        // res.render('landing')
        // res.render('landing', {
        //   title: 'Deepak Pun Portfolio - Fullstack',
        //   basePath: BASE_PATH,
        //   environment: process.env.NODE_ENV,
        //   timestamp: new Date().toISOString()
        // });
    //   } catch (error) {
    //     console.error('❌ Error rendering landing page:', error);
    //     res.status(500).json({
    //       error: 'Internal server error',
    //       message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
    //     });
    //   }
    // });

    // Health check endpoint
    app.get(`${BASE_PATH}/health`, (req, res) => {
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: database.isConnectionReady() ? 'connected' : 'disconnected',
        basePath: BASE_PATH,
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
      };

      console.log('🏥 Health check requested');
      res.json(healthStatus);
    });

    // Mount project routes
    app.use(`${BASE_PATH}/projects`, projectRoutes);
    console.log('✅ Project routes mounted');

    // 404 handler
    app.use((req, res) => {
      console.log(`❌ 404 - Route not found: ${req.originalUrl}`);
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: [
          `${BASE_PATH}/`,
          `${BASE_PATH}/health`,
          // `${BASE_PATH}/api`,
          // `${BASE_PATH}/projects`
        ],
        timestamp: new Date().toISOString()
      });
    });

    // Error handler
    app.use((error, req, res, next) => {
      console.error('❌ Application error:', error);

      // Don't log stack traces in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Stack trace:', error.stack);
      }

      res.status(error.status || 500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
        timestamp: new Date().toISOString()
      });
    });

    // Start server
    const server = app.listen(PORT, () => {
      console.log('🎉 ================================')
      console.log('✅ Full-Stack Server is running!')
      console.log(`🌐 Port: ${PORT}`)
      console.log(`📍 Base Path: ${BASE_PATH}`)
      console.log(`🔗 Local: http://localhost:${PORT}${BASE_PATH}/`)
      console.log(`🏥 Health: http://localhost:${PORT}${BASE_PATH}/health`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
      console.log('🎉 ================================')
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received, shutting down gracefully...`)

      server.close(async () => {
        console.log('🛑 HTTP server closed')

        try {
          await database.disconnect()
          console.log('✅ Database disconnected')
          console.log('👋 Graceful shutdown complete')
          process.exit(0)
        } catch (error) {
          console.error('❌ Error during shutdown:', error)
          process.exit(1)
        }
      })

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))

  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  process.exit(1)
})

console.log('🚀 Starting Fullstack Application...')
initializeApp().catch(error => {
  console.error('❌ Failed to start application:', error)
  process.exit(1)
});


// import dotenvx from '@dotenvx/dotenvx'
// if (process.env.NODE_ENV !== 'production') {
//   // Load .env.local only in development
//   dotenvx.config({ path: '.env.local' });
// } else {
//   // In production, use environment variables directly
//   console.log(`DB_URL: ${process.env.MONGODB_URI_FULLSTACK}`)
//   console.log('Production mode: Using environment variables');
// }
// import express from 'express'
// import engine from 'ejs-mate'
// import path from 'path'
// // import flash from 'connect-flash'
// import flash from 'express-flash-plus'
// const __dirname = import.meta.dirname
// import methodOverride from 'method-override'
// import session from 'express-session'
// import MongoStore from 'connect-mongo'
// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Connect to database
// import connectDB from './dbconnection/db.js'
// connectDB()

// const BASE_PATH = process.env.NODE_ENV === 'production' ? '/fullstack' : ''
// app.use(`${BASE_PATH}/public`, express.static(path.join(__dirname, 'public')))

// app.engine('ejs', engine)
// app.set('view engine', 'ejs')
// app.use(methodOverride('_method'))
// import projectRoutes from './routes/projectRoutes.js'
// app.set('views', path.join(__dirname, 'views'))
// import mongoose from 'mongoose'
// app.use(session({
//   name: 'sessionId',
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({
//     // mongoUrl: process.env.MONGODB_URI_FULLSTACK,
//     client: mongoose.connection.getClient(),
//     collectionName: 'user_sessions',
//     ttl: 24 * 60 * 60,
//     autoRemove: 'native'
//   }),
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }))

// app.use(flash())

// app.use((req, res, next) => {
//   res.locals.basePath = BASE_PATH
//   res.locals.success = req.flash('success')
//   res.locals.error = req.flash('error')
//   next()
// })

// // Static files with bae path
// // app.use(`${BASE_PATH}/public`, express.static('public'))

// // app.use(express.static(path.join(__dirname, 'public')))

// // app.use((req, res, next) => {
// //   res.locals.success = req.flash('success')
// //   res.locals.error = req.flash('error')
// //   next()
// // })

// console.log(`Base path: ${BASE_PATH}`)
// app.get(`${BASE_PATH}/`, (req, res) => {
//   res.render('landing')
// })

// // Mount Project Routes
// app.use(`${BASE_PATH}/projects`, projectRoutes)

// app.get(`${BASE_PATH}/health`, (req, res) => {
//   const uptime = process.uptime();
//   const hours = Math.floor(uptime / 3600);
//   const minutes = Math.floor((uptime % 3600) / 60);
//   const seconds = Math.floor(uptime % 60);

//   res.status(200).send(`
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="refresh" content="30">
//                 <title>Health Check | Fullstack App</title>
//                 <style>
//                 :root {
//                   --bg-color: #0a0a0c;
//                   --card-bg: #16161a;
//                   --status-green: #10b981;
//                   --text-main: #ffffff;
//                   --text-dim: #94a3b8;
//                   }
                  
//                   body {
//                     background-color: var(--bg-color);
//                     color: var(--text-main);
//                     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     height: 100vh;
//                     margin: 0;
//                     }
                    
//                     .card {
//                       background: var(--card-bg);
//                       padding: 2rem;
//                       border-radius: 16px;
//                       border: 1px solid #2d2d33;
//                       box-shadow: 0 10px 25px rgba(0,0,0,0.5);
//                       width: 100%;
//                       max-width: 400px;
//                       text-align: center;
//                       }
                      
//                       .status-badge {
//                         display: inline-flex;
//                         align-items: center;
//                         background: rgba(16, 185, 129, 0.1);
//                         color: var(--status-green);
//                         padding: 0.5rem 1rem;
//                         border-radius: 99px;
//                         font-weight: 600;
//                         font-size: 0.875rem;
//                         margin-bottom: 1.5rem;
//                         }
                        
//                         .pulse {
//                           height: 8px;
//                           width: 8px;
//                           background-color: var(--status-green);
//                           border-radius: 50%;
//                           display: inline-block;
//                           margin-right: 8px;
//                           box-shadow: 0 0 0 0 rgba(16, 185, 129, 1);
//                           animation: pulse-green 2s infinite;
//                           }
                          
//                           @keyframes pulse-green {
//                             0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
//                             70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
//                             100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
//                             }
                            
//                             h1 { font-size: 1.25rem; margin: 0 0 1rem 0; color: var(--text-main); }
                            
//                             .stat-grid {
//                               display: grid;
//                               gap: 1rem;
//                               text-align: left;
//                               margin-top: 1.5rem;
//                               border-top: 1px solid #2d2d33;
//                               padding-top: 1.5rem;
//                               }
                              
//                               .stat-item { display: flex; justify-content: space-between; font-size: 0.9rem; }
//                               .label { color: var(--text-dim); }
//                               .value { font-family: "Fira Code", monospace; color: var(--text-main); }
                              
//                               .footer { font-size: 0.7rem; color: #4b5563; margin-top: 2rem; }
//                               </style>
//                               </head>
//                               <body>
//                               <div class="card">
//                               <div class="status-badge">
//                               <span class="pulse"></span> System Operational
//                               </div>
//                               <h1>Fullstack App</h1>
                              
//                               <div class="stat-grid">
//                               <div class="stat-item">
//                               <span class="label">Status</span>
//                               <span class="value" style="color: var(--status-green)">OK 200</span>
//                               </div>
//                               <div class="stat-item">
//                               <span class="label">Uptime</span>
//                               <span class="value">${hours}h ${minutes}m ${seconds}s</span>
//                               </div>
//                               <div class="stat-item">
//                               <span class="label">Region</span>
//                               <span class="value">us-east-1</span>
//                               </div>
//                               </div>
                              
//                               <p class="footer">Last Checked: ${new Date().toLocaleTimeString()} UTC</p>
//                               </div>
//                               </body>
//                               </html>
//                               `)
// })

// const port = 3002
// app.listen(port, '0.0.0.0', () => {
//   console.log(`✅ Full-Stack Server is running on port ${port}`)
//   console.log(`Base path: ${BASE_PATH || '/'}`)
// })