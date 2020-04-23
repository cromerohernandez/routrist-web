import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { WithFilterConsumer } from '../../contexts/FilterContext'

import '../../stylesheets/buttons.css'

class FilterButtonSort extends React.Component {

  render() {
    const { sortCriteria, setSort } = this.props

    return(
      <div className="btn-filter-container">
        <button type="button" name={`${sortCriteria}Rate`} onClick={setSort} className="btn-filter">{sortCriteria} Rate</button>
      </div>
    )
  }
}

export default WithAuthConsumer(WithFilterConsumer(FilterButtonSort))