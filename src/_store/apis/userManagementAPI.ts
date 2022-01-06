import { useraddsingle, useraddmultiple, userlist, userlistactionsstatussingle, userlistactionsstatusmultiple, userdeletesingle, userdeletemultiple, userlistfilter, userlistsearch, userinvitemultiple, users, reports, deleteCommentAPI, leaderBoard } from './urls'
import api from './api'

export const useraddsingleAPI = async (user: Object) => {
    try {
        return await api.post(useraddsingle, user)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }

}
export const useraddmultipleAPI = async (users: Object) => {
    try {
        return await api.post(useraddmultiple, users)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userlistAPI = async (value: Object) => {
    try {
        return await api.post(userlist, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userlistactionsstatussingleAPI = async (value: Object) => {
    try {
        return await api.post(userlistactionsstatussingle, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userlistactionsstatusmultipleAPI = async (value: Object) => {
    try {
        return await api.post(userlistactionsstatusmultiple, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userdeletesingleAPI = async (value: Object) => {
    try {
        return await api.post(userdeletesingle, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userdeletemultipleAPI = async (value: Object) => {
    try {
        return await api.post(userdeletemultiple, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userlistfilterAPI = async (value: Object) => {
    try {
        return await api.post(userlistfilter, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userlistsearchAPI = async (value: Object) => {
    try {
        return await api.post(userlistsearch, value)
            .then(response => {
                return { status: response.status, body: response.data }

            }).catch(err => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const userinvitemultipleAPI = async (value: Object) => {
    try {
        return await api.post(userinvitemultiple, value)
            .then(response => {
                console.log('~~~ 1 last')
                return { status: response?.status, body: response?.data }

            }).catch(err => {
                return { status: err.response?.status, body: err?.response?.data }
            })
    }
    catch (err) {

        return { status: 500, body: 'Failed to connect' }
    }
}
export const activateDeactivateUser = async (payload: any) => {
    try {
        return await api.put(`${users}/${payload.userId}/${payload.isActive}`)
            .then(response => {
                console.log('~~~ 1 last')
                return { status: response?.status, body: response?.data }

            }).catch(err => {
                return { status: err.response?.status, body: err?.response?.data }
            })
    }
    catch (err) {

        return { status: 500, body: 'Failed to connect' }
    }
}
export const deleteComment = async (payload: any) => {
    try {
        return await api.delete(`${deleteCommentAPI}/${payload}`)
            .then(response => {
                return { status: response?.status, body: response?.data }

            }).catch(err => {
                return { status: err.response?.status, body: err?.response?.data }
            })
    }
    catch (err) {

        return { status: 500, body: 'Failed to connect' }
    }
}

export const getAllUsers = async () => {
    try {
    return await api
        .get(`${users}`)
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
export const getSearchUsers = async (payload) => {
    try {
    return await api
        .get(`${users}`+`?${payload}`)
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

export const getReports = async () => {
    try {
    return await api
        .get(`${reports}`)
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
export const getSearchReports = async (params) => {
    try {
    return await api
        .get(`${reports}` +`?${params}`)
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

export const getAllLeaderBoardData = async (param) => {
    try {
        return await api
            .get(`${leaderBoard}` +`${param}`)
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