import { Flex, T, Spinner, InputField } from '@admiral-ds/react-ui';
import { TaskItem } from '@features/components/TaskItem';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery, useDeleteTaskMutation } from '@shared/api/tasksApi';
import { useState } from 'react';

export const TaskList = () => {
  const [search, setSearch] = useState('');
  const { data: tasks, isLoading, isError} = useGetTasksQuery(search);
  const navigate = useNavigate();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <InputField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search by title...'
      />

      {isLoading && <Spinner />}
      {isError && <T font="Body/Body 2 Long" as="h1" style={{ fontSize: '24px' }}>Error</T>}

      <Flex.Container
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {tasks && tasks.length > 0 ? tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => navigate(`/task/${task.id}`)}
            onDelete={handleDelete}
          />
        )) : <T font="Body/Body 2 Long" as="h1" style={{ fontSize: '24px' }}>Task list is empty</T>}
      </Flex.Container>
    </div>
  );
};
