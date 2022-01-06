import axios from 'axios'
import { baseURL } from './urls'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const api = axios.create({
    baseURL,
})
const unauthorizedAPI = axios.create({
    baseURL,
})
const handleLogout = () => {
    localStorage.removeItem('user')
    Cookies.remove('token')
    window.location.href = '/login'
}
api.interceptors.request.use(
    function (config) {
        const user = localStorage.getItem('user')
        const token = `${Cookies.get('token')}`
        let isExpired = true
        if (user && token) {
            const decodedToken = jwt.decode(token, { complete: true })
            if (decodedToken?.payload?.exp < (new Date().getTime())) {
                isExpired = false
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        if (isExpired) {
            handleLogout()
        }
        return config
    },
)
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (401 === error.response.status) {
            handleLogout()
        } else {
            return Promise.reject(error)
        }
    }
)
export { unauthorizedAPI }
export default api