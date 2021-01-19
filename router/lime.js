const express = require('express');
// 引入连接池
const pool = require('../pool.js');
// 创建路由器对象
const r = express.Router();
// 用户名验重
r.post('/regUname', (req, res) => {
	let obj = req.body;
	// console.log(obj.uname)
	let uname = obj.uname;
	let sql = 'SELECT uname FROM users WHERE uname=?'
	pool.query(sql, [uname], (err, result) => {
		if (err) throw err;
		// 将查询后的值返回到前端
		res.send(result)
	})
})
// 1.用户注册
r.post('/register', (req, res) => {
	let obj = req.body;
	// console.log(obj)
	let sql = "INSERT INTO users(uname,upwd,pe) VALUES(?,MD5(?),?)"
	pool.query(sql, [obj.uname, obj.upwd, obj.pe], (err, result) => {
		if (err) throw err;
		// console.log(result)
		res.send({ msg: result.affectedRows })
	})
})
// 用户登录
r.post('/login', (req, res) => {
	let obj = req.body;
	let sql = "SELECT id,uname,upwd,avatar,birthday,hobby,pe FROM users WHERE uname=? AND upwd=MD5(?)"
	pool.query(sql, [obj.uname, obj.upwd], (err, result) => {
		if (err) throw err;
		// console.log(result)
		res.send({ code: 200, msg: result[0] })
	})
})
// 导出
module.exports = r