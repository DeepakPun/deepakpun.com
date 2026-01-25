import { config } from '@dotenvx/dotenvx'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import path from 'path'
import { fileURLToPath } from 'url'
import engine from 'ejs-mate'
// import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
// import rateLimit from 'express-rate-limit'
import flash from 'connect-flash'
import methodOverride from 'method-override';

// Import database connection
import database from './config/database.js'

// Import routes
import projectRoutes from './routes/projectRoutes.js'

console.log('🧪 === FLASH IMPORT DEBUG START ===');
console.log('🧪 Flash import type:', typeof flash);
console.log('🧪 Flash value:', flash);
console.log('🧪 Flash constructor:', flash?.constructor?.name);

if (typeof flash === 'function') {
  console.log('✅ Flash is a function - good!');
} else if (typeof flash === 'object' && flash !== null) {
  console.log('🔍 Flash is an object, checking properties:');
  console.log('🔍 Flash keys:', Object.keys(flash));
  console.log('🔍 Flash.default:', typeof flash.default);
  if (typeof flash.default === 'function') {
    console.log('✅ Found flash.default function - using that');
    // You might need: const flashFn = flash.default;
  }
} else {
  console.log('❌ Flash is not a function or object:', typeof flash);
}
console.log('🧪 === FLASH IMPORT DEBUG END ===');

// ES6 __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure dotenvx based on environment
console.log('🔧 Configuring environment variables with dotenvx...');

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: Using environment variables');
  // In production, dotenvx will use environment variables set by Docker/system
  config();
  // config({ path: '.env.local' });
} else {
  console.log('Development mode: Loading .env file');
  // In development, load from .env file
  config({ path: '.env.local' });
  console.log(`database url: ${process.env.MONGODB_URI_FULLSTACK}`)
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
const app = express()
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/fullstack' : '';
// const BASE_PATH = 'http://localhost:3002'
const PORT = process.env.PORT || 3002;

console.log(`Base path: ${BASE_PATH}`);
if (process.env.NODE_ENV === 'production') {
  // In production: serve /fullstack/static/* from public/
  app.use('/static', express.static(path.join(__dirname, 'public')));
  console.log('Production: Static files served at /fullstack/static');
} else {
  // In development: serve /static/* from public/
  app.use('/static', express.static(path.join(__dirname, 'public')));
  console.log('Development: Static files served at /static');
}

// Initialize Express app
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => res.status(204).end());

// Security middleware
// Temporary for testing
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "https://cdn.jsdelivr.net",
//         "https://fonts.googleapis.com",
//         "https://kit.fontawesome.com"
//       ],
//       scriptSrc: [
//         "'self'",
//         "https://cdn.jsdelivr.net",
//         "https://kit.fontawesome.com"         // FontAwesome JS
//       ],
//       fontSrc: [
//         "'self'",
//         "https://fonts.googleapis.com",
//         "https://kit.fontawesome.com",
//         "data:"
//       ],
//       imgSrc: ["'self'", "data:", "https:"],
//       connectSrc: ["'self'"]
//     },
//   },
//   crossOriginEmbedderPolicy: false
// }));

app.use(compression());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: process.env.NODE_ENV === 'production' ? 100 : 1000, // More lenient in development
//   message: {
//     error: 'Too many requests',
//     message: 'Please try again later'
//   }
// });
// app.use(limiter);

// CORS configuration
// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
//       'http://localhost:3000',
//       'http://localhost:3001',
//       'https://www.deepakpun.com',
//       'https://deepakpun.com'
//     ];

//     // Allow requests with no origin (mobile apps, etc.)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions))

// View engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
// app.use(`${BASE_PATH}/public`, express.static(path.join(__dirname, 'public'), {
//   maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0'
// }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

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
    sameSite: 'lax'
  }
}));
console.log('✅ Session store configured');

app.use((req, res, next) => {
  if (req.path.includes('/flash-test') || req.path.includes('/projects')) {
    console.log(`\n🔍 === ${req.method} ${req.path} - START ===`);
    console.log('🔍 Session ID:', req.sessionID);
    console.log('🔍 Session flash BEFORE:', JSON.stringify(req.session.flash, null, 2));
    console.log('🔍 Full session:', JSON.stringify(req.session, null, 2));
  }
  next();
});

app.use(flash())

app.use((req, res, next) => {
  const ignoredPaths = ['/favicon.ico', '/.well-known'];
  if (ignoredPaths.some(path => req.path.startsWith(path))) {
    return next();
  }
  // res.locals.success = req.flash('success')
  // res.locals.error = req.flash('error')
  // res.locals.warning = req.flash('warning')
  // res.locals.info = req.flash('info')

  if (req.method === 'GET') {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');

    // Debug
    console.log(`📨 GET ${req.path} - Flash consumed:`, JSON.stringify({
      success: res.locals.success,
      error: res.locals.error,
      warning: res.locals.warning,
      info: res.locals.info
    }));

    // Debug
    console.log('RES.LOCALS:', JSON.stringify(res.locals))
    const hasMessages = res.locals.success.length > 0 || res.locals.error.length > 0 ||
      res.locals.info.length > 0 || res.locals.warning.length > 0;

    if (hasMessages) {
      console.log('📨 Flash messages for template:', {
        success: res.locals.success,
        error: res.locals.error,
        info: res.locals.info,
        warning: res.locals.warning
      });
    }
  }

  console.log('Flash messages set:', {
    success: res.locals.success,
    error: res.locals.error
  });
  next()
})

app.use((req, res, next) => {
  if (req.path.includes('/flash-test') || req.path.includes('/projects')) {
    console.log('🔍 Session flash AFTER middleware:', JSON.stringify(req.session.flash, null, 2));
    console.log('🔍 res.locals flash:', JSON.stringify({
      success: res.locals.success,
      error: res.locals.error
    }));
    console.log(`🔍 === ${req.method} ${req.path} - END ===\n`);
  }
  next();
});

// Routes
console.log('🛣️  Setting up routes...');

const PROJECTS_ROUTER_PATH = '/projects'

// Health check endpoint
app.get(`${BASE_PATH}/health`, (req, res) => {
  // app.get(`/health`, (req, res) => {
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
// app.use(`${BASE_PATH}/projects`, projectRoutes);
app.use(PROJECTS_ROUTER_PATH, (req, res, next) => {
  req.basePath = BASE_PATH
  res.locals.basePath = BASE_PATH
  next()
}, projectRoutes)
console.log('✅ Project routes mounted');

// Add this test route
app.get('/flash-test', (req, res) => {
  req.flash('success', 'Test message from GET route!');
  res.redirect(`${BASE_PATH}/projects`);
});

// Landing page route
app.get(`${BASE_PATH}/`, (req, res) => {
  // app.get(`/`, (req, res) => {
  try {
    console.log('📄 Rendering landing page');
    res.render('landing', { basePath: BASE_PATH });
  } catch (error) {
    console.error('❌ Error rendering landing page:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
    });
  }
});

app.get('/', (req, res) => {
  console.log('📄 Root route accessed, redirecting to base path')
  res.render('landing', { basePath: BASE_PATH });
})

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.originalUrl}`);
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      `${BASE_PATH}/`,
      `${BASE_PATH}/health`,
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

async function initializeApp() {
  try {
    console.log('🚀 Initializing application...');

    // Start server
    const server = app.listen(PORT, () => {
      console.log('🎉 ================================');
      console.log('✅ Full-Stack Server is running!');
      console.log(`🌐 Port: ${PORT}`);
      console.log(`📍 Base Path: ${BASE_PATH}`);
      console.log(`🔗 Local: http://localhost:${PORT}${BASE_PATH}/`);
      console.log(`🏥 Health: http://localhost:${PORT}${BASE_PATH}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log('🎉 ================================');
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received, shutting down gracefully...`);

      server.close(async () => {
        console.log('🛑 HTTP server closed');

        try {
          await database.disconnect();
          console.log('✅ Database disconnected');
          console.log('👋 Graceful shutdown complete');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Initialize the application
console.log('🚀 Starting Fullstack Application...');
initializeApp().catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
