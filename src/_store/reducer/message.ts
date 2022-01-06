import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../constants/index'
import {v4 as uuidv4} from 'uuid'
import Action from '../../types/action'

const initialState={
    message: null
}

const message=(state=initialState, action: Action)=> {
    switch(action.type) {
        case SUCCESS_MESSAGE:
            return { ...state, id: uuidv4(), message: action.payload, type: SUCCESS_MESSAGE }
        case ERROR_MESSAGE:
            return { ...state, id: uuidv4(), message: action.payload, type: ERROR_MESSAGE }
        default:
            return state    
    }
}
export default message