import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import RouteCard from '../routes/RouteCard'
import '../../stylesheets/Home.css'
import '../../stylesheets/filter.css'
import '../../stylesheets/RouteCard.css'
import TouristProfile from './TouristProfile'

class TouristHome extends React.Component {
  state = {
    routes: [],
    filter: {
      name: ''
    }
  }

  getRoutes = () => {
    const params = this.state.filter

    RoutristService.touristRoutes(params)
      .then(routes => {
        this.setState({ routes })
      })
  }

  componentDidMount() {
    this.getRoutes()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter !== this.state.filter) {
      this.getRoutes()
    }
  }

  handleSearch = (event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        name: event.target.value
      }
    })
  }

  render() {
    return(
      <div id='home-conteiner'>
        <TouristProfile/>

        <div id ='home-section'>
          <h5 id='home-title'>routes</h5>

          <input value={this.state.filter.name} onChange={this.handleSearch} placeholder="Search..." id='filter-inputSearch'/>

          <div>
              <Link to={'/routes/new'} id ='profile-add'>+</Link>
          </div>

          <div>
            {this.state.routes.map((route, i) => (
              <Link to={`/routes/${route.id}`} key={i} id='routeCard-container'>
                <RouteCard route={route}/>
              </Link>
            ))}
          </div>

        </div>

      </div>
    )
  }
}

export default WithAuthConsumer(TouristHome)