import { Router, Request, Response } from 'express';
import { tasks } from '../db/taskDB';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

const VALID_CATEGORIES = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const VALID_STATUSES = ['To Do', 'In Progress', 'Done'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

const router = Router();

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU');
}

router.get('/', (req: Request, res: Response) => {
  const search = req.query.search?.toString().toLowerCase();

  const filteredTasks = search
    ? tasks.filter((task) => task.title.toLowerCase().includes(search))
    : tasks;

  res.json(filteredTasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

router.post('/', (req: Request, res: Response) => {
  const { title, description, category, status, priority, date } = req.body;

  if (!title || !category || !status || !priority) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    category,
    status,
    priority,
    date,
    createdAt: formatDate(new Date().toISOString()),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.patch('/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const updatedFields = { ...req.body };

  if (!VALID_CATEGORIES.includes(req.body.category) && req.body.category !== undefined) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  if (!VALID_STATUSES.includes(req.body.status) && req.body.status !== undefined) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  if (!VALID_PRIORITIES.includes(req.body.priority) && req.body.priority !== undefined) {
    return res.status(400).json({ error: 'Invalid priority' });
  }


  // if (updatedFields.date) {
  //   updatedFields.date = formatDate(updatedFields.date);
  // }

  tasks[index] = { ...tasks[index], ...updatedFields };
  res.json(tasks[index]);
});


router.delete('/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  tasks.splice(index, 1);
  res.status(204).end();
});

export default router;
