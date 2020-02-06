import React, {Component} from 'react';
import {show,update} from './api';
import {withRouter} from 'react-router-dom';
import "./Patient.css"
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormLabel} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container }from 'react-bootstrap';

class PatientEdit extends Component{
    state={
        dataForm:{
            name:"",
            age:"",
            illness:""
        
        }
    }

    componentDidMount(){
        const user = this.props.user;
        const patientId = this.props.match.params.id;
        show(user,patientId)
        .then((response) => {
            const patient = response.data.patient
            this.setState({
                dataForm:patient
            })
        })
        .catch(error => console.log(error))
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


    handleSubmit = (event) =>{
        event.preventDefault();
        const user = this.props.user;
        const patientId = this.props.match.params.id;
        const updatePatient = this.state.dataForm;
        update(user,updatePatient,patientId)
        .then(() => this.props.history.push(`/patients/${patientId}`))
        .catch((error) => console.log(error))
    }


    render(){
        console.log(this.props)
        return(
            <Container>
            <div className="container "> 
               <div className="form">
            <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId="formBasicEmail">
                <FormLabel>Name:</FormLabel>
                <FormControl onChange={this.handleChange} type="text" name="name" value={this.state.dataForm.name}/> 
            </FormGroup>
                <br/>
                <FormLabel>Age:</FormLabel>
                <FormControl  onChange={this.handleChange} type="text" name="age" value={this.state.dataForm.age}/>
                <br/>
                <FormLabel>Diagnosis:</FormLabel>
                <FormControl  onChange={this.handleChange} type="text" name="illness" value={this.state.dataForm.illness}/>
                <br/>
                <Button type="submit">Update</Button>
        </Form>
        </div>
        </div>
        </Container>
        )
    }
}



export default withRouter(PatientEdit)