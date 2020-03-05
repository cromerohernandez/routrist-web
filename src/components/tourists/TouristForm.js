import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import Validation from '../auth/Validation'
import '../../stylesheets/Form.css'
import '../../stylesheets/Signup.css'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  firstName: val => val ? true : false,
  lastName: val => val ? true : false,
  username:  val => val.length >= 4,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length >= 8
}

const errorMessages = {
  firstName: 'first name is required',
  lastName: 'last name is required',
  username: 'username needs at least 4 chars',
  email: 'invalid email format',
  password: 'password needs at least 8 chars'
}

class TouristForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        photo: null
      },
      errors: {
        firstName: {
          active: true,
          message: errorMessages.firstName
        },
        lastName: {
          active: true,
          message: errorMessages.lastName
        },
        username: {
          active: true,
          message: errorMessages.username
        },
        email: {
          active: true,
          message: errorMessages.email
        },
        password: {
          active: true,
          message: errorMessages.password
        }
      },
      touch: {},
      success: false
    }
  }

  handleChange = (event) => {
    const { name, value, files } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: files ? files[0] : value
      }
    })
  }

  handleBlur = (event) => {
    const { name, value } = event.target
    const valid = validators[name](value)

    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      },
      errors: {
        ...this.state.errors,
        [name]: {
          active: !valid,
          message: errorMessages[name]
        }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { data } = this.state

    const touristFormData = new FormData()
    touristFormData.append('firstName', data.firstName)
    touristFormData.append('lastName', data.lastName)
    touristFormData.append('username', data.username)
    touristFormData.append('email', data.email)
    touristFormData.append('password', data.password)
    touristFormData.append('photo', data.photo)

    RoutristService.signupTourist(touristFormData)
      .then(
        () => {
          this.setState({
            errors: {
              firstName: {
                active: true,
                message: errorMessages.firstName
              },
              lastName: {
                active: true,
                message: errorMessages.lastName
              },
              username: {
                active: true,
                message: errorMessages.username
              },
              email: {
                active: true,
                message: errorMessages.email
              },
              password: {
                active: true,
                message: errorMessages.password
              }
            },
            success: true
          })
        },
        error => {
          const { errors } = error.response.data
          const key = Object.keys(errors)[0]

          this.setState({
            errors: {
              ...this.state.errors,
              [key]: {
                active: true,
                message: errors[key]
              }
            }
          })
        }
      )
  }

  render() {
    const { data, errors, touch, success } = this.state
    const anyError = Object.values(errors).some(x => x.active)

    if (success) {
      return <Validation/>
    }

    return(
      <div  id='signup-container'>
        <h3 id='form-title'>Sign up as Tourist</h3>

        <form onSubmit={this.handleSubmit}  id="form-container">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            value={data.firstName}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.firstName && errors.firstName.active && (
            <div id="form-error">
              { this.state.errors.firstName.message }
            </div>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="last name"
            value={data.lastName}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.lastName && errors.lastName.active && (
            <div id="form-error">
              { this.state.errors.lastName.message }
            </div>
          )}

          <input
            type="text"
            name="username"
            placeholder="username"
            value={data.username}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.username && errors.username.active && (
            <div id="form-error">
              { this.state.errors.username.message }
            </div>
          )}

          <input
            type="text"
            name="email"
            placeholder="email"
            value={data.email}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.email && errors.email.active && (
            <div id="form-error">
              { this.state.errors.email.message }
            </div>
          )}

          <input
            type="password"
            name="password"
            placeholder="password"
            value={data.password}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.password && errors.password.active && (
            <div id="form-error">
              { this.state.errors.password.message }
            </div>
          )}

          <input
            type="file"
            name="photo"
            onChange={this.handleChange}
            id="form-input"
          />


        <button disabled={anyError} type="submit" id="form-submitButton" className="btn btn-outline-primary" aria-disabled="true">
          Sign up
        </button>

        </form>

        <Link to="/" id='form-back'>←</Link>

      </div>
    )
  }
}

export default TouristForm