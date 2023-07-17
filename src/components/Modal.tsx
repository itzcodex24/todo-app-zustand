import { useState } from "react";

function Modal({ addTask }: { addTask: (title: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="absolute z-[10] inset-0 w-full min-h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div className="rounded-md w-1/4 h-24 flex justify-center items-center flex-col bg-violet-900 text-white ">
        <h1 className="text-2xl font-bold mb-2">Enter title</h1>
        <div className="flex items-center gap-x-1">
          <input
            className="rounded pl-2 outline-none border-none text-white bg-violet-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            className="px-4 border border-white rounded-md"
            onClick={() => addTask(input)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
