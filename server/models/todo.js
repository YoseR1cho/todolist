// 引入mongoose
const mongoose = require('mongoose')
let todoSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required: true,
        default:false
    },
    createAt:Date
})

const todos = mongoose.model('todos',todoSchema);

module.exports = todos;

