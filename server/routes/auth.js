const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Используй переменную окружения

// 📌 Регистрация пользователя
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log("Received data:", { username, password });
    console.log("Username type:", typeof username);
    console.log("Password type:", typeof password);
    try {
      // Проверка на существование пользователя с таким же username в базе данных
      const userExists = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "Пользователь с таким логином уже существует" });
      }
  
      // Хешируем пароль перед сохранением в БД
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Username:", userExists);
      console.log("Username type:", typeof userExists); // Проверим тип данных
      console.log("Hashed Password:", hashedPassword);

      const newUser = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
        

      );
  
      res.json({ message: "Пользователь зарегистрирован", user: newUser.rows[0] });
    } catch (err) {
      console.error("Ошибка при регистрации:", err.message, userExists, typeof userExists);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  

// 📌 Авторизация пользователя
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Находим пользователя в базе
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    const user = userResult.rows[0];

    // Проверяем введённый пароль с хешем из базы
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    // Создаём JWT-токен
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Вход выполнен успешно", token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error("Ошибка при входе:", err.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
