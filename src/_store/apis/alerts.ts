import api from './api'
import { preferencesalerts } from './urls'
export const getAlertsAPI = async () => {
    try {
        return await api.get(preferencesalerts)
            .then(response => {
                return { status: response.status, body: response.data }
            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const postAlertsAPI = async (values: Object) => {
    try {
        return await api.post(preferencesalerts, values)
            .then(response => {
                return { status: response.status, body: response.data }
            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }

}