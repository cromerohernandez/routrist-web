import React from 'react'
import { Link } from 'react-router-dom'
import routristIcon from '../../images/routristIcon.png'
import '../../stylesheets/Validation.css'

const Validation = () => {
  return(
    <div id='validation-container'>
      <img src={routristIcon} alt='routristIcon' id='validation-icon'/>
      <h6>We have sent you an email to confirm your account</h6>
      <h5>Check it and <Link to="/" id='validation-link'> log in </Link> to start!</h5>
    </div>
  )
}

export default Validation