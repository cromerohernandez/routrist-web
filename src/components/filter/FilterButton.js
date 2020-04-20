import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { WithFilterConsumer } from '../../contexts/FilterContext'

import '../../stylesheets/buttons.css'

class FilterButton extends React.Component {

  render() {
    const { category, filter, overCategory, setCategory, setOverCategory, resetOverCategory } = this.props
    const iconOn = require(`../../images/${category}IconOn.png`)
    const iconOff = require(`../../images/${category}IconOff.png`)

    return(
      <div className="btn-filter-container">
        <button type="button" className={"btn-filter" + (filter.category.includes(category) ? " btn-filter-on" : " btn-filter-off")}>
          <img 
            src={filter.category.includes(category) ? iconOn : iconOff}
            alt={`${category}Icon`}
            name={category}
            onClick={setCategory}
            onMouseOver={setOverCategory}
            onMouseOut={resetOverCategory}
            className="btn-filter-img"
          />
        </button>

        {overCategory === category && (
          <h6 className="btn-filter-detail">{category}s</h6>
        )}
      </div>
    )
  }
}

export default WithAuthConsumer(WithFilterConsumer(FilterButton))