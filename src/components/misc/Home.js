import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import Login from '../auth/Login'
import CityHome from '../cities/CityHome'
import TouristHome from '../tourists/TouristHome'

class Home extends React.Component {
  render() {
    if (!this.props.currentUser) {
      return(
        <Login/>
      )
    } 
    
    switch (this.props.currentUser.type) {
      case 'city':
        return(
          <CityHome/>
        )
      case 'tourist':
        return(
          <TouristHome/>
        )
      default:
        return(
          <Login/>
        )
    }
  }
}

export default WithAuthConsumer(Home)