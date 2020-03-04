import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import Validation from '../auth/Validation'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  name: val => val ? true : false,
  country:  val => val ? true : false,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length > 8,
  shield: _ => true
}

const errorMessages = {
  name: 'name is required',
  country: 'country is required',
  email: 'invalid email format',
  password: 'password needs at least 8 chars'
}

class CityForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        country: '',
        email: '',
        password: '',
        shield: null
      },
      errors: {
        name: {
          active: true,
          message: errorMessages.name
        },
        country: {
          active: true,
          message: errorMessages.country
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

    const cityFormData = new FormData()
    cityFormData.append('name', data.name)
    cityFormData.append('country', data.country)
    cityFormData.append('email', data.email)
    cityFormData.append('password', data.password)
    cityFormData.append('shield', data.shield)

    RoutristService.signupCity(cityFormData)
      .then(
        () => {
          this.setState({
            errors: {
              name: {
                active: true,
                message: errorMessages.name
              },
              country: {
                active: true,
                message: errorMessages.country
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
      <div className="CityForm">
        <h3>Sign up as City</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={data.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.name && errors.name.active && (
              <div>
                { this.state.errors.name.message }
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="country"
              value={data.country}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.country && errors.country.active && (
              <div>
                { this.state.errors.country.message }
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
            <h6>shield</h6>
            <input
              type="file"
              name="shield"
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

export default CityForm