import api from './api'
import { customeruserprofilepictureupload } from './urls'

export const postcustomeruserprofilepictureuploadAPI = async (values: Object) => {  
    try {  
    return await api
        .post(customeruserprofilepictureupload, values)
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