import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Modal({ addTask }: { addTask: (title: string) => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (input === "") return setError("Please enter a title");
    addTask(input);
  };

  return (
    <motion.div
      className="absolute z-[10] inset-0 w-full min-h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
      variants={{
        exit: {
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        },
        hidden: {
          opacity: 0,
        },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="rounded-md w-1/4 h-24 flex justify-center items-center flex-col bg-violet-900 text-white ">
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
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
