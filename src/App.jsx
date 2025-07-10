import React from "react";

function App({ todos }) {
  return (
    <div>
      <p>HELLO WORLD</p>
      {todos && todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default App;
