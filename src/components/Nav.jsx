import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Nav({count}) {
  return (
    <div className='nav-container' 
    style={{height:"2rem", display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"orange", padding:"10px 20px"}}>
    <Link to='/' style={{textDecoration:"none"}}>
       <h1>Recipe Searcher</h1>
    </Link>  
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Link to='/wishlist' style={{ position: "relative", display: "inline-block" }}>
    <FaRegHeart style={{ fontSize: "2rem", position: "relative" }} />
    {count > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          background: "red",
          color: "white",
          fontSize: "12px",
          borderRadius: "50%",
          width: "18px",
          height: "18px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {count}
      </span>
    )}
  </Link>
</div>

     
    </div>
  )
}

export default Nav
