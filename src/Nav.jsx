import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import fav2Image from './assets/fav2.png'; // Убедитесь, что путь правильный

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: "#606c38" }}>
    <div style={{ display: "flex", flexdirection: "row", alignItems: "center"}}>
        <img src={fav2Image} alt="Favorite" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
        <Link to="/" style={{ textDecoration: "none",  color: "black", lineheight: "center" }}>Travel Journal</Link>
    </div> 
      {user ? (
        <div>
          <span>{user.username}</span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Выйти</button>
        </div>
      ) : (
        <div >
          <Link to="/login" ><button>Вход</button></Link>
          <Link to="/register" style={{ marginLeft: "10px" }}><button>Регистрация</button></Link>
        </div>
      )}
    </nav>
  );
}
