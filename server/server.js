const express = require("express");
const cors = require("cors");
const pool = require("./db");
const tourRoutes = require("./routes/tours");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth"); // Добавляем маршруты аутентификации
app.use("/auth", authRoutes); // Используем маршруты


app.use((req, res, next) => {
    console.log(`Запрос: ${req.method} ${req.url}`);
    console.log("Параметры запроса:", req.params);
    next();
});

app.use("/tours", tourRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
