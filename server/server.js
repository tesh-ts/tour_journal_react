const express = require("express");
const cors = require("cors");
const pool = require("./db");
const tourRoutes = require("./routes/tours");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tours", tourRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
