import { useState } from "react";

type TodoListTypes = {
  todo: {
    id: number;
    label: string;
    completed: boolean;
    isEditing: boolean;
  };

  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
  handleEdit: (id: number, value: string) => void;
  addTodo: (value: string) => void;
};

const TodoList = ({
  todo,
  handleComplete,
  handleDelete,
  handleEdit,
}: TodoListTypes) => {
  const [value, setValue] = useState(todo.label);

  return (
    <li className="flex flex-row gap-x-2 mt-2 items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleComplete(todo.id)}
      />
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
            onClick={() => handleEdit(todo.id, value)}
          >
            Update
          </button>
        </>
      ) : (
        <span
          className={`${todo.completed ? "line-through" : ""} cursor-pointer`}
        >
          {todo.label}
        </span>
      )}
      <div className="ms-auto flex gap-x-2 flex-row">
        {!todo.isEditing && (
          <button
            className="bg-blue-500 text-white px-4 py-1 ms-auto rounded-md"
            onClick={() => handleEdit(todo.id, value)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-4 py-1 rounded-md ms-auto"
          onClick={() => handleDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoList;
