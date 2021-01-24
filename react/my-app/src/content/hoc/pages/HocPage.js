import React, { Component } from "react";
import HomePage from "../../private-route/pages/HomePage";

//HOC Higher-Order Componnets
//定义： 高阶组件是参数为组件，返回值为新组件的函数

//react decorator 配置
//https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur
const foo = ({ name }) => Cmp => props => {
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

function testable2(isTestable) {
  return function (target) {
    target.isTestable = isTestable;
  }
}

function testable(traget) {
  console.log('xjDebugger:traget', traget)
  traget.isTestable = true
}

function dec(id) {
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

function log(target, name, descriptor) {
  console.log('xjDebugger:readonly', target, name, descriptor)
  var oldValue = descriptor.value
  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  }
  return descriptor
}

//先从外到内进入，然后由内向外执行。

@foo2
@foo({ name: 'xj' })
@testable2(false)
@testable
class HocPage extends Component {
  state = {};

  @dec(1)
  @log
  add(a, b) {
    return a + b
  }

  render() {
    console.log('xjDebugger', HocPage.isTestable, this.add(1, 2))
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

const Foo = foo({ name: 'xj' })(Child)
//链式调用
const Foo2 = foo2(foo2(foo({ name: 'learn to use decorator' })(Child)))