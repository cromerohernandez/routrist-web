import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import Validation from '../auth/Validation'

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
        userName: '',
        email: '',
        password: '',
        photo: ''
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
    const { name, value } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
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

    const tourist = {
      ...this.state.data
    }

    RoutristService.signupTourist(tourist)
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
      <div className="TouristForm">
        <h3>Sign up as Tourist</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              value={data.firstName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.firstName && errors.firstName.active && (
              <div>
                { this.state.errors.firstName.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="last name"
              value={data.lastName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.lastName && errors.lastName.active && (
              <div>
                { this.state.errors.lastName.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={data.username}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.username && errors.username.active && (
              <div>
                { this.state.errors.username.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={data.email}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.email && errors.email.active && (
              <div>
                { this.state.errors.email.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={data.password}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.password && errors.password.active && (
              <div>
                { this.state.errors.password.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="photo"
              placeholder="photo"
              value={data.photo}
              onChange={this.handleChange}
            />
          </div>

          <button disabled={anyError} type="submit">
            Sign up
          </button>

        </form>

        <Link to="/">back</Link>

      </div>
    )
  }
}

export default TouristForm