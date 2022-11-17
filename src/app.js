const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');


const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./controllers/productController");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Para configurar funcionamiento de método post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Para usar métodos put y delete sobrescribiendo en formularios con _method
app.use(methodOverride('_method'));

app.set("view engine", "ejs");

// Para habilitar el funcionamiento de session
app.use(session({secret: "Mensaje super secreto", resave: false, saveUninitialized: false}));
// Para habilitar el uso de cookies
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "../public")));

app.use("/", mainRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server initiated on http://127.0.0.1:${port}`));