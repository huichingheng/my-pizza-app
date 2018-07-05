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
  expect(response.body).toEqual({ message: "hello pizzas" });
});

test("GET / should return an non-empty array", async () => {
  const response = await request(app).get("/pizzas");
  // console.log(response.body);
  expect(response.status).toEqual(200);
  const isThisAnArray = Array.isArray(response.body);
  expect(isThisAnArray).toEqual(true);
  expect(response.body.length).toBeGreaterThan(0);
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

test("PUT / should return the array with the updated pizza", async () => {
  const TEST_DATA = {
    id: "3",
    name: "bffslfkslfksl",
    price: 45
  };
  const response = await request(app)
    .put("/pizzas/3")
    .send({ name: "bffslfkslfksl" });
  expect(response.status).toEqual(200);

  // console.log(response.body);
  expect(response.body).toMatchObject(TEST_DATA);
});

test("DELETE / should return a 'delete successful' confirmation message", async () => {
  const ID = 2;
  const response = await request(app).delete(`/pizzas/${ID}`);
  expect(response.status).toEqual(200);
  expect(response.body).toEqual(`pizza with id ${ID} deleted successfully`);
});
