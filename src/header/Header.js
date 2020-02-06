import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'

import './Header.scss'
import { Container } from 'react-bootstrap'



const authenticatedOptions = (
  <React.Fragment>
    <Link to="/patients">Patients</Link>
    <Link to="/patients/create">New</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header style={{background:"#222831"}} className="main-header">
    <img src="https://img.favpng.com/13/5/1/physician-medicine-health-care-computer-icons-clinic-png-favpng-Ltb0Ewy2e1u1uYZEqESSzVvwY.jpg" style={{width:"50px",height:"50px"}}/>
   ,,,,,,<h1 style={{color:"white"}}>Doctor Logs</h1>
    
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
