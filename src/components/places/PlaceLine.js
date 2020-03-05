import React from 'react'
import RoutristService from '../../services/RoutristService'

class PlaceLine extends React.Component {
  state = {
    place: {}
  }

  componentDidMount() {
     RoutristService.placeDetail(this.props.placeId)
      .then(place => {
        this.setState({ place })
      })
  }

  render() {
    const { name, category, cityRate, touristsRate, photo } = this.state.place

    return (
      <div>
        <h5>{name}</h5>
        <h6>{category}</h6>
        <h6>{cityRate}</h6>
        <h6>{touristsRate}</h6>
        <img src={photo}/>
      </div>
    )
  }
}

export default PlaceLine