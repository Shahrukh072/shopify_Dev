require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const db = require("./config/database");
const  axios  = require("axios");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let apikey = process.env.API_KEY
let pass =   process.env.API_PASSWORD
let endpoint = 'products';
let url = `https://${apikey}:${pass}@shahrukh-developement.myshopify.com/admin/api/2022-10/${endpoint}.json`
  
app.post("/add-products", (req, res) => {

  const newProductData = {
    product: {
      title: "Shopify Test",
      vendor: "Test1",
      product_type: "Produt"

    }
  };


  axios.post(url, newProductData, {
    headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        }
  })
  .then(response => {
    // console.log(response.data);
    const addedProduct = response.data.product; 
    return res.status(200).json({ addedProduct });
  })
  .catch(error => {
    console.error(error);
    return res.status(500).json({ error: "Failed to add product" });
  });

})

app.get("/get-products", (req, res) => {
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


app.get("/", (req, res) => {
  res.send("Hey, server is runnning ")
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});



