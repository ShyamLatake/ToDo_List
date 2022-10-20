import React, { useEffect, useState } from "react";
import "./App.css";

import { AiOutlineDelete,AiOutlineCheckCircle } from 'react-icons/ai';
const App = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] =useState([]);
  const [newTitle,setNewTitle] =useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] =useState([]);

  const handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  }

   const handleDeleteTodo =(index) =>{
     let reduceTodo = [...allTodos];
     reduceTodo.splice(index,1);
     localStorage.setItem('todolist',JSON.stringify(reduceTodo));
     setTodos(reduceTodo);
   }

    const handleDeleteCompletedTodo = (index) =>{
      let reduceTodo = [...completedTodos];
     reduceTodo.splice(index,1);
     localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
     setCompletedTodos(reduceTodo);
    }

   const handleComplete =(index) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filterdItem ={
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompetedArr = [...completedTodos];
    updatedCompetedArr.push(filterdItem);
    setCompletedTodos(updatedCompetedArr );
    handleDeleteTodo(index);
    localStorage.setItem('CompletedTodos',JSON.stringify(updatedCompetedArr));
  }
  useEffect(()=>{
     let savedTodo = JSON.parse(localStorage.getItem('todolist'));
     let savedCompletedTodo = JSON.parse(localStorage.getItem('CompletedTodos'));
     if(savedTodo){
       setTodos(savedTodo);
     }
     if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Titles</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Task Title" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Task Description" />
          </div>
          <div>
            <button type="button" onClick={handleAddTodo} className="btn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`btn_1 ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`btn_1 ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Commpleted
          </button>
        </div>
        <div className="todo-list">
         {
          isCompleteScreen=== false && allTodos.map((item,index)=>{
             return(
            <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)}/>
              <AiOutlineCheckCircle className="check-icon" onClick={()=>handleComplete(index)}/>
              </div>
          </div>
             )
           })
         }

          {
          isCompleteScreen=== true && completedTodos.map((item,index)=>{
             return(
            <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Copmleted On : {item.completedOn}</small></p>
            </div>
            <div>
              <AiOutlineDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)}/>
              </div>
          </div>
             )
           })
         }
        </div>
      </div>
    </div>
  );
};

export default App;
