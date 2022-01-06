import { unauthorizedAPI } from './api'
import { authenticate } from './urls'
export const authenticateAPI = async (user: Object) => {
    try {
        return await unauthorizedAPI.post(authenticate, user)
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
