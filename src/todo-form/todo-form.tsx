import React, { useState } from "react";

export function TodoForm({ saveTodo }) {
  const [title, setTitle] = useState("");

  return (
    <div>
      <h1>Noah's Todo App</h1>
      <input
        name="title-input"
        data-testid="todo-form.title-input"
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      />
      <button
        type="button"
        data-testid="todo-form.add-item"
        onClick={() => {
          saveTodo({ title });
        }}
      >
        Add Item
      </button>
    </div>
  );
}
