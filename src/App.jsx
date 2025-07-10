import React, { useState } from "react";


function App({ todos }) {

  const [todoList, setTodoList] = useState(todos);

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <div>
      <p>TODOLIST</p>
      <ul style={{listStyle: "none", width: "fit-content", display: "flex", flexDirection: "column", gap: "10px"}}>
        {todoList && todoList.map((todo) => (
            <li 
              key={todo.id} 
              style={{display: "flex", gap: "10px", justifyContent: "space-between"}}>
                {todo.title} 
                <button onClick={() => handleDelete(todo.id)}>Supprimer</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
