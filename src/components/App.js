import React from 'react'
import '../stylesheets/App.css'
import { Switch, Route, Redirect/*, Router*/ } from 'react-router-dom'

import Login from './misc/Login'
import Signup from './misc/Signup'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login }/>
        <Route exact path="/signup" component={ Signup }/>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App