import React, {useRef, useState} from 'react';
import styles from "@/components/todoList/style.module.less";
import {observer} from "mobx-react";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";

const Todo = ({todo,deleteTodo}) => {
    const [isEditing,setIsEditing] = useState(false);
    const [content,setContent] = useState(todo.content);
    const inputRef = useRef();

    const clickEdit = async (e)=>{
        e.stopPropagation();
        if(!isEditing){
            await setIsEditing(!isEditing);
            return inputRef.current && inputRef.current.focus();
        }
        todo.modifyTodoContent(content.trim());
        setIsEditing(!isEditing);
    }
    return (
        <div
            className={[styles.todo,(todo.isCompleted?styles.finished:'')].join(' ')}
            style={isEditing?{backgroundColor:"#DEDEDEFF"}:{}}
        >
            <button onClick={()=>todo.modifyTodoIsCompleted()} disabled={isEditing}><CheckOutlined /></button>
            <div className={styles.content}>{!isEditing?<div>{todo.content}</div>:<input
                className={styles.edit_input}
                value={content}
                ref={inputRef}
                onChange={()=>setContent(inputRef.current.value)}
            />}</div>
            {!todo.isCompleted  && <button onClick={clickEdit}><EditOutlined /></button>}
            <button className={styles.delete} onClick={()=>deleteTodo(todo.id)}><DeleteOutlined /></button>
        </div>
    );
};

export default observer(Todo);
