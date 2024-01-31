// 引入mongoose数据库
const mongoose = require('mongoose');
module.exports = function (success,error){
    if(typeof error!=='function'){
        error=() => {
            console.log('连接失败~~~')
        }
    }
    const {DBHOST,DBNAME,DBPORT} = require('../config/config.js');

    mongoose.set('strictQuery',true);

    //连接数据库
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`).then(()=>{
        success();
    }).catch(()=>{
        error();
    })
}
