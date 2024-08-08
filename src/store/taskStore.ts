import { create } from "zustand";

import { api } from "../services/api";

export interface ITask {
  id?: string;
  title: string;
  content: string;
  color: string;
  isFavorite: boolean;
}

interface TaskStore {
  tasks: ITask[];
  filteredTasks: ITask[];
  createTask: (newTask: ITask) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTask: (taskId: string, updatedTask: ITask) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  filterTasks: (searchTerm: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],

  createTask: async (newTask: ITask) => {
    const response = await api.post("/tasks", newTask);
    const { id } = response.data;
    const createdTask: ITask = { ...newTask, id };

    set((state) => ({
      tasks: [...state.tasks, createdTask],
      filteredTasks: [...state.tasks, createdTask],
    }));
  },

  fetchTasks: async () => {
    const response = await api.get("/tasks");
    const tasks = response.data;
    set({ tasks });
  },

  deleteTask: async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        tasks: updatedTasks,
        filteredTasks: updatedTasks,
      };
    });
  },

  updateTask: async (taskId: string, updatedTask: ITask) => {
    await api.put(`/tasks/${taskId}`, updatedTask);
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      );
      return {
        tasks: updatedTasks,
        filteredTasks: updatedTasks,
      };
    });
  },

  filterTasks: (searchTerm: string) => {
    const tasks = get().tasks;
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredTasks: filtered });
  },
}));
