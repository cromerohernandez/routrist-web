import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return(
    <div>
      <Link to={{
        pathname:'/signup',
        state: { 
          userType: 'city' 
        }
      }}>
        City
      </Link>
      <Link to={{
        pathname:'/signup',
        state: { 
          userType: 'tourist' 
        }
      }}>
        Tourist
      </Link>
    </div>
  )
}

export default Login