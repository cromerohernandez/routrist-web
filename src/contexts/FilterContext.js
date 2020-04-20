import React from 'react'
import RoutristService from '../services/RoutristService'
import filtersHelper from '../helpers/filtersHelper'

const FilterContext = React.createContext()

export class FilterContextProvider extends React.Component {
  state = {
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
    /*if (this.state.filter.city) {*/
      this.getPlaces()
    /*} else {
      this.getCities()
    }*/
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter !== this.state.filter) {
      /*if (this.state.filter.city) {*/
        this.getPlaces()
      /*} else {
        this.getCities()
      }*/
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

  render() {
    const value = {
      filter: this.state.filter,
      overCategory: this.state.overCategory,
      places: this.state.places,
      setCategory: this.setCategory,
      setOverCategory: this.setOverCategory,
      resetOverCategory: this.resetOverCategory
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