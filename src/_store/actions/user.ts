import { SET_USER, REMOVE_USER } from '../constants/user'

export const save = (user: Object) => (dispatch: Function) => {
    dispatch({ type: SET_USER, payload: user })
}
export const remove = (navigate: Function) => (dispatch: Function) => {
    dispatch({ type: REMOVE_USER, payload: navigate })
}