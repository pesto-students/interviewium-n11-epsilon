import api from './api'
import { systemadminprofilepictureupload } from './urls'

export const postsystemadminprofilepictureuploadAPI = async (values: Object) => {  
    try {  
    return await api
        .post(systemadminprofilepictureupload, values)
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