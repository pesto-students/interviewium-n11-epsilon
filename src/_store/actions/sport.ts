import { SET_SPORT, REMOVE_SPORT } from '../constants/sport'


export const saveSport = (sport: Object) => (dispatch: Function) => {
    dispatch({ type: SET_SPORT, payload: sport })
}
export const removeSport = (navigate: Function) => (dispatch: Function) => {
    dispatch({ type: REMOVE_SPORT, payload: navigate })
}