import React from 'react'
import '../stylesheets/App.css'
import { Switch, Route, Redirect/*, Router*/ } from 'react-router-dom'

import Home from './misc/Home'
import Signup from './misc/Signup'
import TouristHome from './tourists/TouristHome'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/signup" component={ Signup }/>


        <Route exact path="/test" component={ TouristHome }/>


        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App