import React from 'react'
import PlaceLine from '../places/PlaceLine'

const JourneyCard = ({ journey }) => {
  const { startDate, steps } = journey

  return (
    <div>
      <h5>{startDate}</h5>

      <div>
        <h6>steps</h6>
        {steps.map((step, i) => (
          <PlaceLine placeId={step.place} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default JourneyCard