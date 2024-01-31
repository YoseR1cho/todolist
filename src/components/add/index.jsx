import React from 'react';
import styles from './style.module.less'
import {observer} from "mobx-react";
import TodoStore from "@/store/TodoStore.js";
import {message} from "antd";

const Index = () => {
    const todoRef = React.useRef();
    const [todo,setTodo] =React.useState('');
    const handleSubmit = (e)=>{
        e.preventDefault()
        const content = todo.trim();
        if(content){
            TodoStore.addTodo(content);
            message.success('todo添加成功！')
            setTodo('');

        }
    }
    return (
    <div className={styles.add}>
        <form onSubmit={handleSubmit}>
            <input type="text"
                   className={styles.todo_input}
                   placeholder="添加待办事宜"
                   ref={todoRef}
                   onChange={()=>setTodo(todoRef.current.value)}
                   value={todo}
            />

            <button type="submit">添加</button>
        </form>
    </div>
    );
};

export default observer(Index);
