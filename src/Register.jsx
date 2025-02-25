import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api";
import "./Login.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 🚀 Для редиректа

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");  // Очистка сообщения
  
    // Регистрация пользователя
    const data = await registerUser(username, password);
  
    // Если ошибка при регистрации (например, логин уже существует), показываем сообщение
    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage(data.message);
  
      // 🚀 Через 2 секунды переводим на страницу входа
      setTimeout(() => navigate("/login"), 2000);
    }
  };
  

  return (
    <div className="centered-div">
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} /> <br></br>
        <input style={{ margin: "1rem" }} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} /> <br></br>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
    </div>
  );
}
