import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import PatientIndex from './patients/PatientIndex'
import PatientCreate from './patients/PatientCreate'
import PatientShow from './patients/PatientShow'
import PatientEdit from './patients/PatientEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          {/* this is Index component */}
          <AuthenticatedRoute user={user} path='/patients' exact render={() => (
            <PatientIndex user={user}/>
          )} />
          {/* this create component */}
          <AuthenticatedRoute user={user} path='/patients/create' exact render={() => (
            <PatientCreate user={user}/>
          )} />
           {/* this Show component */}
           <AuthenticatedRoute user={user} path='/patients/:id' exact render={(props) => (
            <PatientShow user={user} />
          )} />
          {/* this Edit component */}
          <AuthenticatedRoute user={user} path='/patients/:id/edit' exact  render={() => (
            <PatientEdit user={user} />
          )} />

        </main>
            
        <div className="footer">

        </div>
      </React.Fragment>
    )
  }
}

export default App
