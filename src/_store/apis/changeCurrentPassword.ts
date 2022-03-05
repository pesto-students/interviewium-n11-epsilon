import api from './api';
import { changeCurrentPassword } from './urls';
export const changeCurrentPasswordAPI = async (user: Object) => {
    try {
    return await api
        .post(changeCurrentPassword, user)
        .then((response) => {
            return { status: response.status, body: response.data };
        })
        .catch((err) => {
            return { status: err.response.status, body: err.response.data };
        }); }
        catch(err)  {
            return { status: 500, body: 'Failed to connect'}
        }
};