import apiUrl from '../apiConfig';
import Axios from 'axios'


export const index = (user) => {
    return  Axios({
        method:'GET',
        url: apiUrl + '/patients',
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}

export const show = (user, patientId) => {
    return Axios({
        method:'GET',
        url: apiUrl + `/patients/${patientId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}

// records creattion axios
export const addRecords = (user, patientId, record) => {

    return Axios({
        method:'POST',
        url: apiUrl + `/patients/${patientId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        },
        data:{
            record:{
                description: record
            }
        }
    })
}


export const create = (user,newPatient) => {
    return Axios({
        method:'POST',
        url:apiUrl + '/patients',
        headers:{
            "Authorization":`Bearer ${user.token}`
        },
        data:{
            patient:newPatient
        }
    })
}


export const destroy = (user,patientId) => {
    return Axios({
        method:"DELETE",
        url:apiUrl + `/patients/${patientId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}


export const update = (user,updatePatient,patientId) => {
    return Axios({
        method:'patch',
        url:apiUrl + `/patients/${patientId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        },
        data:{
            patient:updatePatient
        }
    })
}