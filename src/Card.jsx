import './Card.css';
import location from './assets/location.svg';
import { deleteTour } from "./api";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return "Неверная дата"; 
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export default function Card(props) {
  const handleDelete = async () => {
    console.log("Удаляемый ID:", props.id);
    await deleteTour(props.id);
    props.onDelete(props.id); // Уведомляем родительский компонент о том, что тур удален
  };

  return (
    <div className='card-container'>
      <div className='main--container'>
        <img className='main-img' src={props.file} alt="" />
      </div>
      
      <div className='info'>
        <div className='location'>
          <img className='small-icon' src={location} alt="" />
          <h6>{props.location}</h6>
          <a href={props.googlemapsurl}>View on Google Maps</a>
        </div>
        <h2 className='title'>{props.title}</h2>
        <h6 className='date'>{formatDate(props.startdate)} - {formatDate(props.enddate)}</h6>
        <p className='description'>{props.description}</p>

        {/* Скрываем кнопку удаления, если onDelete не передан */}
        {props.onDelete && (
          <button className="delete-btn" onClick={handleDelete}>Удалить</button>
        )}
      </div>
    </div>
  );
}
