import { combineReducers } from 'redux';
import user from './user'
import message from './message'
import pagePath from './pagePath'
import sport from './sport'
import providerLeagues from './providerLeagues'
const reducer = combineReducers({
  user,
  message,
  pagePath,
  sport,
  providerLeagues
})
export type RootState = ReturnType<typeof reducer>
export default reducer