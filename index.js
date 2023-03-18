const express = require("express");
// const mongoose = require('mongoose')
require("./db/config"); // import the config component
const User = require("./db/User"); //  imort  the user component
const Product = require("./db/Product");
const app = express();
const cors = require("cors");
app.use(express.json()); // middleware (postman se aane wali api ko control karne me use hota hai)
app.use(cors());

const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.post("/register", async (req, resp) => {
  // arrow fun return the promise so we use async
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, please try after some time.",
          });
        }
        resp.send({ user, auth: token });
      });
      // resp.send(user);
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.post("/add-product",verifyToken,  async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products",verifyToken,  async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("No products found");
  }
});

app.delete("/products/:id",verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/products/:id",verifyToken, async (req, resp) => {
  //API to get single product
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.put("/products/:id",verifyToken,  async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key",verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function verifyToken (req,resp,next){
  let token = req.headers['authorization'];
  // console.warn("middileware is called",token)
  if(token){
    token =token.split(' ')[1];
    jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        resp.status(401).send({result:"please provide valid token"})
      }else{
        next();
      }
    })
  } else{
    resp.status(403).send({result:"Please add token with header"})
  }
}

app.listen(5000);
// const connectDb= async ()=>{
//      await mongoose.connect('mongodb://127.0.0.1/e-comm')
//     const productSchema = new mongoose.Schema({});

//     const product = mongoose.model('products',productSchema);
// const data = await product.find();
// console.warn(data);
// }
// connectDb();

// const conn = mongoose.createConnection();
// conn.model('products', productSchema);

//  mongoose.model('products',productSchema);
// const data = await mongoose.model('products').findOne();
// console.warn(data);
