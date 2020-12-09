export default function createStore(reducer, enhancer) {
  if(enhancer){
    //原版dispatch只能接受普通对象，加强之后变强大，能够处理多种形式，比如callback、promise等
    return enhancer(createStore)(reducer)
  }

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