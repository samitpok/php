const path = require('path');

const express = require("express");
const routes = require("./routes");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use("/",routes);
app.listen(port, ()=>{
    console.log("app listening on port:",port);
})