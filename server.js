const PORT = process.env.PORT || 3000;
const app = require ("./app")

app.listen(PORT, () => {
    console.log(`ur app has started on port ${PORT}`);
  });
