import React from 'react'

const RouteCard = ({ route }) => {
  const { name, city } = route

  return (
    <div>
      <h5>{name}</h5>
      <h6>{city.name}</h6>
    </div>
  )
}

export default RouteCard