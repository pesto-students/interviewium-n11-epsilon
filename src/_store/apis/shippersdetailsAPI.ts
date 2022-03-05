import api from './api'
import { shippersdetails, shippers, filedownload } from './urls'
export const getshippersdetailsAPI = async (id) => {
    try {
        return await api
        .get(`${shippersdetails}/${id}`)
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
export const getfiledownloadAPI = async (id) => {
    try {
        return await api
        .get(`${filedownload}/${id}`, { responseType: 'blob', })
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
export const postshippersAPI=async (action,values)=>   {
    try {
        return await api
        .post(`${shippers}/${action}`,values)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) 
    }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}