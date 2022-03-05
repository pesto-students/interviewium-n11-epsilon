import Cookies from 'js-cookie'

export default function authHeader() {
    const user: Object = JSON.parse(localStorage.getItem("user")!)
    const token: String=Cookies.get('token')!

    if (user && token) {
      return { Authorization: "Bearer " + token }
    } else {
      return {}
    }
}