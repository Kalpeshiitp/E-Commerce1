import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProduct(result);
  };
//   console.warn(product);

  const deleteProduct=  async (id)=> {   //integrate delete product api
    let result = await fetch (`http://localhost:5000/products/${id}`,{
        method: "Delete",
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result = await result.json()
    if(result){
        getProducts();
    }
  }

  const searchHandle = async(event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
       if (result){
        setProduct(result);
       }
    } else{
      getProducts();
    }
 
  }

  return (
    <div className="product-list">
      <h3>Product list</h3>
      <input  onChange={searchHandle} className="product-search-box" type='text' placeholder="Search product"/>
      <ul>
        <li>S No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
       product.length>0 ? product.map((item,index)=>
        <ul key = {item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
         <Link to={"/update/"+item._id}>Update </Link></li> 
        
      </ul>
        )
        :
        <h1>No result found</h1>
      }
    </div>
  );
};

export default ProductList;
