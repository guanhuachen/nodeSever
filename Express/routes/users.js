var express = require('express');
var router = express.Router();

var dataSuccess = {
    status: '100',
    msg: '登录成功',
    data: {
        userId: '2',
        userName: 'a',
        blog: 'http://hgdqstudio.online'
    }
};
var dataError = {
    status: '99',
    msg: '用户名或密码错误'
};
// 登录接口
router.post('/login',function (req, res, next) {
    // 打印post请求的数据内容
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username == "a" && req.body.password == "1") {
        res.end(JSON.stringify(dataSuccess));
    } else {
        res.end(JSON.stringify(dataError));
    }
});

module.exports = router;
