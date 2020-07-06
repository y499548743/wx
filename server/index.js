// 引入 express
const express = require('express')

// 调用 express() 创建一个服务器应用程序
const app = express()

// 提供接口api
app.get('/', (req, resp) => {
    resp.send('Hello World!')
})
app.get('/login', (req, resp) => {
    console.log(req.query)
    resp.send('login success!')
})

// 发布静态资源
app.use(express.static('public'))

// 启动服务器
const port = 8088 // 端口号 1024~65535
app.listen(port, ()=>{
    console.log(`Server has started at: ${port}`)
})
