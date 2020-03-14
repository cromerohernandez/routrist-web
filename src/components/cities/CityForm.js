import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'
import Validation from '../auth/Validation'
import '../../stylesheets/Form.css'
import '../../stylesheets/Signup.css'

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
      <div id='signup-container'>
        <h3 id='form-title'>Sign up as City</h3>

        <form onSubmit={this.handleSubmit} id="form-container">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={data.name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.name && errors.name.active && (
            <div id="form-error">
              { this.state.errors.name.message }
            </div>
          )}

          <input
            type="text"
            name="country"
            placeholder="country"
            value={data.country}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            id="form-input"
          />
          {touch.country && errors.country.active && (
            <div id="form-error">
              { this.state.errors.country.message }
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

          <div>
            <input
              type="file"
              name="shield"
              onChange={this.handleChange}
              id="form-input"
              placeholder="shield"
            />
          </div>

          <button disabled={anyError} type="submit" id="form-submitButton" className="btn btn-outline-primary" aria-disabled="true">
            Sign up
          </button>

        </form>

        <Link to="/" id='form-back'>←</Link>

      </div>
    )
  }
}

export default CityForm