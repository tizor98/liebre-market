const express = require('express')
const path = require('path')

// Usar métodos put y delete
const methodOverride = require('method-override')

// Usar session y cookies para login y relacionados
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Requerir routers principales
const mainRoutes = require('./routes/mainRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

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
app.use(express.static(path.join(__dirname, "../public")))

// Configurar routers para direcciones principales
app.use("/", mainRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoutes)

// Inicializar servidor
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server initiated on http://127.0.0.1:${port}`))