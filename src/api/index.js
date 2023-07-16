const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const productRoute = require('./routes/product-route.js')
const { loadProducts } = require('./service/data-operations.js');
const { errorHandler } = require('./middlewares/error-handler.js');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var corsOptions = {
  origin: "http://localhost:8085"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use("/products", productRoute);
app.use(errorHandler);

loadProducts()
  .then(() => {
    app.listen(8085, () => {
      console.log('Server is running on port 8085');
    });
  })
  .catch((err) => {
    console.error('Failed to load data:', err);
  });
