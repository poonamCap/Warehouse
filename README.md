# [Node/Express Warehouse Api]
This is warehouse api which exposes four endpoints.
- Get all products
- Get product
- Update stock of a product
- Create a new product

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies

# Application Structure

- `index.js` - The entry point to our application. This file defines our express server.
- `routes/` - This folder contains the route definitions for our API.
- `controllers/` - This folder contains the the functions to handle api requests.
- `service/` - This folder contains the the functions to do business level operations.
- `middleware/` - This folder contains the the functions for error handling and validation.

# Further things to do
-Can add more workflows to deployment
-Need to write more tests like integration testing and performance testing and achive more test coverage.
-Can be integrated with various systems like slack,black duck,opentelemetry
-Need to implement security to access this api
