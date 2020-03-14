import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import JourneyCard from '../journeys/JourneyCard'

class RouteDetail extends React.Component {
  state= {
    route: {
      city: {},
      journeys: []
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
    const { name, city, journeys } = this.state.route

    return (
      <div>
        <div>
          <h5>{name}</h5>
          <h6>city: {city.name}</h6>
       </div>

        <div>
          <h5>Journeys</h5>
          <div>
            {journeys.map((journey, i) => (
              <JourneyCard journey={journey} key={i}/>
            ))}
          </div>
        </div>

        <Link to="/">back</Link>
      </div>
    )
  }
}

export default RouteDetail

