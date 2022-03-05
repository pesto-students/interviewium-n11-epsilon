import api from './api'
import { allaccountdetails , inviteUserDetails, alluserlist, deleteSingleUser, searchUsers } from './urls'

export const allAccountDetails = async (payload) => {
    try {
    return await api
        .get(`${allaccountdetails}?${payload}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}
export const getUserList = async (payload) => {
    try {
    return await api
        .get(`${alluserlist}?${payload}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}
export const getInvitationList = async (payload) => {
    try {
    return await api
        .get(`${inviteUserDetails}?${payload}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}

export const deleteUser = async (id) => {
    try {
    return await api
        .delete(`${deleteSingleUser}${id}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}

export const searchUserDetails = async (payload) => {
    try {
    return await api
        .get(`${searchUsers}?prefix=${payload}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}
export const searchAccountDetails = async (payload) => {
    try {
    return await api
        .get(`${searchUsers}/${payload}`)
        .then((response) => {
            return { status: response.status, body: response.data }
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data }
        }) }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
}
export const createAccount = async (user: Object)=>{
    try {
    return await api.post(allaccountdetails, user)
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
export const inviteUser = async (user: Object)=>{
    try {
    return await api.post(inviteUserDetails, user)
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
export const resendInvitation = async (id) => {
    try {
        return await api.put(inviteUserDetails+'/'+id)
        .then(response=>{
            return { status: response.status, body: response.data }
        }).catch(err=>  {
            return { status: err.response.status, body: err.response.data }
        })
    } catch(err) {
        return { status: 500, body: 'Failed to connect'}
    }
}