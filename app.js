const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('./util/jwt');
const tools = require('./util/tools');
const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 全系统允许跨域处理 这段配置要再new出express实例的时候就要设置了，放在所有的api前面，不然没有效果
 */
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","*");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
/**
 * 前置拦截器，用来拦截所有的请求,打印请求信息
 */
app.use(function(req, res, next){
    let prefix = `[app-request]${tools.getDate19()}-`;
    let reqPath = req.path;
    let type = req.method.toLowerCase();
    console.log(`${prefix}请求地址：${reqPath}`);
    console.log(`${prefix}请求类型：${type}`);
    if (type === 'post') {
        console.log(`${prefix}请求参数：${JSON.stringify(req.body)}`);
    } else if (type === 'get') {
        console.log(`${prefix}请求参数：${JSON.stringify(req.query)}`);
    }
    next();
})

app.use(function(req, res, next){
    let reqPath = req.path;
    if (reqPath !== '/user/login') {
        let token = req.headers.token;
        if (!token) {
            token = req.query.token;
        }
        jwt.verify(token,global.jwtKey,function(user){
            req.headers.sessionData = user;
            console.log(`[app-request]${tools.getDate19()}-当前用户：${JSON.stringify(user)}`);
            next();
        },function(err){
            res.status(500);
            res.send('会话已过期，请重新登录');
        })
    } else {
        next();
    }
})

app.use('/user', userRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    console.log('出错啦！');
    console.log(req.app.get('env') === 'development' ? err : {});
    res.status(500);
    res.send(err.message);
});

/**
 * 设置全局的加密串秘钥
 * @type {string}
 */
global.jwtKey = '123456';

app.listen(88,()=>{
    console.log('项目启动了...');
});
