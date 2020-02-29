import React from 'react'
import { Link } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  email: val => val.match(EMAIL_PATTERN),
  password: val => val ? true : false
}

class Login extends React.Component {
    state = {
      data: {
        email: '',
        password: ''
      },
      errors: {
        email: true,
        password: true
      },
      touch: {},
      invalid: false
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

    RoutristService.login({ ...this.state.data })
      .then(
        response => {
        this.props.setUser(response)
        },
        error => {
          const { errors } = error.response
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors
            },
            invalid: true
          })
        }
      )
  }

  render() {
    const { data, errors, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return(
      <div>
        <div>
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
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
            </div>

            {this.state.invalid === true && (
              <div>
                Invalid email or password
              </div>
            )}

            <button disabled={anyError} type="submit">
              Log in
            </button>

          </form>
        </div>

        <div>
          <h6>Sing up:</h6>

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
      </div>
    )
  }
}

export default WithAuthConsumer(Login)