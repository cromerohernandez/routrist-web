import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'

const validators = {
  name: val => val ? true : false,
  category: _ => true,
  cityRate: _ => true
}

const errorMessages = {
  name: 'name is required'
}

class PlaceForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        category: '',
        cityRate: '',
        photo: null
      },
      errors: {
        name: {
          active: true,
          message: errorMessages.name
        },
        category: {
          active: true
        },
        cityRate: {
          active: true
        }
      },
      touch: {},
      success: {
        active: false,
        place: ''
      }  
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

  handleClick = (event) => {
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
          active: !valid
        }
      }
    })
    this.handleChange(event)
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

    const placeFormData = new FormData()
    placeFormData.append('name', data.name)
    placeFormData.append('category', data.category)
    placeFormData.append('cityRate', data.cityRate)
    placeFormData.append('photo', data.photo)

    RoutristService.createPlace(placeFormData)
      .then(
        (place) => {
          this.setState({
            data: {
              name: '',
              category: '',
              cityRate: '',
              photo: ''
            },
            errors: {
              name: {
                active: true,
                message: errorMessages.name
              },
              category: {
                active: true
              },
              cityRate: {
                active: true
              }
            },
            touch: {},
            success: {
              active: true,
              place: `${place.name}`,
            }
          })
          setTimeout(() => {
            this.setState({
              success: {
                active: false,
                place: '',
              }
            })
          }, 3000)
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

  handleCancel = () => {
    let path = '/'
    this.props.history.push(path)
  }

  render() {
    const { data, errors, touch, success } = this.state
    const anyError = Object.values(errors).some(x => x.active)

    return(
      <div>
        <h3>Add a Place</h3>
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
            <h5>category</h5>
            <button type="button" name="category" value="garden" onClick={this.handleClick}>garden</button>
            <button type="button" name="category" value="museum" onClick={this.handleClick}>museum</button>
          </div>

          <div>
            <h5>city's rate</h5>
            <button type="button" name="cityRate" value="1" onClick={this.handleClick}>1</button>
            <button type="button" name="cityRate" value="2" onClick={this.handleClick}>2</button>
            <button type="button" name="cityRate" value="3" onClick={this.handleClick}>3</button>
            <button type="button" name="cityRate" value="4" onClick={this.handleClick}>4</button>
            <button type="button" name="cityRate" value="5" onClick={this.handleClick}>5</button>
          </div>

          <div>
            <h6>photo</h6>
            <input
              type="file"
              name="photo"
              onChange={this.handleChange}
            />
          </div>

          <button disabled={anyError} type="submit">
            Add
          </button>

          <button type="button" onClick={this.handleCancel}>
            Cancel
          </button>

        </form>

        {success.active && (
          <h6>{success.place} has been created</h6>
        )}
        
      </div>
    )
  }
}

export default WithAuthConsumer(PlaceForm)