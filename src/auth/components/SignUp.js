import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormLabel} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container }from 'react-bootstrap';



class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (

      <Container>
            <div className="container "> 
               <div className="form">
      <Form className='auth-form' onSubmit={this.onSignUp}>

        <h3>Sign Up</h3>

        <FormGroup controlId="formBasicEmail">
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        </FormGroup>
        <FormGroup>
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

        <FormGroup>
        <FormLabel htmlFor="passwordConfirmation">Confirm Password</FormLabel>
        <FormControl
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </Form>

      </div>
      </div>
      </Container>
    )
  }
}

export default withRouter(SignUp)
