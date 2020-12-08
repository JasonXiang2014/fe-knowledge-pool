import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

// import { createStore } from '../kredux'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state
  }
}
const store = createStore(reducer, applyMiddleware(thunk, promise, logger))

export default store