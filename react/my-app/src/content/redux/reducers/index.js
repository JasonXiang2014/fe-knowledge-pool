// import { combineReducers } from 'redux'
import { combineReducers } from '../kredux'

import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})