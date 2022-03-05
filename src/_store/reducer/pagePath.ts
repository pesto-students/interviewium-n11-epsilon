import { SET_PAGE_PATH } from '../constants/index'
import { v4 as uuidv4 } from 'uuid'
import Action from '../../types/action'

const initialState = {
    pagePath: null
}

const pagePath = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_PAGE_PATH:
            return { ...state, id: uuidv4(), pagePath: action.payload, type: SET_PAGE_PATH }
        default:
            return state
    }
}
export default pagePath