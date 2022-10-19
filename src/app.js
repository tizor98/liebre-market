const express = require("express");
const path = require("path");

const main = require("./routes/main");
const users = require("./routes/users");

const app = express();

app.use(express.static("public"));

app.use("/", main);

app.use("/user", users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server initiated on port ' + port));