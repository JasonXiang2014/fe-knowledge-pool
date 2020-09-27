//异步中间件

function compose(...middlewares) {
    return function () {
        return dispatch(0)
        function dispatch(i) {
            let middleware = middlewares[i]
            if (!middleware) {
                return Promise.resolve()
            }
            return Promise.resolve(middleware(function next() {
                return dispatch(i + 1)
            }))
        }
    }
}

async function fn1(next) {
    console.log("fn1")
    await next()
    console.log("end fn1")
}

async function fn2(next) {
    console.log("fn2")
    await next()
    await delay()
    console.log("end fn2")
}

async function fn3(next) {
    console.log("fn3")
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const finalFn = compose(fn1, fn2, fn3)
finalFn()