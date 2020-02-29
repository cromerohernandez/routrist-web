import React from 'react'
import '../stylesheets/App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
//import AuthRoute from '../components/auth/AuthenticatedRoute' ////////////USAR!!!!
import Home from './misc/Home'
import Signup from './auth/Signup'
//import TouristHome from './tourists/TouristHome'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/signup" component={ Signup }/>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App