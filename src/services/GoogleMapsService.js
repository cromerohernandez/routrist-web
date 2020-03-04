import axios from 'axios'
import servicesHelper from '../helpers/servicesHelper'

const http = axios.create({
  baseURL: process.env.REACT_APP_GOOGLE_MAPS_API_URL,
  //withCredentials: true
})

/*const getLocation = (place, city, country) => {
  const queryPlace = servicesHelper.setSpaces(place)
  const queryCity = servicesHelper.setSpaces(city)
  const queryCountry = servicesHelper.setSpaces(country)
  const input = `${queryPlace}%20${queryCity}%20${queryCountry}`
  const fields = 'geometry'
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  
  return http.get(`/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=${fields}&key=${key}`, {crossDomain: true})
}*/

const getLocation = (place, city, country) => {
  const queryPlace = servicesHelper.setSpaces(place)
  const queryCity = servicesHelper.setSpaces(city)
  const queryCountry = servicesHelper.setSpaces(country)
  const input = `${queryPlace}%20${queryCity}%20${queryCountry}`
  const fields = 'geometry'
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  
  return http.get(`/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=${fields}&key=${key}`, {
    mode: 'no-cors',
    headers: {
      'Access-Control-Allowed-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credential: 'same-origin',
  }).then(response => {})
}

export default {
  getLocation
}