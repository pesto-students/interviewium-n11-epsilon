import axios from 'axios'
import Cookies from 'js-cookie'
// import authHeader from './auth-header'
import { baseURL, updateProfileInfo, updateProfilePicture, userPassword, userProfile } from './urls'

const token: String=Cookies.get('token')!
// const api = axios.create({
//     baseURL,
//     headers: authHeader()    
// })
const config = axios.create({
    baseURL,
    headers: {"Authorization": "Bearer " + token,'Content-Type': 'application/json' }
})

export const getUserProfile = async() => {
    try {
        return await config
            .get(`${userProfile}`)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
    
}
export const changePassword = async(obj: Object) => {
    try {
        return await config
            .put(userPassword, obj)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}

export const changeProfile = async(obj: Object) => {
    try {
        return await config
            .put(updateProfileInfo, obj)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}

export const uploadProfileImage = async (obj: Object) => {
    
    
    try {
        return await config
            .put(updateProfilePicture, obj)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const deleteProfileImage = async () => {
    try {
        return await config
            .delete(updateProfilePicture)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}