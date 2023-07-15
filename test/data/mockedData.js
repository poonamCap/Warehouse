
const mockedProducts = [
    {
      "id": "f74fb16e-62b2-4af1-abed-1a0516200d1b",
      "name": "Dining Chair",
      "price": {
        "amount": 429.99,
        "currency": "SEK"
      },
      "stock": 4
    },
    {
      "id": "014571de-30fc-4ae6-8d74-2f3641790e42",
      "name": "Dinning Table",
      "price": {
        "amount": 5999.99,
        "currency": "SEK"
      },
      "stock": 1
    }
  ]

  const mockedProduct = {
    "id": "f74fb16e-62b2-4af1-abed-1a0516200d1b",
    "name": "Dining Chair",
    "price": {
      "amount": 429.99,
      "currency": "SEK"
    },
    "stock": 4
  }

  const mockedNewProduct = {
    "name": "New Product",
    "price": {
      "amount": 200.99,
      "currency": "SEK"
    },
    "stock": 10
  }

  const mockedProductsJson ={
    products: [
      {
        "id": "f74fb16e-62b2-4af1-abed-1a0516200d1b",
        "name": "Dining Chair",
        "price": {
          "amount": 429.99,
          "currency": "SEK"
        },
        "stock": 4
      },
      {
        "id": "014571de-30fc-4ae6-8d74-2f3641790e42",
        "name": "Dinning Table",
        "price": {
          "amount": 5999.99,
          "currency": "SEK"
        },
        "stock": 1
      }
    ]
  }

  module.exports = {
    mockedProducts,
    mockedProduct,
    mockedNewProduct,
    mockedProductsJson
  };