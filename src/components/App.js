import React from 'react'
import '../stylesheets/App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
//import AuthRoute from '../components/auth/AuthenticatedRoute' ////////////USAR!!!!
import Home from './misc/Home'
import Signup from './auth/Signup'
import PlaceForm from './places/PlaceForm'
import PlaceDetail from '../components/places/PlaceDetail'
import RouteForm from '../components/routes/RouteForm'
import RouteDetail from '../components/routes/RouteDetail'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/signup" component={ Signup }/>

        <Route exact path="/places/new" component={ PlaceForm }/>
        <Route exact path="/places/:id" component={ PlaceDetail }/>

        <Route exact path="/routes/new" component={ RouteForm }/>
        <Route exact path="/routes/:id" component={ RouteDetail }/>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App