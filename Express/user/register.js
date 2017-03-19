var express = require('express');
var router = express.Router();
// 导入MySQL模块
var dbConfig = require('../db/DBConfig');
var User = require('../db/usersql');
var mysql = require('mysql'); // 引入mysql依赖
var client = mysql.createConnection(dbConfig.mysql); // 建立连接
// 注册接口
router.all('/user/register', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就注册成功
            if (results.length == 0) {
                // 把新用户插入数据库
                client.query(User.insert,[param.username,param.password,getDataStr(),'',''],function (err, results) {
                    if(err){
                        throw err
                    }else{
                        res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
                    }
                })
            } else{ // 数据库存在就注册失败
                res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
            }
        }
    })
});
module.exports = router;