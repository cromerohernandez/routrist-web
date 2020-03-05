import React from 'react'
import { Link } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import filtersHelper from '../../helpers/filtersHelper'
import PlaceCard from '../places/PlaceCard'

class RouteForm extends React.Component {
  state = {
    journeys: {},
    currentDay: '',
    currentPlace: {},
    cities: [],
    filter: {
      city: '',
      category: ['museum', 'garden'],
      sort: 'cityRate',
      sortDirection: 'desc',
      name: ''
    },
    places: []
  }
  
  componentDidMount() {
    if (this.state.filter.city) {
      this.getPlaces()
    } else {
      this.getCities()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter !== this.state.filter) {
      if (this.state.filter.city) {
        this.getPlaces()
      } else {
        this.getCities()
      }
    }
  }

  getCities = () => {
    RoutristService.getCities()
      .then(cities => {
        this.setState({ cities })
      })
  }

  getPlaces = () => {
    const params = this.state.filter

    RoutristService.getPlaces(params)
      .then(places => {
        this.setState({ places })
      })
  }

  setCity = (event) => {
    const { value } = event.target

    this.setState({
      filter: {
        ...this.state.filter,
        city: value
      }
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

  setCurrentPlace = (place) => {
    this.setState({
      currentPlace: place
    })
  }

  handleAddCurrentPlace = (place) => {
    this.
  }

  render() {
    const { route, currentDay, currentPlace, cities, filter, places } = this.state


    return (
      <div>
        <div>
          <h6>RouteForm</h6>
        </div>

        <div>
          {currentPlace &&
            <h2>{currentPlace.name}</h2>
          }

          <button type="button" value={currentPlace.id} onClick={this.handleAddCurrentPlace}>Add Place</button>
        </div>

        <div>
          <div>
            <button type="button" name="building" onClick={this.handleCategory}>buildings</button>
            <button type="button" name="garden" onClick={this.handleCategory}>gardens</button>
            <button type="button" name="monument" onClick={this.handleCategory}>monuments</button>
            <button type="button" name="museum" onClick={this.handleCategory}>museums</button>
            <button type="button" name="square" onClick={this.handleCategory}>squares</button>
            <button type="button" name="worship" onClick={this.handleCategory}>worship</button>
          </div>

          <input value={this.state.filter.name} onChange={this.handleSearch} placeholder="Search..."/>

          <div>
            <button type="button" name="cityRate" onClick={this.handleSort}>City Rate</button>
            <button type="button" name="touristRate" onClick={this.handleSort}>Tourist Rate</button>
          </div>
        </div>

        <div>
          {!filter.city && 
            <div>
              <h6>Select a city</h6>
              {cities.map((city, i) => (
                <button type="button" name={city.name} value={city.id} onClick={this.setCity} key={i}>{city.name}</button>
              ))}
            </div>
          }
        </div>

        <div>
          {places && 
            places.map((place, i) => (
              <PlaceCard place={place} onClick={() => this.setCurrentPlace(place)}/>
            ))
          }
        </div>

      </div>
    )
  }
}

export default WithAuthConsumer(RouteForm)