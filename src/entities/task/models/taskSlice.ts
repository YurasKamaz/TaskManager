import type { Task } from '@entities/task/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTasksFromLocalStorage } from '@shared/lib/localStorage';

const initialState: Task[] = getTasksFromLocalStorage();

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => [...state, action.payload],
    removeTask: (state, action: PayloadAction<string>) =>
      state.filter((task) => task.id !== action.payload),
    updateTask: (state, action: PayloadAction<{ id: string; task: Partial<Task> }>) =>
      state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.task } : task,
      ),
  },
});

export const { addTask, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
