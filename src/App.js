import React , { Component } from 'react';
import './App.css';
import Login from './screens/login'
import Register from './screens/register'
import {BrowserRouter as Router ,Route,Redirect} from 'react-router-dom';
import Forgot from './screens/forgot'
import Reset from './screens/reset'
import Dashboard from './screens/dashboard'
// import Dil from '../src/components/dil'


 const PrivateRoute = ({ component: Component, ...rest }) => (
 
  <Route {...rest} render={props => (
  localStorage.getItem('token') ? (
  <Component {...props}/>
  ) : (
  <Redirect to={{
  pathname: '/login',
  state: { from: props.location }
  }}/>
  )
  )}/>
  )


class App extends Component {
  
  render() {
    return (
        <Router>
        <div className="App">
        <Route path="/login" component={Login}/>
        <Route path="/" exact component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/resetPassword" component={Reset}/>
        {/* <Route path="/dil" component={Dil}/> */}
        <PrivateRoute path="/dashboard" component={Dashboard}/>
        
        </div>
        </Router>
      
    );
  }
}

export default App;
