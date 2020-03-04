import axios from 'axios'
import servicesHelper from '../helpers/servicesHelper'

const http = axios.create({
  baseURL: process.env.REACT_APP_GOOGLE_MAPS_API_URL,
  withCredentials: true
})

const getLocation = (place, city, country) => {
  const queryPlace = servicesHelper.setSpaces(place)
  const queryCity = servicesHelper.setSpaces(city)
  const queryCountry = servicesHelper.setSpaces(country)
  const input = `${queryPlace}%20${queryCity}%20${queryCountry}`
  const fields = 'geometry'
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  
  return http.post(`/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=${fields}&key=${key}`)
}

export default {
  getLocation
}