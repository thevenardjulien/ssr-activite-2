import React from "react";

function App({ todos }) {
  return (
    <div>
      <p>TODOLIST</p>
      <ul>
        {todos && todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
