function f1(arg) {
    console.log("f1", arg);
    return arg;
}
function f2(arg) {
    console.log("f2", arg);
    return arg;
}
function f3(arg) {
    console.log("f3", arg);
    return arg;
}

const r = f1(f2(f3('omg')))

console.log(r)
let compose = (...funcs) => {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
console.log(compose(f1, f2, f3)('omg'))