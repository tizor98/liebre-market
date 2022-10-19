const path = require("path");

const controller = {
   homepage: (req, res) => res.sendFile(path.resolve(__dirname, "../views/index.html")),
   addProduct: (req, res) => res.sendFile(path.resolve(__dirname, "../views/addProduct.html")),
}

module.exports = controller;