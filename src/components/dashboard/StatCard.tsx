import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, color, change }: StatCardProps) => {
  const getBgColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50';
      case 'secondary':
        return 'bg-secondary-50';
      case 'accent':
        return 'bg-accent-50';
      case 'success':
        return 'bg-success-50';
      case 'warning':
        return 'bg-warning-50';
      case 'error':
        return 'bg-error-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-600';
      case 'secondary':
        return 'text-secondary-600';
      case 'accent':
        return 'text-accent-600';
      case 'success':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'error':
        return 'text-error-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
          
          {change && (
            <p className={`mt-1 text-sm ${change.isPositive ? 'text-success-600' : 'text-error-600'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value}%
            </p>
          )}
        </div>
        
        <div className={`rounded-full p-3 ${getBgColor()}`}>
          <div className={getIconColor()}>
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;