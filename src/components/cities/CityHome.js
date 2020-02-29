import React from 'react'
import { Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'

class CityHome extends React.Component {
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
        <h3>CityHome</h3>
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