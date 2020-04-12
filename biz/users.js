const mysqlOpt = require('../util/mysqlOpt')
const tools = require('../util/tools')

let add = async (req,resp)=>{
    let body = req.body;
    let sessionData = req.headers.sesionData;
    let tmp = await mysqlOpt.exec('select * from o_users where name = ? or account = ?',[body.name,body.account]);
    if(tmp.length > 0){
        resp.status(500);
        resp.send("教师名称不能重复或者账号不能重复");
        return;
    }
    let params = [
        tools.newId(),
        body.name,
        body.account,
        body.pwd,
        body.old,
        body.sex,
        tools.getDate19(),
        sessionData.name,
        sessionData.id

    ]

    await mysqlOpt.exec('insert into o_users value (?,?,?,?,?,?,?,?,?)', params);

    resp.send();
}



module.exports = {
    add
}