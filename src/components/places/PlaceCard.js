import React from 'react'

const PlaceCard = ({ place }) => {
  const { name, photo, category, cityRate, touristsRate} = place

  return (
    <div>
      <h5>{name}</h5>
      <h6>{category}</h6>
      <h6>{cityRate}</h6>
      <h6>{touristsRate}</h6>
    </div>
  )
}

export default PlaceCard