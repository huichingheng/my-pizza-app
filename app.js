const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routers/indexRouter");
const pizzasRouter = require("./routers/pizzasRouter");

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/pizzas", pizzasRouter);

module.exports = app;
