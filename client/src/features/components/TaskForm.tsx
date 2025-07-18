import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import {
  InputField,
  Button,
  T,
  TextArea,
  SelectField,
  Option,
  DateField,
  Spinner,
} from '@admiral-ds/react-ui';
import type { Task } from '@entities/task/types';
import { useCreateTaskMutation, useGetTaskQuery, useUpdateTaskMutation } from '@/shared/api/tasksApi';

const categories: Task['category'][] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];
const priorities: Task['priority'][] = ['Low', 'Medium', 'High'];

export const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const { data: taskData, isLoading, isError}  = useGetTaskQuery(id!, { skip: isNew })

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: 'Feature',
    status: 'To Do',
    priority: 'Medium',
    date: '__.__.____',
  });

  useEffect(() => {
    if (taskData && !isNew) {
      setForm(taskData);
    }
  }, [taskData]);

  const handleChange = (field: keyof Task, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.category || !form.status || !form.priority || !form.date) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      if (isNew) {
        await createTask(form as Omit<Task, 'id'>)
      } else {
        await updateTask({ id: id!, task: form })
      }
      navigate('/');
    } catch(e) {
      alert('Error while saving task.');
      console.error(e);
    }
    
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSelect = (field: keyof Task) => (e: ChangeEvent<HTMLSelectElement>) =>
    handleChange(field, e.target.value);

  if (isLoading) return <Spinner />
  if (isError) return <T font="Body/Body 2 Long" as="h1" style={{ fontSize: '24px' }}>Error</T> 

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <T font="Subtitle/Subtitle 2">{isNew ? 'Create task' : 'Edit task'}</T>

      <T as="label" font="Body/Body 2 Short">
        Title
      </T>
      <InputField
        maxLength={100}
        value={form.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <T as="label" font="Body/Body 2 Short">
        Description
      </T>
      <TextArea
        maxLength={255}
        value={form.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <T as="label" font="Body/Body 2 Short">
        Category
      </T>
      <SelectField value={form.category} onChange={handleSelect('category')}>
        {categories.map((c) => (
          <Option key={c} value={c}>
            {c}
          </Option>
        ))}
      </SelectField>

      <T as="label" font="Body/Body 2 Short">
        Status
      </T>
      <SelectField value={form.status} onChange={handleSelect('status')}>
        {statuses.map((s) => (
          <Option key={s} value={s}>
            {s}
          </Option>
        ))}
      </SelectField>

      <T as="label" font="Body/Body 2 Short">
        Priority
      </T>
      <SelectField value={form.priority} onChange={handleSelect('priority')}>
        {priorities.map((p) => (
          <Option key={p} value={p}>
            {p}
          </Option>
        ))}
      </SelectField>

      <T as="label" font="Body/Body 2 Short">
        Expired at
      </T>
      <DateField
        data-container-id="dateFieldIdTwo"
        onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
        value={form.date?.length === 10 ? form.date : '__.__.____'}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Button dimension="s" appearance="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button dimension="s" appearance="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
