import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Trash2, 
  Edit, 
  Calendar, 
  Tag, 
  AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isPast, parseISO } from 'date-fns';

import { Task, Priority } from '../../types';
import { toggleTaskCompletion, deleteTask } from '../../store/tasks/tasksSlice';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'text-error-600';
      case Priority.MEDIUM:
        return 'text-warning-600';
      case Priority.LOW:
        return 'text-success-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityBadgeColor = (priority: Priority) => {
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

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}`);
  };

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const isDueDatePast = task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`card cursor-pointer p-4 ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full items-start space-x-3">
          <button
            className="mt-1 flex-shrink-0 transform transition-transform hover:scale-110 focus:outline-none"
            onClick={handleToggleComplete}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-success-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-base font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description.length > 100 
                  ? `${task.description.substring(0, 100)}...` 
                  : task.description}
              </p>
            )}
            
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  {isDueDatePast ? (
                    <AlertTriangle className="h-4 w-4 text-error-600" />
                  ) : (
                    <Calendar className="h-4 w-4 text-gray-500" />
                  )}
                  <span className={`text-xs ${isDueDatePast ? 'text-error-600 font-medium' : 'text-gray-500'}`}>
                    {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              
              {task.priority && (
                <span className={`badge ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
              
              {task.category && (
                <div className="flex items-center space-x-1">
                  <Tag className="h-3.5 w-3.5 text-primary-600" />
                  <span className="text-xs text-primary-700">{task.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className={`flex space-x-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
            onClick={handleEdit}
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="rounded p-1 text-gray-400 hover:bg-error-50 hover:text-error-600 focus:outline-none"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;