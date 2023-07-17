import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "./components/Task";

interface Todo {
  tasks: Task[];
  deleteTask: (title: string) => void;
  addTask: ({ title, status }: { title: string; status: string }) => void;
  taskDragged: string | null;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, status: string) => void;
}

const store = (set: any) => ({
  tasks: [],
  deleteTask: (title: string) => {
    set((state: any) => ({
      tasks: [...state.tasks.filter((task: any) => task.title !== title)],
    }));
  },
  addTask: ({ title, status }: { title: string; status: string }) => {
    set((state: any) => ({
      tasks: [...state.tasks, { title, status }],
    }));
  },
  taskDragged: null,
  setDraggedTask: (title: string | null) => {
    set((state: any) => ({
      taskDragged: title,
    }));
  },
  moveTask: (title: string, status: string) => {
    set((state: any) => ({
      tasks: state.tasks.map((task: any) =>
        task.title === title ? { ...task, status } : task
      ),
    }));
  },
});

export const useStore = create<Todo>(
  // @ts-ignore
  persist(store, {
    name: "todo-storage",
  })
);
