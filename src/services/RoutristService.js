import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

//cities
const signupCity = (city) => http.post('/cities/new', city)

export default {
  signupCity
}