import { Flex, Tag, Button, T } from '@admiral-ds/react-ui';
import type { TaskItemProps } from '@entities/task/types';
import { categoryToKind, statusToKind, priorityToKind } from '@shared/utils/tagMapping';

export const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  return (
    <Flex.Container
      style={{
        width: '295px',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        backgroundColor: 'var(--color-bg-default)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div>
        <T font="Subtitle/Subtitle 2" as="h3">
          {task.title}
        </T>
        <T font="Body/Body 2 Short" as="p">
          {task.description}
        </T>
        <T font="Body/Body 2 Short" as="p">
          Created at: {new Date(task.createdAt).toLocaleDateString('ru-RU')}
        </T>
        <T font="Body/Body 2 Short" as="p">
          Expired at: {task.date.length === 10 ? task.date : new Date(task.date).toLocaleDateString('ru-RU')}
        </T>
      </div>

      <Flex.Row>
        <Tag kind={categoryToKind[task.category]} style={{ marginRight: '8px' }}>
          {task.category}
        </Tag>
        <Tag kind={statusToKind[task.status]} style={{ marginRight: '8px' }}>
          {task.status}
        </Tag>
        <Tag kind={priorityToKind[task.priority]}>{task.priority}</Tag>
      </Flex.Row>

      <Flex.Row style={{ marginTop: '16px' }}>
        <Button onClick={() => onEdit(task.id)} dimension="s">
          Edit
        </Button>
        <Button
          onClick={() => onDelete(task.id)}
          dimension="s"
          appearance="danger"
          style={{ marginLeft: '16px' }}
        >
          Delete
        </Button>
      </Flex.Row>
    </Flex.Container>
  );
};
