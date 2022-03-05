import { SET_USER, REMOVE_USER } from '../constants/user'
import { v4 as uuidv4 } from 'uuid'
import Action from '../../types/action'
import Cookies from 'js-cookie'
const initialState = {
    user: null
}

const user = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, id: uuidv4(), user: action.payload }
        case REMOVE_USER:
            localStorage.removeItem('user')
            Cookies.remove('token')
            try {
                return { ...state, id: uuidv4(), user: null }
            } finally {
                action?.payload()
            }
        default:
            return state
    }
}
export default user