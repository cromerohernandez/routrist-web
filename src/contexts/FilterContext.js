import React from 'react'
import filtersHelper from '../helpers/filtersHelper'

const FilterContext = React.createContext()

export class FilterContextProvider extends React.Component {
  state = {
    filter: {
      city: '',
      category: ['museum', 'garden', 'building', 'worship', 'monument', 'square'],
      sort: 'cityRate',
      sortDirection: 'desc',
      name: ''
    },
    overCategory: ''
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