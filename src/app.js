import express from 'express'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import path from 'path'

// Usar métodos put y delete
import methodOverride from 'method-override'

// Usar session y cookies para login y relacionados
import session from 'express-session'
import cookieParser from 'cookie-parser'


// Requerir routers principales
import mainRoutes from './routes/mainRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

// App para gestionar aplicación
const app = express()

// Configurar funcionamiento de método post
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Usar métodos put y delete sobrescribiendo en formularios con _method
app.use(methodOverride('_method'))

// Configurar motor de vistas
app.set('view engine', 'ejs')
app.set('views', 'src/views')

// Habilitar el funcionamiento de session
app.use(session({secret: "Mensaje super secreto", resave: false, saveUninitialized: false}))
// Habilitar el uso de cookies
app.use(cookieParser())

// Habilitar carpeta de archivos estaticos
app.use(express.static(path.resolve(__dirname, '../public')))

// Configurar routers para direcciones principales
app.use("/", mainRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoutes)

// Inicializar servidor
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server initiated on http://127.0.0.1:${port}`))