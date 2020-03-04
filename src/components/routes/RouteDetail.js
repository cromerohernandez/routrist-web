import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import PlaceCard from '../places/PlaceCard'

class RouteDetail extends React.Component {
  state= {
    route: {
      city: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    RoutristService.routeDetail(id)
      .then(route => {
        this.setState({ route })
      })
  }

  render() {
    const { name, city, startDate, endDate, places } = this.state.route

    return (
      <div>
        <div>
          <h5>{name}</h5>
          <h6>city: {city.name}</h6>
          <h6>Start Date: {startDate}</h6>
          <h6>End Date: {endDate}</h6>
        </div>

        <div>
          <h5>Places</h5>
          <div>

          </div>
        </div>

        <Link to="/">back</Link>
      </div>
    )
  }
}

export default RouteDetail

/*{places.map((place, i) => (
  <Link to={`/places/${place}`} key={i}>
    <PlaceCard place={place}/>
  </Link>
))}*/