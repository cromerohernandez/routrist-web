import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import CityForm from '../cities/CityForm'
import TouristForm from '../tourists/TouristForm'

const Signup = () => {
  const location = useLocation()

  if (!location.state) {
    return(
      <Redirect to='/' />
    )
  } 
  
  switch (location.state.userType) {
    case 'city':
      return(
        <CityForm/>
      )
    case 'tourist':
      return(
        <TouristForm/>
      )  
    default:
      return(
        <Redirect to='/' />
      )
  }
}

export default Signup