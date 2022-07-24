import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";

const Header = () => {
    let { user } = useContext(AuthContext)
    console.log(user)
    return <div>
        <Link to="/">Home</Link>
        <span> | </span>
        { user ? <p>Logout</p> : <Link to="/login">Login</Link> }
        
        
        { user && <p>{user.username}</p> }
    </div>
}
export default Header