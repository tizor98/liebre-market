// Read and upload .env file
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import path from 'path'

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

// Server set up
const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Server initiated on http://127.0.0.1:${port}`))