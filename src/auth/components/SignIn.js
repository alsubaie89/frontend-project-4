import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormLabel} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container }from 'react-bootstrap';



class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (

      <Container>
            <div className="container "> 
               <div className="form">
      <Form className='auth-form' onSubmit={this.onSignIn}>
      <FormGroup controlId="formBasicEmail">
        <h3>Sign In</h3>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="formBasicEmail">
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormControl
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        </FormGroup>
        <Button type="submit">Sign In</Button>
      </Form>
      </div>
      </div>
      </Container>
    )
  }
}

export default withRouter(SignIn)
