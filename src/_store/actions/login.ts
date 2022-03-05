// import { SET_USER, } from '../constants/user'
import { ERROR_MESSAGE, 
    SUCCESS_MESSAGE
 } from '../constants/message'
import * as api from '../apis/authenticateAPI'
import {path} from '../../pageRoutes/routers'
// import Cookies from 'js-cookie'

export const login=(user: Object)=>async (dispatch: Function)=>  {
        const {status, body}=await api.authenticateAPI(user)
        if(status===200)    {
            dispatch({ type: SUCCESS_MESSAGE, payload: 'Successfully logged in', container: path.CustomerHome })

        }   else    {
            dispatch({ type: ERROR_MESSAGE, payload: body?.detail?body?.detail:'Failed to connect' })
        }
        return status
        // if(body!==undefined)  {
        //     localStorage.setItem('user', JSON.stringify(body.user))
        //     Cookies.set('token', body.token)
        //     dispatch({ type: SET_USER, payload: body.user })
            
        //     dispatch({ type: SUCCESS_MESSAGE, payload: body.message })
        // }
   
}