import React from 'react'

import '../../stylesheets/PlaceCard.css'

const PlaceCard = ({ place, onClick }) => {
  const { name, photo, category, cityRate, touristsRate} = place

  return (
    <div value={place} onClick={onClick} id='placeCard-container'>
      <img src={photo}  id='placeCard-photo'/>
      <div id='placeCard-data'>
        <h5 id='placeCard-name'>{name}</h5>
        <h6 id='placeCard-category'>{category}</h6>
        <h6 id='placeCard-citiRate'>{cityRate}</h6>
      </div>
    </div>
  )
}

export default PlaceCard