import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

import { RootState } from '../store';
import TaskForm from '../components/tasks/TaskForm';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion } from '../store/tasks/tasksSlice';
import { Priority } from '../types';

const TaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );
  
  useEffect(() => {
    if (!task) {
      navigate('/tasks');
    }
  }, [task, navigate]);
  
  if (!task) {
    return null;
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      navigate('/tasks');
    }
  };
  
  const handleToggleComplete = () => {
    dispatch(toggleTaskCompletion(task.id));
  };
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'bg-error-100 text-error-800';
      case Priority.MEDIUM:
        return 'bg-warning-100 text-warning-800';
      case Priority.LOW:
        return 'bg-success-100 text-success-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Tasks
        </button>
        
        <div className="flex space-x-3">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-error-600 text-white hover:bg-error-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="card p-6">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Edit Task</h2>
          <TaskForm task={task} isEditing={true} />
          <div className="mt-4 text-right">
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel Editing
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              <div className="flex items-center space-x-2">
                <span className={`badge ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                <span className={`badge ${task.completed ? 'bg-success-100 text-success-800' : 'bg-primary-100 text-primary-800'}`}>
                  {task.completed ? 'Completed' : 'Active'}
                </span>
              </div>
            </div>
            
            <div className="mb-6 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Description</h3>
                <p className="whitespace-pre-wrap text-gray-700">{task.description || 'No description provided.'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Due Date</h3>
                  <p className="text-gray-700">{format(parseISO(task.dueDate), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Category</h3>
                  <p className="text-gray-700">{task.category}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Created</h3>
                  <p className="text-gray-700">{format(parseISO(task.createdAt), 'MMMM d, yyyy')}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleToggleComplete}
                className={`btn ${
                  task.completed
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-success-600 text-white hover:bg-success-700'
                } w-full`}
              >
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskDetails;