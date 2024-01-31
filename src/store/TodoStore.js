import axios from "axios";
import Todo from '@/store/Todo.js'
import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {message} from "antd";


class TodoStore {
    todos
    constructor() {
        this.todos=[]
        makeObservable(this,{
            todos:observable,
            loadTodos:action.bound,
            addTodo:action.bound,
            deleteTodo:action.bound,
            delelteAllTodo:action.bound
        });
        this.loadTodos();
    }
    loadTodos(){
        axios.get('/api/todo').then(res=>{
            res.data.data.forEach(todo=>{
                this.todos.push(new Todo(todo));
            })
        })
    }
    addTodo(content){
        axios.post('/api/todo',{content}).then(data=>{
            const {content,_id:id} = data.data.data;
            this.todos.push(new Todo({content,id}))
        }).catch(()=>{
            message.error('添加todo失败!')
        })
    }
    deleteTodo(id){
        axios.delete(`/api/todo/${id}`).then(()=>{
            console.log('delete success!');
            this.todos = this.todos.filter(todo=>todo.id!==id);
        }).catch(()=>{
            message.error('完成Todo失败!');
        })
    }

    delelteAllTodo(){
        axios.delete('api/todo').then(()=>{
            this.todos = [];
            message.success('已完成所有Todo！')
        }).catch((err)=>{
            console.log(err);
            message.error('完成Todo失败!');
        })
    }
}

export default new TodoStore()
