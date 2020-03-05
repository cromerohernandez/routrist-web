import React from 'react'
import PlaceLine from '../places/PlaceLine'

const CurrentJourney = ({ journey }) => {
  const { startDate, steps } = journey

  return (
    <div>
      <h5>{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()}</h5>

      {steps && 
        <div>
          <h6>steps</h6>
          {steps.map((step, i) => (
            <PlaceLine placeId={step.place} key={i}/>
          ))}
        </div>
      }

    </div>
  )
}

export default CurrentJourney

