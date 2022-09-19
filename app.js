const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "./views/index.html")));

app.listen(5000, () => console.log("Servidor iniciado exitosamente en el puerto 5000"));