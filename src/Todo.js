import React from 'react'
import 'antd/dist/antd.css'
import {Checkbox} from 'antd'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    function onChange(){
        toggleTodo(todo.id)
    }

    return (
        <div>
            {/* <label>
                <input type="checkbox" checked={todo.complete} onChange = {handleTodoClick}/>
                {todo.name}
            </label> */}
            <Checkbox onChange={onChange}>{todo.name}</Checkbox>
        </div>
    )
}
