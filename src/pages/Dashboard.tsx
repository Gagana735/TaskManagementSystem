import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ClipboardList, 
  AlertTriangle, 
  Clock,
  Calendar
} from 'lucide-react';

import StatCard from '../components/dashboard/StatCard';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import { RootState } from '../store';
import { selectStats } from '../store/stats/statsSlice';

const Dashboard = () => {
  const stats = useSelector(selectStats);
  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks
  } = stats;
  
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div>
          <button className="btn btn-primary">
            <Calendar className="mr-2 h-4 w-4" />
            This Week
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ClipboardList className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle className="h-6 w-6" />}
          color="success"
          change={{ value: completionRate, isPositive: true }}
        />
        <StatCard
          title="In Progress"
          value={pendingTasks}
          icon={<Clock className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="error"
        />
      </div>

      {/* Charts and Recent Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryChart />
        <RecentTasks />
      </div>
    </motion.div>
  );
};

export default Dashboard;