/**
 * Created by gh on 2017/3/19.
 */
var express = require('express');
var router = express.Router();
// 导入MySQL模块
var dbConfig = require('../db/DBConfig');
var User = require('../db/usersql');
var mysql = require('mysql'); // 引入mysql依赖
var client = mysql.createConnection(dbConfig.mysql); // 建立连接
// 登录接口
router.all('/user/login', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库存在
            if (results.length == 0) {
                res.end(JSON.stringify({status:'102',msg:'用户名或密码错误'}));
            } else{
                if (results[0].username == param.username && results[0].password == param.password) {
                    res.end(JSON.stringify({status:'100',msg:'登录成功'}));
                }
            }
        }
    })
});
module.exports = router;