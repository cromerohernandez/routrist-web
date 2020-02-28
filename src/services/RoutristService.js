import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

//cities
const signupCity = (city) => http.post('/cities/new', city)

//tourists
const signupTourist = (tourist) => http.post('/tourists/new', tourist)

//sessions
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

export default {
  signupCity,
  signupTourist,
  login,
  logout
}