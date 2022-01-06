import api from './api'
import { customeruseraccount } from './urls'
export const getcustomerUserAccountAPI = async () => {
    try {
    return await api
        .get(`${customeruseraccount}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}

export const postcustomerUserAccountAPI = async (values: Object) => {  
    try {  
    return await api
        .post(customeruseraccount,values)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}