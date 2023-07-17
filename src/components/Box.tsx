import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../store";
import Modal from "./Modal";
import Task from "./Task";
import { AnimatePresence, motion } from "framer-motion";

function Box({ title }: { title: string }) {
  const [isTaskOver, setIsTaskOver] = useState<boolean>(false);
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const moveTask = useStore((state) => state.moveTask);
  const draggedTask = useStore((state) => state.taskDragged);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log("e.key", e.key);
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    });
  }, [isOpen]);

  const filtered = useMemo(() => {
    return tasks.filter((t: any) => t.status === title);
  }, [tasks, title]);

  return (
    <>
      {isOpen && (
        <AnimatePresence mode="wait">
          <Modal
            addTask={(taskTitle) => {
              addTask({
                title: taskTitle,
                status: title,
              });
              setIsOpen(false);
            }}
          />
        </AnimatePresence>
      )}
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => {
          setTimeout(() => setIsAnimating(false), 1000);
        }}
        className={`aspect-square w-96 bg-violet-400 rounded-md border-2 border-transparent border-dashed ${
          isTaskOver && "border-white"
        }`}
      >
        <h1 className="mt-2 mb-4 font-black flex items-center justify-center gap-x-2">
          <span>{title}</span>
          <button
            className="aspect-square rounded bg-violet-600 flex justify-center items-center p-1"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </h1>
        <motion.div
          className="w-full px-4 h-full flex flex-col gap-y-2 overflow-y-auto mb-2 overflow-x-hidden"
          onDragOver={(e) => {
            setIsTaskOver(true);
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            setIsTaskOver(false);
          }}
          onDrop={(e) => {
            setIsTaskOver(false);
            moveTask(draggedTask as any, title);
            setDraggedTask(null);
          }}
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isAnimating ? "hidden" : "visible"}
        >
          {filtered.length > 0 ? (
            filtered.map((task) => (
              <Task key={task.title} title={task.title} status={task.status} />
            ))
          ) : (
            <div className="h-full flex justify-center items-center text-white ">
              No tasks
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Box;
