import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  let auth = localStorage.getItem("user");
const navigate = useNavigate()
  const logout = ()=>{
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div>
      <img alt="logo" className="logo" src="image/div.jpg" />
      {/* <img alt="logo" className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaqg_TDpG4PnIeKZWClzaahw5rwZMXn0M-9mAkKU&s"/> */}
      {auth?  <ul className="Nav-ul">
        <li><Link to="/">Product</Link> </li>
        <li><Link to="/add">Add product</Link></li>
        <li> <Link to="/update">Update product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>  <Link onClick={logout}  to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
      :
      <ul className="Nav-ul Nav-right">
        <li><Link to = "/login">Login Page</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
      </ul>
}
    </div>
  );
};
export default Nav;
