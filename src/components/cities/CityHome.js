import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import PlaceCard from '../places/PlaceCard'
import filtersHelper from '../../helpers/filtersHelper'

class CityHome extends React.Component {
  state = {
    places: [],
    filter: {
      category: ['museum', 'garden'],
      sort: 'cityRate',
      sortDirection: 'desc'
    }
  }

  getPlaces = () => {
    RoutristService.cityPlaces(this.state.filter)
      .then(places => {
        this.setState({ places })
      })
  }

  componentDidMount() {
    this.getPlaces()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter != this.state.filter) {
      this.getPlaces()
    }
  }

  handleCategory = (event) => {
    const { name } = event.target
    const newCategory = filtersHelper.setCategory(this.state.filter.category, name)

    this.setState({
      filter: {
        ...this.state.filter,
        category: newCategory
      }
    })
  }

  handleSort = (event) => {
    const { name } = event.target
    const newSortCriteria = filtersHelper.setSort(this.state.filter.sort, this.state.filter.sortDirection, name)

    this.setState({
      filter: {
        ...this.state.filter,
        sort: newSortCriteria.sort,
        sortDirection: newSortCriteria.sortDirection,
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
        <h3>CityHome</h3>
        <h5>{ this.props.currentUser.name }</h5>
        <h6>{ this.props.currentUser.country }</h6>

        <div>
          <button type="button" name="museum" onClick={this.handleCategory}>museums</button>
          <button type="button" name="garden" onClick={this.handleCategory}>gardens</button>
        </div>

        <div>
          <button type="button" name="cityRate" onClick={this.handleSort}>City Rate</button>
          <button type="button" name="touristRate" onClick={this.handleSort}>Tourist Rate</button>
        </div>

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

        <form onSubmit={this.handleLogout}>
          <button type="submit">
            Log out
          </button>
        </form>

      </div>
    )
  }
}

export default WithAuthConsumer(CityHome)