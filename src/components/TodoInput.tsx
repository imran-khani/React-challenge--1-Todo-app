import { useState } from "react";

type InputTypes = {
  addTodo: (value: string) => void;
};

const TodoInput = ({ addTodo }: InputTypes) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    addTodo(value);
    setValue("");
  };
  return (
    <div className="flex flex-row gap-x-2 mt-10">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a todo"
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
      <button
      disabled={!value}
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
