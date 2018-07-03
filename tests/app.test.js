const request = require("supertest");
const app = require("../app");
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

test("descriptive message", () => {
  expect(1).toEqual(1);
});

test("GET / should return hello pizzas", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual({ message: "hello world" });
});

test("GET / should return if it is an array", async () => {
  const response = await request(app).get("/pizzas");
  const isThisAnArray = Array.isArray(response.body);
  expect(isThisAnArray).toEqual(true);
});

test("GET / should return the particular pizza detail", async () => {
  const response = await request(app).get("/pizzas/1");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual(pizzas[0]);
});

test("POST / should return the new pizzas list", async () => {
  const newPizza = {
    id: "4",
    name: "mushroom pizza",
    price: 23
  };
  const response = await request(app)
    .post("/pizzas")
    .send(newPizza);
  expect(response.status).toEqual(200);
  expect(response.body).toEqual([...pizzas, newPizza]);
});

test("PUT / should return the new pizza detail", async () => {
  const response = await request(app)
    .put("/pizzas/3")
    .send({ name: "bffslfkslfksl" });
  expect(response.status).toEqual(200);

  console.log(response.body);
  expect(response.body).toEqual({
    id: "3",
    name: "bffslfkslfksl",
    price: 45
  });
});
