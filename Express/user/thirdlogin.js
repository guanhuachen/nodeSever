/**
 * Created by gh on 2017/3/19.
 */
// 第三方登陆接口
router.all('/user/thirdlogin', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    console.log(param.openid);
    client.query(User.getUserByOpenid,[param.openid],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就跳转绑定  flag=1 需要绑定  flag=2 // 不需要绑定
            if (results.length == 0) {
                res.end(JSON.stringify({status:'100',msg:'操作成功',flag:'1'}));
            } else{ // 数据库存在就登录成功
                res.end(JSON.stringify({status:'100',msg:'登录成功',flag:'2'}));
            }
        }
    })
});
module.exports = router;