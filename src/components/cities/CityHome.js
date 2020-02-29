import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import PlaceCard from '../places/PlaceCard'

class CityHome extends React.Component {
  state = {
    places: []
  }

  handleSubmit = () => {
    this.props.logout()
      .then(() => {
        return <Redirect to='/'/>
      })
      .catch()
  }

  componentDidMount() {
    RoutristService.cityPlaces()
      .then(places => {
        this.setState({ places })
      })
  }

  render() {
    return(
      <div>
        <h3>CityHome</h3>
        <h5>{ this.props.currentUser.name }</h5>
        <h6>{ this.props.currentUser.country }</h6>
        <div>
          <h5>Places</h5>
          <div>
            {this.state.places.map((place, i) => (
              <Link to={`/places/${place.id}`}>
                <PlaceCard place={place} key={i}/>
              </Link>
            ))}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            Log out
          </button>
        </form>
      </div>
    )
  }
}

export default WithAuthConsumer(CityHome)