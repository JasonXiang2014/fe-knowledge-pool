import React, { useContext, useLayoutEffect, useReducer } from 'react'

const Context = React.createContext()


function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => props => {

  const store = useContext(Context)
  const { getState, dispatch, subscribe } = store
  let stateProps = mapStateToProps(getState())
  let dispatchProps = { dispatch }

  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = { ...dispatchProps, ...bindActionCreators(mapDispatchToProps, dispatch) }
  }

  const [, foreceUpate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => {
    let unsubscribe = subscribe(() => {
      foreceUpate()
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [store, subscribe])
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps}></WrappedComponent>
}


//hooks api

function useStore() {
  const store = useContext(Context)
  return store
}
function useSelector(selector) {
  const store = useStore()
  const { subscribe } = store
  const [, foreceUpate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => {
    let unsubscribe = subscribe(() => {
      foreceUpate()
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [store, subscribe])
  return selector(store.getState())
}

function useDispatch() {
  const store = useStore()
  return store.dispatch
}

export {
  connect,
  Provider,
  bindActionCreators,
  useSelector,
  useDispatch
}