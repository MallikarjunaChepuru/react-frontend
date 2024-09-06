import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");

      const firmId = localStorage.getItem("firmId");
      if (!loginToken || !firmId) {
        console.error("user not authenticated");
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      formData.append("image", image);
      category.forEach((value) => {
        formData.append("category", value);
      });
      const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:"POST",
        
        body:formData
      })

      const data=await response.json()
      console.log(data)
      if (response.ok){
        alert('product added successfully')
      }
      setProductName("")
      setPrice("")
      setCategory([])
      setBestSeller(false)
      setImage(null)
      setDescription("")

    } catch (error) {
      console.error(error.message)
      alert("filated to added product")
    }
  };
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input
          onChange={(e) => setProductName(e.target.value)}
          name="productName"
          value={productName}
          placeholder="Enter ProductName"
          type="text"
        />

        <label>Price</label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          value={price}
          placeholder="Enter product price"
          type="text"
        />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                onChange={handleCategoryChange}
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input
                type="radio"
                onChange={handleBestSeller}
                value="true"
                checked={bestSeller === true}
              />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input
                type="radio"
                onChange={handleBestSeller}
                value="false"
                checked={bestSeller === false}
              />
            </div>
          </div>
        </div>
        <label>Decription</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />

        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
