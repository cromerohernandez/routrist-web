import React from 'react'
import { Link } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import filtersHelper from '../../helpers/filtersHelper'
import PlaceCard from '../places/PlaceCard'

class RouteForm extends React.Component {
  state = {
    route: {

    },
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

  render() {
    const { route, currentDay, currentPlace, cities, filter, places } = this.state


    return (
      <div>
        <div>
          <h6>RouteForm</h6>
        </div>

        <div>
          {!filter.city && 
              cities.map((city, i) => (
                <button type="button" name={city.name} value={city.id} onClick={this.setCity} key={i}>{city.name}</button>
              ))
          }
        </div>

        <div>
          {currentPlace &&
            <h2>{currentPlace.name}</h2>
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