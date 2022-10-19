const path = require("path");

const controller = {
   homepage: (req, res) => res.render(path.resolve(__dirname, "../views/index")),
   addProduct: (req, res) => res.render(path.resolve(__dirname, "../views/addProduct")),
}

module.exports = controller;