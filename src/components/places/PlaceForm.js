import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import RoutristService from '../../services/RoutristService'
import GoogleMapsService from '../../services/GoogleMapsService'
import '../../stylesheets/Form.css'
import '../../stylesheets/Signup.css'

const validators = {
  name: val => val ? true : false,
  category: _ => true,
  cityRate: _ => true,
  latitude: val => val ? true : false,
  longitude: val => val ? true : false
}

const errorMessages = {
  name: 'name is required',
  latitude: 'latitude is required',
  longitude: 'longitude is required',
}

class PlaceForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        category: '',
        cityRate: '',
        schedule: '',
        latitude: '',
        longitude: '',
        description: '',
        photo: null,
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
        },
        latitude: {
          active: true,
          message: errorMessages.latitude
        },
        longitude: {
          active: true,
          message: errorMessages.longitude
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

  handleLocation = () => {
    const place = this.state.data.name
    const city = this.props.currentUser.name
    const country = this.props.currentUser.country
    console.log('aqui1')
    GoogleMapsService.getLocation(place, city, country) 
      .then(
        resLocation => {
          console.log('aqui')
          const location = resLocation.cantidades.geometry.location

          this.setState({
            data: {
              ...this.state.data,
              latitude: location.lat,
              longitude: location.lng
            }
          })
        },
        error => {
          console.log('aqui3')

          console.log(error)
        }
      )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { data } = this.state

    const placeFormData = new FormData()
    placeFormData.append('name', data.name)
    placeFormData.append('category', data.category)
    placeFormData.append('cityRate', data.cityRate)
    placeFormData.append('photo', data.photo)
    placeFormData.append('schedule', data.schedule)
    placeFormData.append('latitude', data.latitude)
    placeFormData.append('longitude', data.longitude)
    placeFormData.append('description', data.description)

    RoutristService.createPlace(placeFormData)
      .then(
        place => {
          this.setState({
            data: {
              name: '',
              category: '',
              cityRate: '',
              schedule: '',
              latitude: '',
              longitude: '',
              description: '',
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
              },
              latitude: {
                active: true,
                message: errorMessages.latitude
              },
              longitude: {
                active: true,
                message: errorMessages.longitude
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
      <div id='addPlace-container'>
        <h3  id='form-title'>Add a Place</h3>
        <form onSubmit={this.handleSubmit}>
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

          <div>
            <div id='form-categoryTitleConteiner'>
              <h5>category</h5>
            </div>
          <div id='addPlace-section'>
            <button type="button" name="category" value="building" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">buildings</button>
            <button type="button" name="category" value="garden" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">gardens</button>
            <button type="button" name="category" value="monument" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">monuments</button>
            <button type="button" name="category" value="museum" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">museums</button>
            <button type="button" name="category" value="square" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">squares</button>
            <button type="button" name="category" value="worship" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">worship</button>
          </div>
          </div>

          <div>
            <div id='form-categoryTitleConteiner'>
              <h5>city's rate</h5>
            </div>
            <div id='addPlace-section'>
              <button type="button" name="cityRate" value="1" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">1</button>
              <button type="button" name="cityRate" value="2" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">2</button>
              <button type="button" name="cityRate" value="3" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">3</button>
              <button type="button" name="cityRate" value="4" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">4</button>
              <button type="button" name="cityRate" value="5" onClick={this.handleClick} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">5</button>
            </div>
          </div>

          <div id='addPlace-section'>
            <input
              type="text"
              name="schedule"
              placeholder="schedule"
              value={data.schedule}
              onChange={this.handleChange}
              id="form-input"
            />
          </div>

          <div id='addPlace-section'>
            <input
              type="text"
              name="latitude"
              placeholder="latitude"
              value={data.latitude}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="form-input"
            />
            {touch.latitude && errors.latitude.active && (
              <div id="form-error">
                { this.state.errors.latitude.message }
              </div>
            )}

            <input
              type="text"
              name="longitude"
              placeholder="longitude"
              value={data.longitude}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              id="form-input"
            />
            {touch.longitude && errors.longitude.active && (
              <div id="form-error">
                { this.state.errors.longitude.message }
              </div>
            )}

          </div>

          <div>
            <input
              type="text"
              name="description"
              placeholder="description"
              value={data.description}
              onChange={this.handleChange}
              id="form-input-description"
            />
          </div>

          <div>
            <input
              type="file"
              name="photo"
              onChange={this.handleChange}
              id="form-input"
            />
          </div>

          <button disabled={anyError} type="submit" id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">
            Add
          </button>

          <button type="button" onClick={this.handleCancel} id="form-submitButtonPlace" className="btn btn-outline-primary" aria-disabled="true">
            Cancel
          </button>

        </form>

        {success.active && (
          <h6 id="form-success">{success.place} has been created</h6>
        )}
        
      </div>
    )
  }
}

export default WithAuthConsumer(PlaceForm)


//<button type="button" disabled={!this.state.data.name} onClick={this.handleLocation}>Get location</button>