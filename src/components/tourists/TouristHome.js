import React from 'react'
import { Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'

class TouristHome extends React.Component {
  handleSubmit = () => {
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
        <h5>{ this.props.currentUser.username }</h5>
        <h6>{ this.props.currentUser.firstName }</h6>
        <h6>{ this.props.currentUser.lastName }</h6>

        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            Log out
          </button>
        </form>
      </div>
    )
  }
}

export default WithAuthConsumer(TouristHome)