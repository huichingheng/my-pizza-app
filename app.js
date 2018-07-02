const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser());
let pizzas = [
  {
    id: "1",
    name: "hawaiian pizza",
    price: 20
  },
  {
    id: "2",
    name: "cheese pizza",
    price: 25
  },
  {
    id: "3",
    name: "cheese & bacon pizza",
    price: 45
  }
];

app.get("/pizzas", (req, res) => {
  res.send(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.find(pizza => pizza.id === req.params.id);
  res.send(pizza);
});

app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.send(pizzas);
});

app.put("/pizzas/:id", (req, res) => {
  let newPizzasList = pizzas.map(pizza => {
    if (pizza.id === req.params.id) {
      return { ...pizza, ...req.body };
    } else return pizza;
  });

  pizzas = newPizzasList;

  res.send(pizzas);
});

app.put("/pizzas/:name", (req, res) => {});

app.listen(PORT, () => {
  console.log(`ur app has started on port ${PORT}`);
});
