import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/')
    }
    return Promise.reject(error)
  }
)

//cities
const signupCity = (city) => http.post('/cities/new', city)
const cityPlaces = () => http.get('/cities/me/places')

//tourists
const signupTourist = (tourist) => http.post('/tourists/new', tourist)

//places
const placeDetail = (placeId) => http.get(`/places/${placeId}`)

//sessions
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

export default {
  signupCity,
  cityPlaces,
  signupTourist,
  placeDetail,
  login,
  logout
}