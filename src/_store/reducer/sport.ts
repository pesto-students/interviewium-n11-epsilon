import { SET_SPORT, REMOVE_SPORT } from '../constants/sport'
import Action from '../../types/action'

const initialState = {
    data: []
}

const sport = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_SPORT:
            return { ...state, data: action.payload}
        case REMOVE_SPORT:
            return { ...state, data: action.payload}
        default:
            return state
    }
}
export default sport