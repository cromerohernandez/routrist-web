import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { WithFilterConsumer } from '../../contexts/FilterContext'

import '../../stylesheets/buttons.css'

class FilterInputSearch extends React.Component {

  render() {
    const { filter, setSearch } = this.props

    return(
      <div className="btn-filter-container">
        <input value={filter.search} onChange={setSearch} placeholder="Search..." />
      </div>
    )
  }
}

export default WithAuthConsumer(WithFilterConsumer(FilterInputSearch))