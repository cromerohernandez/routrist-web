import axios from 'axios'
import QueryString from 'qs'

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
const cityPlaces = (params) => http.get('/cities/me/places', {
  params,
  paramsSerializer: (params) => {
    return QueryString.stringify(params, {arrayFormat: 'repeat'})
  }
})
const getCities = () => http.get('/cities')

//tourists
const signupTourist = (tourist) => http.post('/tourists/new', tourist)
const touristRoutes = (params) => http.get('/tourists/me/routes', {
  params,
  paramsSerializer: (params) => {
    return QueryString.stringify(params, {arrayFormat: 'repeat'})
  }
})
const getPlaces = (params) => http.get('/places', {
  params,
  paramsSerializer: (params) => {
    return QueryString.stringify(params, {arrayFormat: 'repeat'})
  }
})

//places
const createPlace = (place) => http.post('/places/new', place)
const placeDetail = (placeId) => http.get(`/places/${placeId}`)

//routes
const routeDetail = (routeId) => http.get(`/routes/${routeId}`)
const createRoute = (route) => http.post('routes/new', route)

//sessions
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

export default {
  signupCity,
  cityPlaces,
  getCities,
  signupTourist,
  touristRoutes,
  getPlaces,
  createPlace,
  placeDetail,
  routeDetail,
  createRoute,
  login,
  logout
}