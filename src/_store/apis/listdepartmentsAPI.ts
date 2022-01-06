import {unauthorizedAPI} from './api'
import {listdepartments} from './urls'
export const listdepartmentsAPI=async ()=>{
    try {
    return await unauthorizedAPI.get(listdepartments)
    .then(response=>{
        return { status: response.status, body: response.data }
    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    })
}
catch(err)  {
    return { status: 500, body: 'Failed to connect'}
}
}