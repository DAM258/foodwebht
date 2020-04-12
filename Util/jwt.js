// 安全拦截器
// 参考博客：https://blog.csdn.net/xiuxiumomo/article/details/82224110
const jwt = require("jsonwebtoken");

/**
 * 验证权限
 * @param token
 * @param secretkey 秘钥
 * @param success
 * @param error
 */
function verify (token,secretkey,success,error){
    jwt.verify(token,secretkey,function(err,decode){
        if(err){
            if (error) {
                error(err);
            }
        }else{
            if (success) {
                success(decode);
            }
        }
    })
}

/**
 * 签名
 * @param load 载荷 json对象 存储存在
 * @param secretkey 秘钥
 * @param expiresIn 过期时间 秒
 * @returns {number | PromiseLike<ArrayBuffer>}
 */
function sign (load,secretkey,expiresIn) {
    var token = jwt.sign(load,secretkey,{expiresIn: expiresIn});
    return token;
}

module.exports = {verify,sign};
