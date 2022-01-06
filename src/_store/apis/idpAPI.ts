import api from './api'

import {
  idpVerison,
  IDP,
  idpVerisonAdmin,
  manageIDPDataAdmin,
  isIdpConfiguredAdminCheck,
  manageIDPData,
  isIdpConfiguredCheck,
  setManageIdpVersion,
  deleteIdp,
  setDataIdp,
  providerVersion
} from './urls';
export const allIDPsDetails = async (payload) => {
    try {
    return await api
        .get(`${IDP}?${payload}`)
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

export const createIDP = async (idp: Object)=>{
    try {
    return await api.post(IDP, idp)
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

export const editIDP = async (idp: any)=>{
    try {
        const payload = {
            name: idp.name, 
            description: idp.description
        };
    return await api.put(IDP+'/'+idp.id, payload)
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

export const createIDPVersion = async (payload: Object)=>{
    try {
    return await api.post(providerVersion, payload)
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

export const createIDPVersionAdmin = async (payload: Object , idpVersionId : any , providerType : any , accountId : any )=>{
    try {
    return await api.post(`${idpVerisonAdmin}/${idpVersionId}/Account/${accountId}/?providerType=${providerType}`, payload)
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

export const allIDPVersions = async (payload) => {
    try {
    return await api
        .get(`${idpVerison}?${payload}`)
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

export const providerVersionsList = async (payload) => {
    try {
    return await api
        .get(`${providerVersion}?${payload}`)
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

export const getVersion = async (payload) => {
    try {
    return await api
        .get(`${providerVersion}/${payload}`)
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
export const getManageIDPDataAdmin = async (payload) => {
    try {
    return await api
        .get(`${manageIDPDataAdmin}/${payload}`)
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
export const getManageIDPData = async (payload) => {
    try {
    return await api
        .get(`${manageIDPData}/${payload}`)
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
export const isIdpConfiguredAdmin = async (payload) => {
    try {
    return await api
        .get(`${isIdpConfiguredAdminCheck}/${payload}`)
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
export const isIdpConfigured = async () => {
    try {
    return await api
        .get(`${isIdpConfiguredCheck}`)
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


export const saveIDPAdmin = async (payload: any , providerType)=>{
    try {        
    return await api.post(setManageIdpVersion+'/'+payload.idpVersionId+'/Account/'+payload.accountId + `?providerType=`+providerType, payload)
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
export const saveIDP = async (payload: any , providerType)=>{
    try {        
    return await api.post(setDataIdp+'/'+payload.idpVersionId+`?providerType=`+providerType, payload)
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
export const searchIDP = async (payload: any , providerType)=>{
    try {        
    return await api.get(setDataIdp+`?providerType=`+providerType+`&`+payload)
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

export const deleteIDP = async (id) => {
    try {
    return await api
        .delete(`${deleteIdp}${id}`)
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