import React from 'react'
import RoutristService from '../services/RoutristService'
import filtersHelper from '../helpers/filtersHelper'

const FilterContext = React.createContext()

export class FilterContextProvider extends React.Component {
  state = {
    cities: [],
    filter: {
      city: '',
      category: ['building', 'garden', 'monument', 'museum', 'square', 'temple'],

      sort: 'cityRate',
      sortDirection: 'desc',
      name: ''
    },
    overCategory: '',
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
    console.log('aqui')
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

  setCategory = (event) => {
    const { name } = event.target
    const newCategory = filtersHelper.setCategory(this.state.filter.category, name)

    this.setState({
      filter: {
        ...this.state.filter,
        category: newCategory
      }
    })
  }

  setOverCategory = (event) => {
    const { name } = event.target

    this.setState({
      overCategory: name
    })
  }

  resetOverCategory = () => {
    this.setState({
      overCategory: ''
    })
  }

  setSort = (event) => {
    const { name } = event.target
    const { sort, sortDirection } = this.state.filter
    const newSortCriteria = filtersHelper.setSort(sort, sortDirection, name)

    this.setState({
      filter: {
        ...this.state.filter,
        sort: newSortCriteria.sort,
        sortDirection: newSortCriteria.sortDirection,
      }
    })
  }

  setSearch = (event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        name: event.target.value
      }
    })
  }

  render() {
    const value = {
      cities: this.state.cities,
      filter: this.state.filter,
      overCategory: this.state.overCategory,
      places: this.state.places,
      setCity: this.setCity,
      setCategory: this.setCategory,
      setOverCategory: this.setOverCategory,
      resetOverCategory: this.resetOverCategory,
      setSort: this.setSort,
      setSearch: this.setSearch
    }

    return (
      <FilterContext.Provider value={value}>
        {this.props.children}
      </FilterContext.Provider>
    )
  }
}

export const WithFilterConsumer = (WrappedComponent) => (props) => (
  <FilterContext.Consumer>
    {(filterProps) => ( <WrappedComponent {...props} {...filterProps} />)}
  </FilterContext.Consumer>
)

export default FilterContext