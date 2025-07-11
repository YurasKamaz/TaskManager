import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { InputField, Button, T, TextArea, SelectField, Option } from '@admiral-ds/react-ui';
import { TaskContext } from '../contexts/TaskContext';
import type { Task } from '../types';

const categories = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses = ['To Do', 'In Progress', 'Done'];
const priorities = ['Low', 'Medium', 'High'];

export const TaskDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tasks, updateTask } = useContext(TaskContext)!;

    const task = tasks.find((t) => t.id === id);

    const [form, setForm] = useState<Partial<Task>>({});

    useEffect(() => {
        if (task) setForm(task);
    }, [task]);

    if (!task) return <T font="Body/Body 2 Short" as="p">Задача не найдена</T>;

    const handleChange = (field: keyof Task, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    const handleSave = () => {
        updateTask(id!, form);
        navigate('/');
    }

    const handleCancel = () => {
        navigate('/');
    };

    const handleSelect = (field: keyof Task) =>
        (e: ChangeEvent<HTMLSelectElement>) =>
        handleChange(field, e.target.value);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <T font="Subtitle/Subtitle 2">Edit Task</T>

            <T as="label" font="Body/Body 2 Short">Title</T>
            <InputField
                maxLength={100}
                value={form.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
            />
            
            <T as="label" font="Body/Body 2 Short">Description</T>
            <TextArea
                maxLength={255}
                value={form.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
            />

            <T as="label" font="Body/Body 2 Short">Category</T>
            <SelectField value={form.category} onChange={handleSelect('category')}>
                {categories.map((c) => (
                <Option key={c} value={c}>{c}</Option>
                ))}
            </SelectField>

            <T as="label" font="Body/Body 2 Short">Status</T>
            <SelectField value={form.status} onChange={handleSelect('status')}>
                {statuses.map((s) => (
                <Option key={s} value={s}>{s}</Option>
                ))}
            </SelectField>

            <T as="label" font="Body/Body 2 Short">Priority</T>
            <SelectField value={form.priority} onChange={handleSelect('priority')}>
                {priorities.map((p) => (
                    <Option key={p} value={p}>{p}</Option>
                ))}
            </SelectField>


            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button dimension="s" appearance="secondary" onClick={handleCancel}>Cancel</Button>
                <Button dimension="s" appearance="primary" onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};
