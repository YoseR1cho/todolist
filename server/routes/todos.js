const express = require('express');
const router = express.Router();

const todos = require('../models/todo.js')

const moment = require('moment')


// 获取所有todos
router.get('/', async (req, res)=> {
  try{
    const data = await todos.find({});
    res.json({
      code:'0000',
      msg:'获取todos成功',
      data:data
    })
  }
  catch(err){
    res.json({
      code:'1001',
      msg:'数据库连接失败',
      data:null
    })
  }
});

// 添加todo
router.post('/',async (req,res)=>{
  try {
    const data = await todos.create({
      content:req.body.content,
      createAt:moment(new Date()).toDate()
    })
    res.json({
      code:'0000',
      msg:'添加todo成功',
      data:data
    })
  }
  catch (err){
    res.json({
      code:'1002',
      msg:'添加todo失败',
      data:null
    })
  }
})

// 修改todo
router.post('/:id',async(req,res)=>{
  let id = req.params.id;
  try {
    const data = await todos.updateOne({_id:id},req.body)
    res.json({
      code:'0000',
      msg:'todo修改成功',
      data:data
    })
  }
  catch (err){
    res.json({
      code:'1003',
      msg:'todo修改失败',
      data:null
    })
  }
})

//删除todo
router.delete('/:id',async (req,res)=>{
  let id = req.params.id;
  try {
    const data = await todos.deleteOne({_id:id})
    res.json({
      code:'0000',
      msg:'todo删除成功',
      data:data
    })
  }
  catch (err){
    res.json({
      code:'1003',
      msg:'todo删除失败',
      data:null
    })
  }
})

// 删除所有Todo
router.delete('/',async (req,res)=>{
  try{
    const data = await todos.deleteMany({});
    console.log(data);
    res.json({
      code:'0000',
      msg:'todo全部完成',
      data:data
    })
  }
  catch (err){
    res.json({
      code:'1004',
      msg:'完成全部todo失败',
      data:null
    })
  }
})

module.exports = router;
