import React, {Component} from 'react';
import {show,addRecords} from './api'
import {Link, withRouter} from 'react-router-dom'
import PatientIndex from './PatientIndex';
import "./Patient.css"
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { cell, Card } from 'react-bootstrap';
import { FormLabel} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container }from 'react-bootstrap';

class PatientShow extends Component{
    state = {
        patients: "",
        record:""

         
    }

    componentDidMount(){
        const user = this.props.user;
        console.log(this.props)
        const patientId = this.props.match.params.id;
        show(user,patientId)
        .then((response) => {   

            const showPatient = response.data.patient;
            // console.log(showPatient);
            let copyPtient = {...this.state.patient}
            copyPtient = showPatient
            console.log(copyPtient)
            this.setState({
                patient:copyPtient
            })
        })
        .catch((error) => console.log(error))
    }
    handleChange = e => {
        const key = e.target.name
        const value = e.target.value
        this.setState( ({...copyState})=> {
            copyState[key] = value
            return copyState
        }) 
    }
    handleSubmit = e => {
        e.preventDefault()
        addRecords(this.props.user, this.props.match.params.id, this.state.record)
        .then(
            res => {
                show(this.props.user, this.props.match.params.id)
        .then((response) => {   

            const showPatient = response.data.patient;
            // console.log(showPatient);
            let copyPtient = {...this.state.patient}
            copyPtient = showPatient
            console.log(copyPtient)
            this.setState({
                patient:copyPtient
            })
        })
        .catch((error) => console.log(error))
            }
        )
        .catch(
            err => console.log(err)
        )
    }



    render(){
        // console.log(this.props.patientId)
        return(
            <div>
                {this.state.patient ? 
                
                <div>
                    <Card bg="primary" text="white" style={{ width: '18rem' }}>
                   
                   <Card.Header>
                       Name: {this.state.patient.name}
                       </Card.Header> 
                   <Card.Body>
                       <Card.Title>
                           Age: {this.state.patient.age} 
                       </Card.Title>            
                       <Card.Text> 
                           Diagnosis:{this.state.patient.illness}
                           
                    <br/>
                    
                    <Link to={`/patients/${this.state.patient._id}/edit`} class="btn btn-success">Edit</Link>
                    
                    </Card.Text>
                           </Card.Body>
                    </Card>
                 
                     
                     
                    

                     
                    <h5>Records: </h5> <p>{this.state.patient.records.map((record, index)=>(
                        <ul key={index} class="list-group">
                            <div class="list-group-item">
                            <li >{record.description}</li>
                            <li>{record.updatedAt}</li>
                            </div>
                        </ul>
                    ))}</p>
                    
                </div>
                :""}
                <div className="container "> 
                      <div className="form">
                
                <FormLabel>New Record</FormLabel>
               <Form onSubmit={this.handleSubmit}>
                   <FormControl name="record" value={this.state.record} onChange={this.handleChange}/>
                   <hr/>
                   <Button type="submit" >submit</Button>
                   </Form>
                </div>
                </div>
            </div>
        )
    }
}



export default withRouter(PatientShow)