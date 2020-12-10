import React, { Component } from "react";

//HOC Higher-Order Componnets
//定义： 高阶组件是参数为组件，返回值为新组件的函数

//react decorator 配置
//https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur
const foo = (name) => Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} name={name}></Cmp>
    </div>
  )
}

const foo2 = Cmp => props => {
  return (
    <div className="greenBorder">
      <Cmp {...props}></Cmp>
    </div>
  )
}

//装饰器只能⽤在class上
//执⾏顺序从下往上
@foo2
@foo('xj')
class HocPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>HOC page</h3>
        <h3>{this.props.name}</h3>
        <Foo name="omg"></Foo>
        <Foo2 name="omg2"></Foo2>
      </div>
    );
  }
}
export default HocPage

function Child(props) {
  return <div>
    <h5>Child</h5>
    {props.name}
  </div>
}

const Foo = foo('xj')(Child)
//链式调用
const Foo2 = foo2(foo2(foo('learn to use decorator')(Child)))