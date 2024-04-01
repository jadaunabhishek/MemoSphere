import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout =()=>{
  localStorage.removeItem('token');
  navigate("/login");
}

  let location=useLocation();
  useEffect(()=>{
  })
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{borderBottom:'solid blue 2px'}}>
  <div className="container-fluid">
<img src={Logo} alt="" width="50"  style={{ paddingRight: '10px' }}/>

    <Link className="navbar-brand" to="#">MemoSphere</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} aria-current="page" to="/about">About</Link>
        </li>
  
        <li className="nav-item dropdown">
         
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
      
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">

       <Link className="btn btn-outline-info mx-2" to="/login" role="button" aria-disabled="true">Login</Link>
       <Link className="btn btn-outline-info mx-2" to="/signup" role="button" aria-disabled="true">Signup</Link>
      </form>:<button onClick={handleLogout} className="btn btn-outline-info mx-2">Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar