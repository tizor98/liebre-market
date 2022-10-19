const express = require("express");
const path = require("path");
const app = express();

const mainRoutes = require("./routes/main");
const usersRoutes = require("./routes/users");

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/", mainRoutes);

app.use("/user", usersRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server initiated on port ' + port));