export default function createStore(reducer) {

  let currentState
  let currentListener = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListener.forEach(listener => listener())
  }

  function subscribe(listener) {
    currentListener.push(listener)
    return () => {
      currentListener = []
    }
  }

  dispatch({type: 'xxxx'})
  
  return {
    getState, //获取状态
    dispatch,//触发改变state
    subscribe,//订阅
  }
}