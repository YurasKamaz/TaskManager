import type { Task } from '@entities/task/types';

const TASKS_KEY = 'tasks';

export const saveTasksToLocalStorage = (tasks: Task[]) =>
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const getTasksFromLocalStorage = () => JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
