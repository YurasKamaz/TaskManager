import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types';

type TaskContextType = {
    tasks: Task[];
    updateTask: (id: string, updatedTask: Partial<Task>) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
      {
        id: '1',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium',
      },
      {
        id: '2',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium',
      },
      {
        id: '3',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Feature',
        status: 'In Progress',
        priority: 'High',
      },
      {
        id: '4',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Feature',
        status: 'In Progress',
        priority: 'Low',
      },
      {
        id: '5',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Refactor',
        status: 'Done',
        priority: 'High',
      },
      {
        id: '6',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Test',
        status: 'Done',
        priority: 'Medium',
      },
      {
        id: '7',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Bug',
        status: 'To Do',
        priority: 'Medium',
      },
      {
        id: '8',
        title: 'Task Example',
        description: 'It is a test task',
        category: 'Documentation',
        status: 'To Do',
        priority: 'Medium',
      },
    ]);

    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks((prev) =>
        prev.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
        )
        );
    };

    return (
    <TaskContext.Provider 
      value={{ tasks, updateTask }}
    >
        {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error('useTasks must be used inside <TaskProvider>');
    return ctx;
};