import {unauthorizedAPI} from './api'
import {registrationcomplete} from './urls'
export const registrationcompleteActivationKeyAPI=async (activationKey: string)=>{
    try {
    return await unauthorizedAPI.get(`${registrationcomplete}/${activationKey}`)
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
export const registrationcompleteAPI=async (values: Object)=>{
    try {
    return await unauthorizedAPI.post(registrationcomplete, values)
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
