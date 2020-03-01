import React from 'react'
import { Link } from 'react-router-dom'

const Validation = () => {
  return(
    <div>
      <h5>We have sent you an email to confirm your account</h5>
      <h6>Check it and </h6><Link to="/">log in</Link><h6> to start!</h6>
    </div>
  )
}

export default Validation