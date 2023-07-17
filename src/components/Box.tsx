import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useStore } from "../store";
import Task from "./Task";

function Box({ title }: { title: string }) {
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const moveTask = useStore((state) => state.moveTask);
  const draggedTask = useStore((state) => state.taskDragged);

  const filtered = useMemo(() => {
    return tasks.filter((t: any) => t.status === title);
  }, [tasks, title]);

  const handleAdd = () => {
    const newTask = {
      title: `Task ${tasks.length + 1}`,
      status: title,
    };
    addTask(newTask);
  };

  return (
    <div className="aspect-square w-96 bg-violet-400 rounded-md border-2 border-transparent ">
      <h1 className="mt-2 mb-4 font-black flex items-center justify-center gap-x-2">
        <span>{title}</span>
        <button
          className="aspect-square rounded bg-violet-600 flex justify-center items-center p-1"
          onClick={handleAdd}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h1>
      <div
        className="w-full px-4 h-full flex flex-col gap-y-2 overflow-y-auto mb-2"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          console.log("dropped");
          console.log(draggedTask);
          moveTask(draggedTask as any, title);
          setDraggedTask(null);
        }}
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
      </div>
    </div>
  );
}

export default Box;