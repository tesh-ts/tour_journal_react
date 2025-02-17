import './Card.css'
import location from './assets/location.svg'
import barcelonaImage from "./assets/barcelona.jpg";
import lisbonImage from "./assets/lisbon.jpg";
import dubrovnikImage from "./assets/dubrovnik.jpg";
import pragueImage from "./assets/prague.jpg";

const formatDate = (dateString) => {
  // Преобразуем строку в объект Date
  const date = new Date(dateString);

  // Проверяем на валидность даты
  if (isNaN(date)) {
    return "Неверная дата"; // Возвращаем сообщение о неверной дате
  }

  // Форматируем дату в формате: день.месяц.год
  const day = date.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль, если нужно
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц начинается с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`; // Возвращаем отформатированную дату
};

export default function Card(props) {
    console.log(props);
    console.log(props.startdate);
    
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
        </div>
      </div>
    );
  }
