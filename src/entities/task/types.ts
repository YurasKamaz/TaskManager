export type Task = {
  id: string;
  title: string;
  description?: string;
  category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  createdAt: string;
};

export type TaskItemProps = {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};
