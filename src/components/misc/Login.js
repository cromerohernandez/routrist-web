import React from 'react'
import { Link, Redirect } from 'react-router-dom'

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
      touch: {}
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

    const user = this.state.data

    this.setState(() => {  //??????????????
      RoutristService.login(user)
        .then(user => {
          console.log(`${this.props.currentUser}`)
          //this.props.setUser(user)
        })
        /*.catch(error => {
          const { message, errors } = error.response.data
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors
            }
          })
        })*/
    })
  }

  handleSubmitOut = (event) => {
    RoutristService.logout()
      .then(() => {
        return <Redirect to='/test'/>
      })
      .catch()
  }





  render() {
    const { data, errors, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    if (this.props.currentUser) {
      return <Redirect to='/'/>
    }

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
                type="text"
                name="password"
                placeholder="Password"
                value={data.password}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
            </div>

            <button disabled={anyError} type="submit">
              Log in
            </button>

          </form>
        </div>






        <form onSubmit={this.handleSubmitOut}>
            <button type="submit">
              Log out
            </button>

        </form>







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