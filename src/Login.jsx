import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { loginUser } from "./api";
import "./Login.css";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🚀 Для редиректа

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      login(data.user);

      // 🚀 Редирект на главную
      navigate("/");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="centered-div">
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input  type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} /> <br></br>
        <input style={{ margin: "1rem" }} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} /> <br></br>
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  );
}
