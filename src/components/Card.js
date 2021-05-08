import React from 'react';
import './styles/Card.css';

function Card(props) {
  const animalName = props.value.replace(/_/g, ' ').replace(/123/g, `'`);
  return (
    <div className="card">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(./animalImages/${props.value}.jpg)`,
        }}
      ></div>
      <div className="card-text">{animalName}</div>
    </div>
  );
}

export default Card;
