import { shippersrequestlist, useraddmultiple, userlist,userlistactionsstatussingle,userlistactionsstatusmultiple,shippersdeletesingle,shippersdeletemultiple,shippersrequestlistfilter,shippersrequestlistfiltervalues,shippersrequestlistsearch,userinvitemultiple } from './urls'
import api from './api'

export const shippersrequestlistAPI=async (user: Object)=>{
    try {
    return await api.post(shippersrequestlist, user)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
  
}
export const useraddmultipleAPI=async (users: Object)=>{
    try {
    return await api.post(useraddmultiple, users)
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
export const userlistAPI=async (value: Object)=>    {   
    try { 
    return await api.post(userlist, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const userlistactionsstatussingleAPI=async (value: Object)=>    {  
    try {  
    return await api.post(userlistactionsstatussingle, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const userlistactionsstatusmultipleAPI=async (value: Object)=>    {    
    try {
        return await api.post(userlistactionsstatusmultiple, value)
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
export const shippersdeletesingleAPI=async (value: Object)=>    {    
    try {
    return await api.post(shippersdeletesingle, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const shippersdeletemultipleAPI=async (value: Object)=>    {    
    try {
    return await api.post(shippersdeletemultiple, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const getshippersrequestlistfiltervaluesAPI=async ()=>    {    
    try {
    return await api.get(shippersrequestlistfiltervalues,)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const postshippersrequestlistfilterAPI=async (value: Object)=>    {    
    try {
    return await api.post(shippersrequestlistfilter, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const shippersrequestlistsearchAPI=async (value: Object)=>    {    
    try {
    return await api.post(shippersrequestlistsearch, value)
    .then(response=>{
        return { status: response.status, body: response.data }

    }).catch(err=>  {
        return { status: err.response.status, body: err.response.data }
    }) }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const userinvitemultipleAPI=async (value: Object)=>    {    
    try {
        return await api.post(userinvitemultiple, value)
        .then(response=>{
            return { status: response?.status, body: response?.data }

        }).catch(err=>  {
            return { status: err.response?.status, body: err?.response?.data }
        }) 
    }
    catch(err)  {
       
        return { status: 500, body: 'Failed to connect'}
    }
}