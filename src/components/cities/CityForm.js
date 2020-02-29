import React from 'react'
import { Link } from 'react-router-dom'
import RoutristService from '../../services/RoutristService'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  name: val => val ? true : false,
  country:  val => val ? true : false,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length > 8,
  photo: _ => true
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
        photo: ''
      },
      errors: {
        email: true,
        password: true
      },
      touch: {}
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
        [name]: !valid
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const city = {
      ...this.state.data
    }

    RoutristService.signupCity(city)
      .then(
        () => {
          this.setState({
            errors: {
              email: false,
              password: false
            }
          })
        },
        error => {
          const { errors } = error.response
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors
            }
          })
        }
      )
  }

  render() {
    const { data, errors, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return(
      <div className="CityForm">
        <h3>Sign up as City</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={data.country}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.email && errors.email && (
              <div>
                Invalid email format
              </div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.password && errors.password && (
              <div>
                Password needs at least 8 chars
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="photo"
              placeholder="Photo"
              value={data.photo}
              onBlur={this.handleBlur}
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