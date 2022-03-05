import api from "_store/apis/api"
import { HRPersona } from "_store/apis/urls"

export const HRPersonaHandler = async (payload) => {
    try {
    return await api
        .get(`${HRPersona}?uid=${payload}`)
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