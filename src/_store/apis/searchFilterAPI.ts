import api from './api'
import { userlistfiltervalues } from './urls'
export const userlistfiltervaluesAPI = async () => {
    try {
    return await api
        .get(`${userlistfiltervalues}`)
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
