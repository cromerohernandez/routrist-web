import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import RouteCard from '../routes/RouteCard'

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

  handleLogout = () => {
    this.props.logout()
      .then(() => {
        return <Redirect to='/'/>
      })
      .catch()
  }

  render() {
    return(
      <div>
        <h3>TouristHome</h3>

        <div>
          <h5>{ this.props.currentUser.username }</h5>
          <h6>{ this.props.currentUser.firstName }</h6>
          <h6>{ this.props.currentUser.lastName }</h6>
          <img src={ this.props.currentUser.photo } alt="TouristPhoto"/>
        </div>

        <input value={this.state.filter.name} onChange={this.handleSearch} placeholder="Search..."/>

        <div>
          <button type="button" onClick={ () => {return <Redirect to='/routes/new'/>} }>Add route</button>
        </div>

        <div>
          <h5>Routes</h5>
          <div>
            {this.state.routes.map((route, i) => (
              <Link to={`/routes/${route.id}`} key={i}>
                <RouteCard route={route}/>
              </Link>
            ))}
          </div>

          <div>
            <Link to={'/routes/new'}>Add Route</Link>
          </div>
        </div>
 
        <form onSubmit={this.handleLogout}>
          <button type="submit">Log out</button>
        </form>

      </div>
    )
  }
}

export default WithAuthConsumer(TouristHome)