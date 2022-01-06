import {unauthorizedAPI} from './api'
import {accountresetpasswordinit, accountresetpasswordfinish} from './urls'
export const accountresetpasswordinitAPI=async (user: Object)=>{
    try {
    return await unauthorizedAPI.post(accountresetpasswordinit, user)
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
export const accountresetpasswordfinishAPI=async (user: Object)=>{
    try {
    return await unauthorizedAPI.post(accountresetpasswordfinish, user)
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
