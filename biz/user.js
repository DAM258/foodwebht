const mysqlOpt = require('../util/mysqlOpt')
const jwt = require('../util/jwt')


let  login = async(req,resp)=>{
    let query = req.query;
    let account = query.account;
    let pwd = query.pwd;

    let users = await mysqlOpt.exec('select * from o_user where account = ?',[account]);

    if(users.length !==1){
        resp.status(500);
        resp.send('用户名或者密码错误');

        return;

    }

    let rightPwd = users[0].pwd;
    if(rightPwd == pwd){
        let encryptUser = user[0];
        let token = jwt.sign(JSON.parse(JSON.stringify(encryptUser)),global.jwtKey , 86400);
        resp.send(token)
    }
    else{
        resp.status(500);
        resp.send('用户名或者密码错误');
    }
}

module.exports = {
    login
}