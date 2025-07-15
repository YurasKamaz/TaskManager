import { Flex, T } from '@admiral-ds/react-ui';
import { TaskItem } from '@features/components/TaskItem';
import { useNavigate } from 'react-router-dom';
import type { Task } from '@entities/task/types';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@app/store';
import { removeTask } from '@entities/task/models/taskSlice';

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Flex.Container
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'flex-start',
      }}
    >
      {tasks.length ? (
        tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={(id) => navigate(`/task/${id}`)}
            onDelete={(id) => {
              if (confirm('Are you sure you want to delete this task?')) {
                dispatch(removeTask(id));
              }
            }}
          />
        ))
      ) : (
        <T font="Body/Body 2 Long" as="h1" style={{ fontSize: '24px' }}>
          Задачи отсутствуют
        </T>
      )}
    </Flex.Container>
  );
};
