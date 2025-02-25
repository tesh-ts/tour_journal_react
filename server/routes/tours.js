const express = require("express");
const router = express.Router();
const pool = require("../db");

// Получить все туры
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tours");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// В вашем сервере или файле маршрутов, например tours.js
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Запрос на получение тура с ID:", id); // Лог для отладки

  try {
    const result = await pool.query("SELECT * FROM tours WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send("Tour not found");
    }

    res.json(result.rows[0]); // Отправляем найденный тур
  } catch (err) {
    console.error("Ошибка в запросе:", err.message);
    res.status(500).send("Server error");
  }
});


// Добавить новый тур
router.post("/", async (req, res) => {
  const { title, location, googleMapsUrl, startDate, endDate, description, file } = req.body;
  try {
    const newTour = await pool.query(
      "INSERT INTO tours (title, location, googleMapsUrl, startDate, endDate, description, file) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, location, googleMapsUrl, startDate, endDate, description, file]
    );
    res.json(newTour.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Удалить тур по ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Попытка удалить тур с id:", req.params.id);
  try {
    const result = await pool.query("DELETE FROM tours WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      console.log("Тур не найден в БД");
      return res.status(404).json({ error: "Тур не найден" });
    }

    res.json({ message: "Тур удален" });
  } catch (err) {
    console.error("Ошибка при удалении тура:", err.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});



module.exports = router;
