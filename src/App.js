import React , { Component } from 'react';
import './App.css';
import Login from './screens/login'
import Register from './screens/register'
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import Forgot from './screens/forgot'
import Reset from './screens/reset'
import Dashboard from './screens/dashboard'


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
        <Route path="/dashboard" component={Dashboard}/>
        </div>
        </Router>
      
    );
  }
}

export default App;
