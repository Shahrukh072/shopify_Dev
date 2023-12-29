require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const db = require("./config/database");
const  axios  = require("axios");
const cors = require("cors");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// secret keys
let apikey = process.env.API_KEY
let pass =   process.env.API_PASSWORD
let endpoint = 'products';
let url = `https://${apikey}:${pass}@shahrukh-developement.myshopify.com/admin/api/2022-10/${endpoint}.json`
  
// add product api
app.post("/add-products", (req, res) => {

  const { title, vendor, product_type } = req.body;

  console.log(title, vendor, product_type)

    if (!title || !vendor || !product_type) {
      return res.status(400).json({ error: "Please provide title, vendor, and product type" });
    }

    const newProductData = {
      product: {
        title: title,
        vendor: vendor,
        product_type: product_type
      }
    };

   // add product in shopify dev store
  axios.post(url, newProductData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
    const addedProduct = response.data.product; 
    return res.status(200).json({ addedProduct });
  })
  .catch(error => {
    console.error(error);
    return res.status(500).json({ error: "Failed to add product" });
  });
});


// get product
app.get("/get-products", (req, res) => {

  // fetch product from shopify dev store
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // console.log(response.data);
    const products = response.data.products; 
    return res.status(200).json({ products });
  })
  .catch(error => {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data" });
  });
});


app.listen(port, () => {
  console.log("Server running on port " + port);
});



