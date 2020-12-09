// import { applyMiddleware, createStore } from 'redux'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
// import promise from 'redux-promise'

import { applyMiddleware, createStore } from '../kredux'

import isPromise from 'is-promise'

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

const thunk = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

const promise = ({ dispatch, getState }) => {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action)
  }
}

const logger = ({ dispatch, getState }) => {
  return next => action => {
    console.log('****************************************')
    console.log(action.type + '执行了')

    console.log('pre state', getState())

    next(action)
    console.log('next state', getState())

    console.log('****************************************')
  }
}

const store = createStore(reducer, applyMiddleware(thunk, promise, logger))

export default store