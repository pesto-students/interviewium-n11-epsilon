import { SET_PROVIDERLEAGUE_DATA } from './../constants/index';

import Action from '../../types/action'

const initialState = {
    data: []
}

const providerLeagues = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_PROVIDERLEAGUE_DATA:
            return { ...state, data: action.payload}
        default:
            return state
    }
}
export default providerLeagues