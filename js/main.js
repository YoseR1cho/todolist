const todo_input=document.querySelector('.todo_input');
const todo_button=document.querySelector('.todo_button');
const myList=document.querySelector('.myList ul');
const clearList=document.querySelector('.clearList');

//Event Listeners 事件监听
todo_button.addEventListener('click',addToDoList);
clearList.addEventListener('click',clearTodos);

//todoList页面渲染
function getToDoList(){
    //获取本地储存todos数组和todos数组状态
    const todoList=JSON.parse(localStorage.getItem('todos'))
    const todostatus=JSON.parse(localStorage.getItem('todostatus'))

    if( todoList && todostatus ){
        const todoListArr=Object.values(todoList)
        const todostatusArr=Object.values(todostatus)
        // 将获取到的数组处理为字符串
        const todohtmlStr=todoListArr.map((item,index)=>{
            const statu1= todostatusArr[index]===0?'':'transparent'
            const statu2= todostatusArr[index]===0?'':'noline'
            return `<div class="todo ${statu1}"  data-id="${index+1}">
            <button class="finish"><i></i></button>
            <li class="${statu2}">${item}</li>
            <button class="delete"><i></i></button>
        </div>`
        }).join('');
        myList.innerHTML=todohtmlStr;
    }else{
        myList.innerHTML=''
    }
}


// 添加事项函数
function addToDoList(e){
    //输入框判空
    e.preventDefault() //阻止默认事件
    const todoValue=todo_input.value.trim()

    if(!todoValue){
        alert('请添加待办事宜哦~')
        return ;
    }
    let todo=todoValue;
    saveLocal(todo);
    getToDoList()
    todo_input.value=''
};

// 维护本地储存
function saveLocal(todo)
{
    let todos,todostatus;
    todos= localStorage.getItem('todos') === null ?[]:JSON.parse(localStorage.getItem('todos'));
    todostatus= localStorage.getItem('todostatus') === null ?[]:JSON.parse(localStorage.getItem('todostatus'));

    todos.push(todo);
    todostatus.push(0)
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todostatus', JSON.stringify(todostatus));
};

// 删除事项函数
(()=>{
    myList.addEventListener('click',e=>{
        if(e.target.className==='delete'){
            const p=e.target.parentNode

            let iterator= gen(p);
            iterator.next()
            iterator.next()
            iterator.next()
        }
    })
})();

// 完成事项函数
(()=>{
    myList.addEventListener('click',e=>{
        if(e.target.className==='finish'){
        const p=e.target.parentNode
        
        let todostatus= localStorage.getItem('todostatus') === null ?[]:JSON.parse(localStorage.getItem('todostatus'));
        todostatus[p.dataset.id-1]= todostatus[p.dataset.id-1]===0?1:0
        
        localStorage.setItem('todostatus',JSON.stringify(todostatus))

        getToDoList()
    }})
})();

// 清空所有事项函数
function clearTodos(){
    const todos=localStorage.getItem('todos');
    if(!todos){
        return ;
    }

    myList.innerHTML=''
    localStorage.removeItem('todos');
    localStorage.removeItem('todostatus');

    getToDoList();
};


// 默认刷新页面执行渲染函数
getToDoList();