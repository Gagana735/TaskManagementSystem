import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

import TaskCard from '../components/tasks/TaskCard';
import TaskFilter from '../components/tasks/TaskFilter';
import { RootState } from '../store';
import { Task, Priority } from '../types';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { searchQuery, status, priorities, categories, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.filters
  );
  
  const filteredAndSortedTasks = useMemo(() => {
    // Filter tasks
    let result = [...tasks];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (status !== 'all') {
      result = result.filter((task) =>
        status === 'completed' ? task.completed : !task.completed
      );
    }
    
    // Filter by priorities
    if (priorities.length > 0) {
      result = result.filter((task) => priorities.includes(task.priority));
    }
    
    // Filter by categories
    if (categories.length > 0) {
      result = result.filter((task) => categories.includes(task.category));
    }
    
    // Sort tasks
    result.sort((a: Task, b: Task) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = {
            [Priority.HIGH]: 0,
            [Priority.MEDIUM]: 1,
            [Priority.LOW]: 2,
          };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [tasks, searchQuery, status, priorities, categories, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Task List</h2>
        <Link to="/tasks/add" className="btn btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Link>
      </div>

      <TaskFilter />

      {filteredAndSortedTasks.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="rounded-full bg-primary-50 p-3">
            <PlusCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {tasks.length === 0
              ? "Get started by creating your first task"
              : "Try adjusting your filters or search query"}
          </p>
          {tasks.length === 0 && (
            <Link to="/tasks/add" className="mt-6 btn btn-primary">
              Create Task
            </Link>
          )}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 gap-4 md:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {filteredAndSortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;