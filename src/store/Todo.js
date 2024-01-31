import {makeAutoObservable} from "mobx";
import axios from "axios";
import {message} from 'antd'

export default class Todo {
    id;
    content;
    isCompleted;
    constructor(todo) {
        this.id = todo._id
        this.content = todo.content
        this.isCompleted = todo.isCompleted ||false
        makeAutoObservable(this)
    }
    modifyTodoIsCompleted(){
        this.isCompleted = !this.isCompleted
        axios.post(`/api/todo/${this.id}`,{isCompleted:this.isCompleted}).then(res=>{
            console.log('toggled')
        }).catch(()=>{
            message.error('确认完成失败')
        })
    }

    modifyTodoContent(content){
        if(!content || content===this.content)  return;
        console.log('我执行了')
        this.content = content;
        axios.post(`/api/todo/${this.id}`,{content}).then(res=>{
            console.log(res);
        }).catch(()=>{
            message.error('修改todo失败')
        })
    }
}
