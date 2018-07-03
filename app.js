const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());
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
  res.json(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.find(pizza => pizza.id === req.params.id);
  res.json(pizza);
});

//[...original,updated]
app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.json(pizzas);
});

// {...original, ...updated}
app.put("/pizzas/:id", (req, res) => {
  let newPizzasList = pizzas.map(pizza => {
    if (pizza.id === req.params.id) {
      return { ...pizza, ...req.body };
    } else return pizza;
  });
  
  pizzas = newPizzasList;
  
  res.json(pizzas.find(pizza => pizza.id === req.params.id));
});


app.delete("/pizzas/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => {
    return pizza.id !== req.params.id;
  });
  res.json(pizzas);
});


module.exports = app
