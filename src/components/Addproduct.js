import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcomapny] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const addproduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    }
    console.warn(name, price, category, company);
    let userId = JSON.parse(localStorage.getItem("user"));
console.warn(userId._id);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
    navigate('/')
  };
  return (
    <div className="product">
      <h1>Add product</h1>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setname(e.target.value)}
        value={name}
        placeholder="Enter name"
      ></input>
      {error && !name && <span className="valid-input">Enter valid name</span>}
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setprice(e.target.value)}
        value={price}
        placeholder="Enter price"
      ></input>
      {error && !price && <span className="valid-input">Enter valid price</span>}
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        value={category}
        placeholder="Enter category"
      ></input>
      {error && !category && <span className="valid-input">Enter valid category</span>}
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setcomapny(e.target.value)}
        value={company}
        placeholder="Enter company"
      ></input>
      {error && !company && <span className="valid-input">Enter valid company</span>}
      <button onClick={addproduct} className="appBtn" type="button">
        Add product
      </button>
    </div>
  );
};
export default Addproduct;
