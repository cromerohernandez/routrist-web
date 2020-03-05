import React from 'react'
import '../../stylesheets/RouteCard.css'

const RouteCard = ({ route }) => {
  const { name, city } = route
  console.log(route)

  return (
    <div id='routeCard-div'>
      <h5 id='routeCard-name'>{name}</h5>
      <h6 id='routeCard-data'>{city.name}</h6>
    </div>
  )
}

export default RouteCard