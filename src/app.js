// Read and upload .env file
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Import to monitor http request received
import morgan from 'morgan'
morgan('dev')

// Import to use put and delete methods
import methodOverride from 'method-override'

// Import to use session and cookies for login and related things
import session from 'express-session'
import cookieParser from 'cookie-parser'


// Import main routers
import mainRoutes from './routes/mainRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

// App to handle server
const app = express()
app.use(morgan('dev'))

// Post method config
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Use put and delete methods in forms with _method in url
app.use(methodOverride('_method'))

// Views engine config
app.set('view engine', 'ejs')
app.set('views', 'src/views')

// Enable session
app.use(session({secret: "Mensaje super secreto", resave: false, saveUninitialized: false}))
// Enable cookies
app.use(cookieParser())

// Enable static folder
app.use(express.static(path.resolve(__dirname, '../public')))

// Main routers config
app.use("/", mainRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoutes)

// Create error 404 if app does not catch the request with the previous endpoints
app.use((req, res, next) => {
   const err = new Error('This page was not found')
   err.status = 404
   next(err)
})

// Handle error created above
app.use((err, req, res, next) => {
   console.log(err)
   res.status(err.status || 500).render('error', { errorInfo: {
      message: err.message,
      path: req.path,
      error: req.app.get('env') === 'dev' ? err : {},
      user: req.session.userLogged
   }})
})

// Server set up
const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Server initiated on http://127.0.0.1:${port}`))