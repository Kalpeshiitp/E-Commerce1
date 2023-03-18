import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcomapny] = useState("");
  const param = useParams(); // use to get parameters like id
  const navigate = useNavigate();

  useEffect(() => {
    // to call function once
    getProductDetails();
  },[]);

  const getProductDetails = async () => {
    //for pre filled update form
    let result = await fetch(`http://localhost:5000/products/${param.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }); //fetch the id
    result = await result.json();
    setname(result.name); //pre filled the name
    setprice(result.price);
    setcategory(result.category);
    setcomapny(result.company);
  };

  const updateproduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/products/${param.id}`,{
    method: "Put",
    body: JSON.stringify({name, price, category, company}),
    headers:{
      'Content-Type': "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    } ) ;
    result = await result.json();
    console.warn(result)
    navigate('/');
    
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setname(e.target.value)} 
        value={name}
        placeholder="Enter name"
      ></input>

      <input
        className="inputBox"
        type="text"
        onChange={(e) => setprice(e.target.value)}
        value={price}
        placeholder="Enter price"
      ></input>

      <input
        className="inputBox"
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        value={category}
        placeholder="Enter category"
      ></input>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setcomapny(e.target.value)}
        value={company}
        placeholder="Enter company"
      ></input>
      <button onClick={updateproduct} className="appBtn" type="button">
        Update
      </button>
    </div>
  );
};
export default UpdateProduct;
