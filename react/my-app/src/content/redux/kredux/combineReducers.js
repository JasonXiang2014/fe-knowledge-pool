export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for (let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }
    //做下面比较的原因是源码当中有replaceReducer的api 会改变state里面key的个数
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}