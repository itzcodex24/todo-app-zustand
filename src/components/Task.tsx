import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store";

export interface Task {
  title: string;
  status: string;
}

type Props = {
  title: string;
  status: string;
};

function Task({ title, status }: Props) {
  const deleteTask = useStore((state) => state.deleteTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);

  const handleDelete = () => {
    deleteTask(title);
  };

  return (
    <div
      className="w-full min-h-14 flex flex-col bg-violet-300 rounded-md text-white px-4 py-2 hover:cursor-move"
      draggable
      onDragStart={(e) => {
        console.log(title);
        setDraggedTask(title);
      }}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="rounded-lg flex justify-center items-center self-end bg-violet-600 px-4 py-1 gap-x-2">
        <span>{status}</span>
        <button onClick={() => handleDelete()}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default Task;
