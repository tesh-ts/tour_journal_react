import { useState } from "react";
import "./AddTourForm.css";


export default function AddTourForm({ onTourAdded }) {
  const [tour, setTour] = useState({
    title: "",
    location: "",
    googleMapsUrl: "",
    startDate: "",
    endDate: "",
    description: "",
    file: "",
  });

  const handleChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tour),
    });
    if (response.ok) {
      onTourAdded();
      setTour({
        title: "",
        location: "",
        googleMapsUrl: "",
        startDate: "",
        endDate: "",
        description: "",
        file: "",
      });
    }
  };

  return (
    <form className="tour-form" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Город" value={tour.title} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Страна" value={tour.location} onChange={handleChange} required />
      <input type="text" name="googleMapsUrl" placeholder="Ссылка на карту" value={tour.googleMapsUrl} onChange={handleChange} required />
      <input type="date" name="startDate" placeholder="Дата начала" value={tour.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" placeholder="Дата конца" value={tour.endDate} onChange={handleChange} required />
      <textarea name="description" placeholder="Описание" value={tour.description} onChange={handleChange} required></textarea>
      <input type="text" name="file" placeholder="Ссылка на изображение" value={tour.file} onChange={handleChange} required />
      <button type="submit">Добавить тур</button>
    </form>
  );
}
