import React,{Component} from 'react'
import {create} from './api'
import {withRouter} from 'react-router-dom'
import "./Patient.css"
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormLabel} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container }from 'react-bootstrap';

class PatientCreate extends Component{
    state = {
        dataForm:{
            name:"",
            age:"",
            illness:""
        
        }
    }
    handleChange = (event) => {
        //get the name of input
        const name = event.target.name;
        // get the value of input
        const value = event.target.value;
        const newForm = Object.assign(this.state.dataForm)
        newForm[name] = value;
        this.setState({
            dataForm:newForm
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newPatient = this.state.dataForm
        const user = this.props.user
        create(user,newPatient)
        .then(() => alert('created'))
        .then(() => this.props.history.push('/patients'))
        .catch((error) => console.log(error))
    }

    render(){
        return(
            <Container>
            <div className="container "> 
               <div className="form">
            <Form onSubmit={this.handleSubmit}>

            <FormGroup controlId="formBasicEmail">
                <FormLabel> Name: </FormLabel>
                <FormControl onChange={this.handleChange} type="text" name="name" value={this.state.dataForm.name}/>
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
                <FormLabel>Age:</FormLabel>
                <FormControl  onChange={this.handleChange} type="text" name="age" value={this.state.dataForm.age}/>
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
                <FormLabel>Diagnosis:</FormLabel>
                <FormControl  onChange={this.handleChange} type="text" name="illness" value={this.state.dataForm.illness}/> <hr/>
            </FormGroup>  

                <Button variant="primary" type="submit">Create</Button>
            </Form>
            </div>
            </div>
            </Container>
        )
    }
}



export default withRouter(PatientCreate)