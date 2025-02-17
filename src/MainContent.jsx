import React, { useEffect, useState } from "react";
import "./MainContent.css";
import Card from "./Card";
import Nav from "./Nav";
import AddTourForm from "./components/AddTourForm";
import { fetchTours } from "./api";

export default function MainContent() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours().then(setTours);
  }, []);

  const handleTourAdded = () => {
    fetchTours().then(setTours);
  };

  return (
    <>
    
      <Nav />
      <AddTourForm onTourAdded={handleTourAdded} />
      <hr class="hr-dashed">
      </hr>
      <div className="main">
        {tours.map((x) => (
          <Card key={x.title} {...x} />
        ))}
      </div>
    </>
  );
}
