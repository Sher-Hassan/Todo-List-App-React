import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './component/Navbar' 
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
uuidv4();

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 min-h-[80vh] flex flex-col items-center">
        <div className="addTodo mb-10 w-[80%] max-w-[600px]">
          
          <h2 className='text-2xl font-semibold mb-5 text-gray-800'>Your Todos</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Add a new task..."
              className='flex-grow p-3 text-lg bg-gray-100 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
            <button
              onClick={handleAdd}
              className='ml-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md transition-all duration-150'
            >
              Save
            </button>
          </div>
        </div>
        
        <div className="todos w-[80%] max-w-[600px]">
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
          {todos.length === 0 && <div className='text-gray-500 text-center py-10'>No Todos to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex justify-between items-center py-4 px-5 mb-4 bg-white rounded-lg shadow-md transition-all hover:shadow-lg"
              >
                <div className='flex items-center w-[80%]'>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='mr-3 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  <div
                    id={item.id}
                    className={`${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"} break-words w-full`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className=' text-blue-500 hover:text-blue-700 font-medium transition-all duration-150'
                  >
                    <FaEdit size={25} />
                  </button>
                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className='text-red-500 hover:text-red-700 font-medium transition-all duration-150'
                  >
                    <AiFillDelete size={25} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default App;
