import '@/styles/global.less'
import Header from "@/components/header";
import Add from '@/components/add'
import TodoList from "@/components/todoList";
function App() {

  return (
    <>
      <Header/>
      <Add/>
      <TodoList/>
    </>
  )
}

export default App
