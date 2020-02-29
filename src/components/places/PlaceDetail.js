import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'

class PlaceDetail extends React.Component {
  state= {
    place: []
  }

  componentDidMount() {
    const { id } = this.props.match.params

    RoutristService.placeDetail(id)
      .then(place => {
        this.setState({ place })
      })
  }

  render() {
    const { name, category, cityRate, touristsRate } = this.state.place

    return (
      <div>
        <h5>{name}</h5>
        <h6>category: {category}</h6>
        <h6>City Rate: {cityRate}</h6>
        <h6>Tourists Rate: {touristsRate}</h6>
        <Link to="/">back</Link>
      </div>
    )
  }
}

export default PlaceDetail