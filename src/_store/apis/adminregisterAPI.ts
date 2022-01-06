import {unauthorizedAPI} from './api'
import {adminregister, registerUser} from './urls'

 const adminregisterAPI=async (user: Object)=>{
    try {
    return await unauthorizedAPI.post(adminregister, user)
    .then(response=>{
        return { status: response.status, body: response.data }
    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    })
}
catch(err)  {
    return { status: 500, body: 'Failed to connect'}
}
}
 const registerUserAPI=async (user: Object)=>{
    try {
    return await unauthorizedAPI.post(registerUser, user)
    .then(response=>{
        return { status: response.status, body: response.data }
    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    })
}
catch(err)  {
    return { status: 500, body: 'Failed to connect'}
}
}

export {
 adminregisterAPI,
 registerUserAPI
}