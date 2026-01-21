import dotenvx from '@dotenvx/dotenvx'
if (process.env.NODE_ENV !== 'production') {
  // Load .env.local only in development
  dotenvx.config({ path: '.env.local' });
} else {
  // In production, use environment variables directly
  console.log('Production mode: Using environment variables');
}
import express from 'express'
import engine from 'ejs-mate'
import path from 'path'
// import flash from 'connect-flash'
import flash from 'express-flash-plus'
const __dirname = import.meta.dirname
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to database
import connectDB from './dbconnection/db.js'
connectDB()

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/fullstack' : ''
app.use(`${BASE_PATH}/public`, express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
import projectRoutes from './routes/projectRoutes.js'

app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI_FULLSTACK,
    collectionName: 'user_sessions',
    ttl: 24 * 60 * 60,
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.basePath = BASE_PATH
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

// Static files with bae path
// app.use(`${BASE_PATH}/public`, express.static('public'))

// app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//   res.locals.success = req.flash('success')
//   res.locals.error = req.flash('error')
//   next()
// })

console.log(`Base path: ${BASE_PATH}`)
app.get(`${BASE_PATH}/`, (req, res) => {
  res.render('landing')
})

// Mount Project Routes
app.use(`${BASE_PATH}/projects`, projectRoutes)

app.get(`${BASE_PATH}/health`, (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  res.status(200).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="30">
                <title>Health Check | Fullstack App</title>
                <style>
                :root {
                  --bg-color: #0a0a0c;
                  --card-bg: #16161a;
                  --status-green: #10b981;
                  --text-main: #ffffff;
                  --text-dim: #94a3b8;
                  }
                  
                  body {
                    background-color: var(--bg-color);
                    color: var(--text-main);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    }
                    
                    .card {
                      background: var(--card-bg);
                      padding: 2rem;
                      border-radius: 16px;
                      border: 1px solid #2d2d33;
                      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                      width: 100%;
                      max-width: 400px;
                      text-align: center;
                      }
                      
                      .status-badge {
                        display: inline-flex;
                        align-items: center;
                        background: rgba(16, 185, 129, 0.1);
                        color: var(--status-green);
                        padding: 0.5rem 1rem;
                        border-radius: 99px;
                        font-weight: 600;
                        font-size: 0.875rem;
                        margin-bottom: 1.5rem;
                        }
                        
                        .pulse {
                          height: 8px;
                          width: 8px;
                          background-color: var(--status-green);
                          border-radius: 50%;
                          display: inline-block;
                          margin-right: 8px;
                          box-shadow: 0 0 0 0 rgba(16, 185, 129, 1);
                          animation: pulse-green 2s infinite;
                          }
                          
                          @keyframes pulse-green {
                            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                            }
                            
                            h1 { font-size: 1.25rem; margin: 0 0 1rem 0; color: var(--text-main); }
                            
                            .stat-grid {
                              display: grid;
                              gap: 1rem;
                              text-align: left;
                              margin-top: 1.5rem;
                              border-top: 1px solid #2d2d33;
                              padding-top: 1.5rem;
                              }
                              
                              .stat-item { display: flex; justify-content: space-between; font-size: 0.9rem; }
                              .label { color: var(--text-dim); }
                              .value { font-family: "Fira Code", monospace; color: var(--text-main); }
                              
                              .footer { font-size: 0.7rem; color: #4b5563; margin-top: 2rem; }
                              </style>
                              </head>
                              <body>
                              <div class="card">
                              <div class="status-badge">
                              <span class="pulse"></span> System Operational
                              </div>
                              <h1>Fullstack App</h1>
                              
                              <div class="stat-grid">
                              <div class="stat-item">
                              <span class="label">Status</span>
                              <span class="value" style="color: var(--status-green)">OK 200</span>
                              </div>
                              <div class="stat-item">
                              <span class="label">Uptime</span>
                              <span class="value">${hours}h ${minutes}m ${seconds}s</span>
                              </div>
                              <div class="stat-item">
                              <span class="label">Region</span>
                              <span class="value">us-east-1</span>
                              </div>
                              </div>
                              
                              <p class="footer">Last Checked: ${new Date().toLocaleTimeString()} UTC</p>
                              </div>
                              </body>
                              </html>
                              `)
})

const port = 3002
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Full-Stack Server is running on port ${port}`)
  console.log(`Base path: ${BASE_PATH || '/'}`)
})