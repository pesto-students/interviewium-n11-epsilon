import api from './api'
import { systemadminaccount } from './urls'
export const getsystemadminaccountAPI = async () => {
    try {
    return await api
        .get(`${systemadminaccount}`)
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

export const postsystemadminaccountAPI = async (values: Object) => {  
    try {  
    return await api
        .post(systemadminaccount,values)
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