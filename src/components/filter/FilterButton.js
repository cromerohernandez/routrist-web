import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { WithFilterConsumer } from '../../contexts/FilterContext'

import buildingIconOn from '../../images/buildingIconOn.png'
import buildingIconOff from '../../images/buildingIconOff.png'
import gardenIconOn from '../../images/gardenIconOn.png'
import gardenIconOff from '../../images/gardenIconOff.png'
import monumentIconOn from '../../images/monumentIconOn.png'
import monumentIconOff from '../../images/monumentIconOff.png'
import museumIconOn from '../../images/museumIconOn.png'
import museumIconOff from '../../images/museumIconOff.png'
import squareIconOn from '../../images/squareIconOn.png'
import squareIconOff from '../../images/squareIconOff.png'
import worshipIconOn from '../../images/worshipIconOn.png'
import worshipIconOff from '../../images/worshipIconOff.png'


import '../../stylesheets/buttons.css'

class FilterButton extends React.Component {

  render() {
    const { category, filter, detailCategory, setCategory, setOverCategory, resetOverCategory } = this.props

    return(
      <div className="btn-filter-container">
        <button type="button" className={"btn-filter" + (filter.category.includes(category) ? " btn-filter-on" : " btn-filter-off")}>
          <img 
            src={filter.category.includes(category) ? buildingIconOn : buildingIconOff}  /*?????????????????????????????????????????????????????????*/
            alt={`${category}Icon`}
            name={category}
            onClick={setCategory}
            onMouseOver={setOverCategory}
            onMouseOut={resetOverCategory}
            className="btn-filter-img"
          />
        </button>

        {detailCategory === category && (
          <h6 className="btn-filter-detail">{category}</h6>
        )}
      </div>
    )
  }
}

export default WithAuthConsumer(WithFilterConsumer(FilterButton))