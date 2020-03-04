import React from 'react'

const PlaceCard = ({ place, onClick }) => {
  const { name, photo, category, cityRate, touristsRate} = place

  return (
    <div value={place} onClick={onClick}>
      <h5>{name}</h5>
      <h6>{category}</h6>
      <h6>{cityRate}</h6>
      <h6>{touristsRate}</h6>
      <img src={photo}/>
    </div>
  )
}

export default PlaceCard