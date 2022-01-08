const http = require('http')
const fs = require('fs')
const server = http.createServer((request, respone) => {
  const { url, method, headers } = request
  console.log(url, method)
  if (url === '/' && method === "GET") {
    //fs模块读取文件的相对路径是以启动server的文件位置为准的
    fs.readFile('index.html', (error, data) => {
      if (error) {
        console.log(error)
        respone.writeHead(500, {
          'Content-Type': 'text/plain;charset=utf-8'
        })
        respone.end('服务器内部异常')
        return
      }
      respone.statusCode = 200
      respone.setHeader("Content-Type", 'text/html')
      respone.end(data)
    })
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(respone) //./1.png
  }
  else if (url === '/user' && method === "GET") {
    respone.statusCode = 200
    respone.setHeader("Content-Type", 'application/json')
    respone.end(JSON.stringify({ name: 'Tom' }))
  } else {
    respone.statusCode = 404;
    respone.setHeader("Content-Type", 'text/plain;charset=utf-8')
    respone.end('资源不存在')
  }
})
server.listen(3000, () => {
  console.log('server start')
})
