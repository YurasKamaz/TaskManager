import { TaskList } from '@features/components/TaskList';
import { Button, T } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '12px 16px',
          boxSizing: 'border-box',
        }}
      >
        <T font="Subtitle/Subtitle 1" style={{ fontSize: '24px' }}>
          Task Manager
        </T>
        <Button
          dimension="m"
          style={{ justifyContent: 'flex-end' }}
          appearance="success"
          onClick={() => navigate('/task/new')}
        >
          Create task
        </Button>
      </div>
      <TaskList />
    </>
  );
};
