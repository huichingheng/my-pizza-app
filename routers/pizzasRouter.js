const express = require("express");
const router = express.Router();

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


router.get("/", (req, res) => {
  res.json(pizzas);
});

router.get("/:id", (req, res) => {
  const pizza = pizzas.find(pizza => pizza.id === req.params.id);
  res.json(pizza);
});

//[...original,updated]
router.post("/", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.json(pizzas);
});

// {...original, ...updated}
router.put("/:id", (req, res) => {
  let newPizzasList = pizzas.map(pizza => {
    if (pizza.id === req.params.id) {
      return { ...pizza, ...req.body };
    } else return pizza;
  });

  pizzas = newPizzasList;

  res.json(pizzas.find(pizza => pizza.id === req.params.id));
});

router.delete("/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => {
    return pizza.id !== req.params.id;
  });
  res.json(`pizza with id ${pizza.id} delete successfully`);
});

module.exports = router;
