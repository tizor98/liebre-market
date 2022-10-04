const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "./views/index.html")));
app.get("/new-product", (req, res) => res.sendFile(path.resolve(__dirname, "./views/addProduct.html")));
app.get("/register", (req, res) => res.sendFile(path.resolve(__dirname, "./views/register.html")));
app.get("/login", (req, res) => res.sendFile(path.resolve(__dirname, "./views/login.html")));

app.listen(5000, () => console.log("Server initiated on port 5000"));