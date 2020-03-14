import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import PlaceLine from '../places/PlaceLine'
import '../../stylesheets/CurrentJourney.css'

const CurrentJourney = ({ journey }) => {
  const { startDate, steps } = journey

  return (
    <div>
      <h5 id='currentJourney-date'>{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()}</h5>

        {steps && 
          <div id='currentJourney-steps'>
            {steps.map((step, i) => (
              <PlaceLine placeId={step.place.id} visitingTime={step.visitingTime} key={i}/>
            ))}
          </div>
        }

    </div>
  )
}

export default WithAuthConsumer(CurrentJourney)



