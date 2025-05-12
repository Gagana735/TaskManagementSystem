import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../store/tasks/tasksSlice';
import { Task, Priority } from '../../types';

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
}

const TaskForm = ({ task, isEditing = false }: TaskFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task && isEditing) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setCategory(task.category);
    }
  }, [task, isEditing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const taskData = {
      title,
      description,
      priority,
      dueDate,
      category,
      completed: task?.completed || false,
    };
    
    if (isEditing && task) {
      dispatch(updateTask({ ...taskData, id: task.id, createdAt: task.createdAt }));
    } else {
      dispatch(addTask(taskData));
    }
    
    navigate('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            Task Title <span className="text-error-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`input w-full ${errors.title ? 'border-error-500' : ''}`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="mt-1 text-xs text-error-600">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input w-full"
            placeholder="Enter task description"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="priority" className="mb-1 block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="input w-full"
            >
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-gray-700">
              Due Date <span className="text-error-600">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`input w-full ${errors.dueDate ? 'border-error-500' : ''}`}
            />
            {errors.dueDate && <p className="mt-1 text-xs text-error-600">{errors.dueDate}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
            Category <span className="text-error-600">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`input w-full ${errors.category ? 'border-error-500' : ''}`}
          >
            <option value="" disabled>Select a category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Research">Research</option>
            <option value="Marketing">Marketing</option>
            <option value="Planning">Planning</option>
          </select>
          {errors.category && <p className="mt-1 text-xs text-error-600">{errors.category}</p>}
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/tasks')}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;