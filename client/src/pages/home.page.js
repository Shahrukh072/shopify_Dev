import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"; 

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    vendor: "",
    product_type: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-products");
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (newProductData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/add-products",
        newProductData
      );
      console.log("New product added:", response.data);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({
      title: "",
      vendor: "",
      product_type: "",
    });
  };

  return (
    <section className="container">
      <h1>Products</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Vendor:
          <input
            type="text"
            name="vendor"
            value={newProduct.vendor}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Product Type:
          <input
            type="text"
            name="product_type"
            value={newProduct.product_type}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
      <div className="product-list">
        {Array.isArray(products) && products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <p>{product.title}</p>
                <p>{product.vendor}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
};

export default HomePage;
