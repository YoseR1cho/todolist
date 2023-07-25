// 生成器异步实现todo的透明和删除
function *gen(e){
    yield removing(e);
    yield deleteTodos(e);
}

//为todo添加透明
function removing(p){
    p.classList.add('deleting')
}

function deleteTodos(p){
    //执行删除todo函数
    function fn(){
        let todos;
        todos= localStorage.getItem('todos') === null ?[]:JSON.parse(localStorage.getItem('todos'));
        todos.splice(p.dataset.id-1,1)
        
        let todostatus;
        todostatus= localStorage.getItem('todostatus') === null ?[]:JSON.parse(localStorage.getItem('todostatus'));
        todostatus.splice(p.dataset.id-1,1)
    
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('todostatus', JSON.stringify(todostatus));
    
        getToDoList()
    }
    // 如果todo已经被完成，直接删除
    if(p.classList.contains('transparent')){
        fn()
        return ;
    }
    setTimeout(fn,500)
}
