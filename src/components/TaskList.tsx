import { Flex } from '@admiral-ds/react-ui';
import { TaskItem } from './TaskItem';
import { useTasks } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types';

export const TaskList = () => {
    const { tasks } = useTasks();
    const navigate = useNavigate();
    return (
        <Flex.Container style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'flex-start',
        }}>
            {tasks.map((task : Task) => (
                <TaskItem key={task.id} task={task} onEdit={(id) => navigate(`/task/${id}`)} />
            ))}
        </Flex.Container>
    );
};