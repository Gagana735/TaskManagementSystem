import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { RootState } from '../../store';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Priority } from '../../types';

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

const RecentTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  // Get 5 most recent tasks sorted by due date
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="card p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
      
      {recentTasks.length === 0 ? (
        <p className="py-4 text-center text-gray-500">No tasks available</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {recentTasks.map((task) => (
            <li key={task.id} className="py-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-success-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`truncate text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </p>
                  <div className="mt-1 flex items-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                    {task.category}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTasks;