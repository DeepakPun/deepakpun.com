import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenvx from '@dotenvx/dotenvx'

// Load environment variables
dotenvx.config()

const app = express()
const PORT = process.env.PORT || 3002
const BASE_PATH = process.env.BASE_PATH || '/fullstack'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// EJS Configuration
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes - NO REDIRECTS!

// Root route - render landing page directly
app.get('/', (req, res) => {
  console.log('📄 Root route - rendering landing page directly')
  try {
    res.render('landing', {
      basePath: BASE_PATH,
      title: 'Deepak Pun - Fullstack Service',
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
    })
  } catch (error) {
    console.error('❌ Error rendering landing page:', error)
    res.status(500).json({
      error: 'Template rendering failed',
      message: error.message
    })
  }
})

// Health check route
app.get(`${BASE_PATH}/health`, (req, res) => {
  console.log('📄 Health check accessed')
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    basePath: BASE_PATH,
    environment: process.env.NODE_ENV || 'development'
  })
})

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.originalUrl}`)
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    basePath: BASE_PATH,
    availableRoutes: [
      '/',
      `${BASE_PATH}/`,
      `${BASE_PATH}/health`,
    ]
  })
})

// Initialize app function
async function initializeApp() {
  try {
    console.log('🚀 Initializing Fullstack Service...')
    console.log(`📄 Views directory: ${path.join(__dirname, 'views')}`)
    console.log(`📄 Base path: ${BASE_PATH}`)
    console.log(`📄 Environment: ${process.env.NODE_ENV || 'development'}`)

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Fullstack service running on port ${PORT}`)
      console.log(`🌐 Access at: http://localhost:${PORT}/`)
      console.log(`🌐 Base path: http://localhost:${PORT}${BASE_PATH}/`)
      console.log(`🏥 Health check: http://localhost:${PORT}${BASE_PATH}/health`)
    })
  } catch (error) {
    console.error('❌ Failed to initialize app:', error)
    process.exit(1)
  }
}

// Start the application
initializeApp()
