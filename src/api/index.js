const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const productRoute = require('./routes/product-route.js')
const { loadProducts } = require('./service/data-operations.js');


const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// require("./app/routes/turorial.routes")(app);
app.use("/products",productRoute);

// set port, listen for requests
// const PORT = process.env.PORT || 8085;
loadProducts()
  .then(() => {
    app.listen(8085, () => {
      console.log('Server is running on port 8085');
    });
  })
  .catch((err) => {
    console.error('Failed to load data:', err);
  });
