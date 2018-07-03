const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/pizzas", (req, res) => {
  res.send(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.find(pizza => pizza.id === req.params.id);
  res.send(pizza);
});

//[...original,updated]
app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.send(pizzas);
});

// {...original, ...updated}
app.put("/pizzas/:id", (req, res) => {
  let newPizzasList = pizzas.map(pizza => {
    if (pizza.id === req.params.id) {
      return { ...pizza, ...req.body };
    } else return pizza;
  });
  
  pizzas = newPizzasList;
  
  res.send(pizzas);
});


app.delete("/pizzas/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => {
    return pizza.id !== req.params.id;
  });
  res.send(pizzas);
});


app.listen(PORT, () => {
  console.log(`ur app has started on port ${PORT}`);
});
