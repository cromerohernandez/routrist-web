import React from 'react'
import { Link } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import routristLogo from '../../images/routristLogo.png'
import '../../stylesheets/Login.css'
import '../../stylesheets/Form.css'
import '../../stylesheets/font.css'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  email: val => val.match(EMAIL_PATTERN),
}

class Login extends React.Component {
    state = {
      data: {
        email: '',
        password: ''
      },
      errors: {
        email: true
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
        <div id='login-container'>
          <img src={routristLogo} alt="routristLogo" id="login-logo"/>

          <form onSubmit={this.handleSubmit} id="form-container">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="form-input"
            />
            {touch.email && errors.email && (
              <div id="form-error">
                Invalid email format
              </div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={this.handleChange}
              id="form-input"
            />

            {this.state.invalid === true && (
              <div id="form-error">
                Invalid email or password
              </div>
            )}

            <button disabled={anyError} type="submit" id="form-submitButton" className="btn btn-outline-primary" aria-disabled="true">
              Log in
            </button>

          </form>

          <div>
            <h6 id="login-signUp">Sign up as ·
              <Link to={{
                pathname:'/signup',
                state: { 
                  userType: 'city' 
                }
              }} id="login-link">
                City
              </Link>
               · or · 
              <Link to={{
                pathname:'/signup',
                state: { 
                  userType: 'tourist' 
                }
              }} id="login-link">
                 Tourist·
              </Link>

            </h6>
          </div>
          
        </div>

      </div>
    )
  }
}

export default WithAuthConsumer(Login)