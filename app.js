const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const routes = require("./routes");
require("dotenv").config();
require("./data/db.js")
const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/", routes);

app.listen(port, () => {
    console.log("app listening on port:", port);
});