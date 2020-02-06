import React, {Component} from 'react';
import {index,destroy} from './api'
import {Link} from 'react-router-dom';
import {Card,Button,CardDeck} from 'react-bootstrap'
class PatientIndex extends Component {
    state = { 
        patients:[]
     }

     componentDidMount(){
        const user = this.props.user
        index(user)
        .then(response => {
           const allPatients = response.data.patients;
           this.setState({
            patients:allPatients
           })
        })
        .catch((error) => console.log(error))
    }

    destroy = (patientId) => {
        const user = this.props.user
        destroy(user,patientId)
        .then(() => alert('deleted'))
        .then(() => {
           const newPatients = this.state.patients.filter((patient) => patient._id != patientId)
            this.setState({
                patients:newPatients
            })
        })
        .catch((error) => console.log(error)) 
    }


    render() {
        console.log(this.props.user)
        return(
            
            <React.Fragment>
               <CardDeck>
                   <div className="row">
                {this.state.patients.map((patient,index) => (
                    <div className="col-4" style={{marginBottom:"20px"}}>
                <Card>

                <Card border="primary" style={{width: '18rem'}}>
                    <Card.Header as="h5">{patient.name} </Card.Header>
                    <Card.Body>
                        <Card.Title>{patient.illness}</Card.Title>
                        <Card.Text>
                        Age: {patient.age}
                        </Card.Text>
                        <Button variant="primary"><Link style={{color:"white"}} to={`/patients/${patient._id}`}> Show </Link></Button>
                        <Link  to={`/patients/${patient._id}`}><Button  onClick={() => this.destroy(patient._id) }variant="danger">Delete</Button> </Link>
                    </Card.Body>
                </Card>
                </Card>
                </div>
                ))}
                </div>
                </CardDeck>
                <br/>
                
                </React.Fragment>
        )
    }
}
 
export default PatientIndex;