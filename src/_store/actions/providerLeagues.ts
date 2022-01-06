import { SET_PROVIDERLEAGUE_DATA } from './../constants/index';
import { getAllProviderLeaguesApi } from './../apis/_allApi';
import { SET_SPORT, REMOVE_SPORT } from '../constants/sport'

export const getAllProviderLeagues = () => {
    return async (dispatch: Function) => {
        try {
            const data = await getAllProviderLeaguesApi();
            const { status }: any = data;
            let { body }: any = data;
            if (status === 200) {
              body = body.map(item => ({...item, checked: false}));
              dispatch(saveProviderLeagues(body));
            }
          } catch (err) {
            console.log(err);
          }
    
    }
}


export const saveProviderLeagues = (data: Object) => (dispatch: Function) => {
  dispatch({ type: SET_PROVIDERLEAGUE_DATA, payload: data })
}
