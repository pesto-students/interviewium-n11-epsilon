import { SET_PAGE_PATH } from '../constants/pagePath'

export const setPathPage=(pagePath)=>(dispatch: Function)=>  {
    dispatch({ type: SET_PAGE_PATH, payload: pagePath })
}