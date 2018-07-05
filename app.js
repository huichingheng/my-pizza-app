const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const indexRouter = require("./routers/indexRouter");
const pizzasRouter = require("./routers/pizzasRouter");

app.use(express.json());
// app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/pizzas", pizzasRouter);

app.use(function(err, req, res, next) {
  res.status(500).json("My bad! Try again later");
});

app.use(function(req, res, next) {
  res.status(404).json("Sorry can't find that!");
});

module.exports = app;
