import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import '../../stylesheets/Home.css'
import '../../stylesheets/filter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class TouristProfile extends React.Component {

  handleLogout = () => {
    this.props.logout()
      .then(() => {
        return <Redirect to='/'/>
      })
      .catch()
  }

  render() {
    return (
    <div id='profile-bar'>
      <img src={ this.props.currentUser.photo } alt="TouristPhoto" id='home-photo'/>

      <div id='profile-data'>
        <h5 id='profile-username'>{ this.props.currentUser.username }</h5>
        <div>
          <h6 id='profile-name'>{ this.props.currentUser.firstName }</h6>
          <h6 id='profile-name'>{ this.props.currentUser.lastName }</h6>
        </div>
      </div>

        <Link to="/">
          <FontAwesomeIcon icon={faHome}  id='profile-home'/>
        </Link>

        <form onSubmit={this.handleLogout}>
          <button type="submit" id='profile-logout'>←</button>
        </form>

    </div>
    )
  }
}

export default WithAuthConsumer(TouristProfile)