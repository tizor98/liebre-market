const express = require("express");
const path = require("path");
const app = express();

const main = require("./routes/main");
const users = require("./routes/users");

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/", main);

app.use("/user", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server initiated on port ' + port));