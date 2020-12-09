export default function applyMiddleware(...midwares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let dispatch

    let midwareApi = {
      getState: store.getState,
      dispatch: (action, ...args) => {
        dispatch(action, ...args)
      }
    }

    const midwareChains = midwares && midwares.map(midware => midware(midwareApi))

    dispatch = compose(...midwareChains)(store.dispatch)

    return {
      ...store,
      dispatch, //返回加强后的dispatch
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}



// 中间件的核心思想是 让中间件函数依次执行 里面还是用到了函数compose的思想
// 中间件有先后执行之分 如果把logger放在第一位执行 假如接受的action是函数回调类型 解析会有问题