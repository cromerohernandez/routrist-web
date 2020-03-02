import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'

class RouteDetail extends React.Component {
  state= {
    route: {}
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
          <h6>city: {city}</h6>
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

