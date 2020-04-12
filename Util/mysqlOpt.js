/*数据库的工具类*/

const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'bs'
});

function exec (sql, params) {
    return new Promise(function(resolve, reject){
        console.log(sql);
        console.log(params);
        connection.query(sql, params, function(err, result){
            if (err) {
                console.log(err);
                return;
            }

            resolve(result);
        })
    })
}

module.exports = {exec};

