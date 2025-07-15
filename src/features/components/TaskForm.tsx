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
} from '@admiral-ds/react-ui';
import type { Task } from '@entities/task/types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/store';
import { v4 as uuidv4 } from 'uuid';
import { updateTask, addTask } from '@entities/task/models/taskSlice';

const categories = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses = ['To Do', 'In Progress', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

export const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingTask = useSelector((state: RootState) => state.tasks.find((t) => t.id === id));

  const [form, setForm] = useState<Partial<Task>>({});

  useEffect(() => {
    if (existingTask) {
      setForm({ ...existingTask });
    } else if (id === 'new') {
      setForm({
        title: '',
        description: '',
        category: 'Bug',
        status: 'To Do',
        priority: 'Low',
        date: new Date().toISOString(),
      });
    }
  }, [existingTask, id]);

  const handleChange = (field: keyof Task, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.title || !form.category || !form.status || !form.priority || !form.date) {
      alert('Please fill in all required fields.');
      return;
    }
    if (id === 'new') {
      const newTask: Task = {
        ...(form as Task),
        id: uuidv4(),
      };
      dispatch(addTask(newTask));
    } else {
      console.log(form.date);
      dispatch(updateTask({ id: id!, task: form }));
    }
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSelect = (field: keyof Task) => (e: ChangeEvent<HTMLSelectElement>) =>
    handleChange(field, e.target.value);

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
      <T font="Subtitle/Subtitle 2">Edit Task</T>

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
