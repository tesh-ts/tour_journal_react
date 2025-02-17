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

module.exports = router;
