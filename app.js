const express = require('express');
// 引入用户路由器
const limeRouter = require('./router/lime.js')
// 引入中间件模块解析
const bodyParser = require('body-parser')
// 创建web服务器
const app = express();
// 设置端口
app.listen(3000);
// 应用中间件，选择解析方式
app.use(bodyParser.urlencoded({ extended: false }))
// 挂载路由器
app.use('/lime', limeRouter);