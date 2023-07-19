import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStore } from "../store";
const Modal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setModal = useStore((state) => state.setModal);
  const modalState = useStore((state) => state.modalOpen);

  const addTask = useStore((state) => state.addTask);

  useEffect(() => {
    const keydownHandler = (event: any) => {
      if (event.key === "Enter") {
        console.log(inputRef.current?.value);
        handleSubmit();
      }

      if (event.key === "Escape") {
        setModal(false);
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const handleSubmit = () => {
    let value = inputRef.current?.value;
    if (
      !value ||
      typeof value !== "string" ||
      typeof modalState[1] == "boolean"
    )
      return setModal(false);

    addTask({ title: value, status: modalState[1] });

    setModal(false);
  };
  return (
    <motion.div className="z-[20] w-full absolute inset-0 flex justify-center items-center min-h-screen bg-[rgba(0,0,0,0.8)]">
      <div className="rounded-md w-1/2 h-72 bg-violet-700 border-2 border-white flex flex-col justify-center items-center gap-y-2 relative">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => setModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} className="text-white" />
        </button>
        <h1 className="text-2xl text-white">
          Add a new task! <span className="capitalize">{modalState[1]}</span>
        </h1>
        <input
          ref={inputRef}
          autoFocus
          className="w-1/2 rounded outline-none hover:outline-none hover:border-none pl-2 text-violet-900"
        />
        <button
          className="mt-4 rounded px-4 py-0.5 border-2 border-white hover:bg-white hover:text-violet-900 bg-violet-600 text-white transition-colors duration-500 ease-in-out"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
