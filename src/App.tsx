import "./App.css";

import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      label: "Learn React",
      completed: false,
      isEditing: false,
    },
  ]);

  const addTodo = (value: string) => {
    setTodos((prevTodos) => {
      const newTodo = {
        id: prevTodos.length + 1,
        label: value,
        completed: false,
        isEditing: false,
      };
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      //  parse the current todos and set it to the state
      setTodos(JSON.parse(data));
    }
  }, []);

  const handleDelete = (id: number) => {
    setTodos((prev) => {
      const updatedTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleComplete = (id: number) => {
   const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (id: number, value: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, label: value, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  return (
    <>
      <h1 className="text-2xl mt-10 text-center w-full">Todo app</h1>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-[40rem]">
          <TodoInput addTodo={addTodo} />
          <ul className="w-full py-5">
            {todos.map((todo) => (
              <TodoList
                key={todo.id}
                todo={todo} // Update the type of the todos prop
                handleDelete={() => handleDelete(todo.id)}
                handleComplete={() => handleComplete(todo.id)}
                handleEdit={handleEdit}
                addTodo={addTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
