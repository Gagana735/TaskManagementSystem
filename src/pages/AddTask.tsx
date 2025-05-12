import { motion } from 'framer-motion';
import TaskForm from '../components/tasks/TaskForm';

const AddTask = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Add New Task</h2>
        
        <div className="card p-6">
          <TaskForm />
        </div>
      </div>
    </motion.div>
  );
};

export default AddTask;