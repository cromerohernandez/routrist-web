import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import '../../stylesheets/PlaceLine.css'

class PlaceLine extends React.Component {
  state = {
    place: {}
  }

  componentDidMount() {
     RoutristService.placeDetail(this.props.placeId)
      .then(place => {
        console.log(place)
        this.setState({ place })
      })
  }

  render() {
    const { name, category, cityRate, touristsRate, photo } = this.state.place

    return (
      <div id='placeLine-container'>
        <h5 id='placeLine-name'>{name}</h5>
        <h6 id='placeLine-time'>{this.props.visitingTime} min</h6>
        <img src={photo} id='placeLine-photo'/>
      </div>
    )
  }
}

export default WithAuthConsumer(PlaceLine)