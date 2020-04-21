import React from 'react'
import '../stylesheets/App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FilterContextProvider } from '../contexts/FilterContext'
import { WithAuthConsumer } from '../contexts/AuthContext'
//import AuthRoute from '../components/auth/AuthenticatedRoute' ////////////USAR!!!!
import Home from './misc/Home'
import Signup from './auth/Signup'
import PlaceForm from './places/PlaceForm'
import PlaceDetail from '../components/places/PlaceDetail'
import RouteForm from '../components/routes/TesterRouteForm'
import RouteDetail from '../components/routes/RouteDetail'

function App(props) {
  return (
    <div className="App" id="app-container">

      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/signup" component={ Signup }/>

        <Route exact path="/places/new" component={ PlaceForm }/>
        <Route exact path="/places/:id" component={ PlaceDetail }/>

        <Route 
          exact
          path="/routes/new" 
          render={routeProps => (
            <FilterContextProvider>
              <RouteForm {...routeProps} />
            </FilterContextProvider>
          )}
        />
        <Route exact path="/routes/:id" component={ RouteDetail }/>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)