import React, { useEffect, useState, useContext } from "react";
import "./MainContent.css";
import Card from "./Card";
import AddTourForm from "./components/AddTourForm";
import { fetchTours } from "./api";
import { AuthContext } from "./AuthContext"; // Импортируем контекст

export default function MainContent() {
  const [tours, setTours] = useState([]);
  const { user } = useContext(AuthContext); // Получаем текущего пользователя из контекста

  useEffect(() => {
    fetchTours().then(setTours);
  }, []);

  const handleTourAdded = () => {
    fetchTours().then(setTours);
  };

  const handleTourDeleted = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  return (
    <>
      <AddTourForm onTourAdded={handleTourAdded} />
      <hr className="hr-dashed" />
      <div className="main">
        {tours.map((tour) => (
          <Card
          key={tour.id}
          {...tour}
          onDelete={user ? handleTourDeleted : null} // Если есть пользователь, передаем onDelete, если нет - null
        />
        
        ))}
      </div>
    </>
  );
}
