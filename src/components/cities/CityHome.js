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
      sortDirection: 'desc',
      name: ''
    }
  }

  componentDidMount() {
    this.getPlaces()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter !== this.state.filter) {
      this.getPlaces()
    }
  }

  getPlaces = () => {
    const params = this.state.filter

    RoutristService.cityPlaces(params)
      .then(places => {
        this.setState({ places })
      })
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
        <h3>CityHome</h3>
        <h5>{ this.props.currentUser.name }</h5>
        <h6>{ this.props.currentUser.country }</h6>
        <img src={ this.props.currentUser.photo } alt="CityPhoto"/>

        <div>
          <button type="button" name="museum" onClick={this.handleCategory}>museums</button>
          <button type="button" name="garden" onClick={this.handleCategory}>gardens</button>
        </div>

        <input value={this.state.search} onChange={this.handleSearch} placeholder="Search..."/>

        <div>
          <button type="button" name="cityRate" onClick={this.handleSort}>City Rate</button>
          <button type="button" name="touristRate" onClick={this.handleSort}>Tourist Rate</button>
        </div>

        <div>
          <h5>Places</h5>
          <div>
            {this.state.places.map((place, i) => (
              <Link to={`/places/${place.id}`} key={i}>
                <PlaceCard place={place}/>
              </Link>
            ))}
          </div>

          <div>
            <Link to={'/places/new'}>Add Place</Link>
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