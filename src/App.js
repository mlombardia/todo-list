import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'
import 'antd/dist/antd.css'
import { Button, Input, message} from 'antd'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText]=useState({
    input: ''
  });
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []) //storing todos

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //getting todos

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === ''){
      message.error("Must add a name")
      return
    } 
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
    message.success("Added Todo succesfully!")
  }

  // function handleAddTodo2(e){
  //   const name = inputText
  //   if(name === ''){
  //     message.error("Must add a name")
  //     return
  //   }
  //   setTodos(prevTodos => {
  //     return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
  //   })
  //   inputText.value = null
  //   message.success("Added Todo succesfully!") 
  // }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
    message.success("Cleared completed Todos!")
  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      {/* <Input placeholder = "sarasa" name="input"/> */}
      <input ref={todoNameRef} />
      <Button type="primary" onClick={handleAddTodo}>Add todo</Button>
      <Button onClick={handleClearTodos}>Clear Complete</Button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
