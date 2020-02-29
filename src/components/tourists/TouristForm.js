import React from 'react'
import RoutristService from '../../services/RoutristService'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  firstName: val => val ? true : false,
  lastName: val => val ? true : false,
  username:  val => val.length >= 4,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length >= 8,
  photo: _ => true
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
        username: true,
        email: true,
        password: true
      },
      touch: {},
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

    const tourist = {
      ...this.state.data
    }

    RoutristService.signupTourist(tourist)
      .then(() => {
        this.setState({
          errors: {
            username: true,
            email: false,
            password: false
          }
        })
      })
      .catch(error => {
        const { message, errors } = error.response.data
        this.setState({
          errors: {
            ...this.state.errors,
            ...errors,
            message
          }
        })
        console.log({errors})
      })
  }

  render() {
    const { data, errors, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return(
      <div className="TouristForm">
        <h3>Sign up as Tourist</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={data.firstName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={data.lastName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            {touch.username && errors.username && (
              <div>
                Username needs at least 4 chars
              </div>
            )}
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
                {errors.email}
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
      </div>
    )
  }
}

export default TouristForm