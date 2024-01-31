import React, {useState} from 'react';
import styles from './style.module.less'
import TodoStore from "@/store/TodoStore.js";
import {observer} from "mobx-react";
import Todo from "@/components/todoList/Todo.jsx";
import Confirm from "@/components/confirm/index.jsx";

const Index = () => {
    const {todos,deleteTodo,delelteAllTodo} = TodoStore;
    const [confirm,setConfirm] = useState(false);

    const handleOk = ()=>{
        setConfirm(false);
        delelteAllTodo();
    }

    return (
        <div className={styles.todoList}>
            <Confirm open={confirm} onCancel={()=>setConfirm(false)} onOk={handleOk} message='确认完成所有Todo吗？'/>
            <div className={styles.timeDisplay}>
                <div className={styles.time_icon}><i></i></div>
                <div className={styles.datatimer}><span></span></div>
                <div className={styles.clearList}><span onClick={()=>todos[0] && setConfirm(true)}>全部完成</span></div>
            </div>
            <div>
                <ul>
                    {
                        todos.map(todo=>{
                            return (
                                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default observer(Index);
