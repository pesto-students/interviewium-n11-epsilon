import api from './api'

export const getAllProviderLeaguesApi = async () => {
    try {
        return await api
            .get(`/data/providerLeagues`)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}

export const sportApi = async (payload: any) => {
    try {
        return await api.post(`/data/sport`, payload)
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

export const getAllLeagues = async () => {
    try {
        return await api
            .get(`/data/leagues`)
            .then((response) => {
                return { status: response.status, body: response.data }
            })
            .catch((err) => {
                return { status: err.response.status, body: err.response.data }
            })
    }
    catch (err) {
        return { status: 500, body: 'Failed to connect' }
    }
}
export const leagueApi = async (payload: any) => {
    try {
        return await api.post(`/data/league`, payload)
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