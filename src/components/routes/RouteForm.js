import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import filtersHelper from '../../helpers/filtersHelper'
import PlaceCard from '../places/PlaceCard'
import CurrentJourney from '../journeys/CurrentJourney'

class RouteForm extends React.Component {
  state = {
    data: {
      routeName: '',
    },
    journeys: [],
    currentJourney: 0,
    currentPlace: {},
    currentVisitingTime: '',
    cities: [],
    filter: {
      city: '',
      category: ['museum', 'garden'],
      sort: 'cityRate',
      sortDirection: 'desc',
      name: ''
    },
    startDate: null,
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

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  setStartDate = (event) => {
    const { value } = event.target

    this.setState({
      startDate: value
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
  
  handleSetCurrentJourney = (event) => {
    this.setState({
      currentJourney: Number(event.target.value)
    })
  }

  handleAddJourney = () => {
    const previousJourney = this.state.journeys.length

    if (this.state.journeys.length === 0) {
      const startDate = new Date(this.state.startDate)

      this.setState({
        journeys: [
          ...this.state.journeys,
          { 
            startDate: startDate,
            steps: []
          }
        ],
        currentJourney: previousJourney + 1
      })
    } else {
      const previousDate = this.state.journeys[this.state.journeys.length - 1].startDate
      const startDate = new Date(previousDate)
      new Date(startDate.setDate(startDate.getDate() + 1))

      this.setState({
        journeys: [
          ...this.state.journeys,
          { 
            startDate: startDate,
            steps: []
          }
        ],
        currentJourney: previousJourney + 1
      })
    }

  }

  handleSetCurrentVisitingTime = (event) => {
    this.setState({
      currentVisitingTime: event.target.value
    })
  }

  handleAddCurrentPlace = (event) => {
    const { journeys, currentJourney, currentVisitingTime } = this.state
    const place = this.state.currentPlace
    const step = {
      place: place,
      visitingTime: currentVisitingTime
    }
    const newJourneys = [...journeys]
    newJourneys[currentJourney - 1].steps.push(step)

    this.setState({
      journeys: newJourneys
    })
  }

  handleCreateRoute = () => {
    const routeName = this.state.data.routeName
    const city = this.state.filter.city
    const routeJourneys = [...this.state.journeys]

    for (let i = 0; i < routeJourneys.length; i++) {
      for (let j = 0; j < routeJourneys[i].length; j++) {
        routeJourneys[i].steps[j].map(place => place.id)
      }
    }

    const route = {
      name: routeName,
      city: city,
      journeys: routeJourneys
    }

    RoutristService.createRoute(route)
      .then(
        route => {
          return <Redirect to='/'/>
        },
        error => console.log(error)
      )
  }

  render() {
    const { data, journeys, currentJourney, currentPlace, currentVisitingTime, cities, filter, startDate, places } = this.state

    return (
      <div>
        <div>
          <h6>RouteForm</h6>
        </div>

        <div>
          {(!filter.city || !startDate) &&
            <div>
              <h6>Select the start date</h6>
              <input type="date" name="date" onChange={this.setStartDate}/>
              <h6>Select a city</h6>
              {cities.map((city, i) => (
                <button type="button" name={city.name} value={city.id} onClick={this.setCity} key={i}>{city.name}</button>
              ))}
            </div>
          }
        </div>

        <div>
          {places.length > 0 && startDate &&
            <div>
              <div>
                <h6>Start date: {startDate}</h6>
                <div>
                  <input type="text" value={data.routeName} name="routeName" onChange={this.handleChange} placeholder="route name"/>
                </div>
                <button type="button" onClick={this.handleAddJourney}>Add Journey</button>
                <div>
                  {journeys.map((journey, i) => (
                    <button type="button" value={i + 1} onClick={this.handleSetCurrentJourney} key={i}>Day {i+1}</button>
                  ))}
                </div>

                <div>
                  {currentJourney > 0 &&
                    <CurrentJourney journey={ journeys[currentJourney - 1] } />
                  }  
                </div>

                <button type="button" onClick={this.handleCreateRoute}>Create Route</button>
              </div>

              <div>
                {currentPlace &&
                  <div>
                    <h2>{currentPlace.name}</h2>
                    <input name={currentVisitingTime} value={currentVisitingTime} onChange={this.handleSetCurrentVisitingTime} placeholder="visiting time (min)"/>
                    <button type="button" disabled={!currentVisitingTime} onClick={this.handleAddCurrentPlace}>Add Place</button>
                  </div>
                }
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
                {places.map((place, i) => (
                  <PlaceCard place={place} onClick={() => this.setCurrentPlace(place)} key={i}/>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default WithAuthConsumer(RouteForm)