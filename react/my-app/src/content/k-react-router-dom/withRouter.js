const { default: RouterContext } = require("./Context")

const withRouter = WrappedComponent => props => {
  return <RouterContext.Consumer>{
    context => {
      return <WrappedComponent {...props} {...context}></WrappedComponent>
    }
  }</RouterContext.Consumer>
}

export default withRouter