import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectStats } from '../../store/stats/statsSlice';

const getCategoryColor = (index: number) => {
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-success-500',
    'bg-warning-500',
    'bg-error-500',
    'bg-primary-700',
    'bg-secondary-700',
  ];
  return colors[index % colors.length];
};

const CategoryChart = () => {
  const stats = useSelector(selectStats);
  const { tasksPerCategory } = stats;
  
  const categories = Object.keys(tasksPerCategory);
  const total = categories.reduce((sum, category) => sum + tasksPerCategory[category], 0);
  
  if (total === 0) {
    return (
      <div className="card flex h-64 items-center justify-center p-6">
        <p className="text-gray-500">No tasks available</p>
      </div>
    );
  }
  
  return (
    <div className="card p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Tasks by Category</h3>
      
      <div className="flex items-center justify-between">
        {/* Chart */}
        <div className="flex h-44 w-44 items-center justify-center">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90 transform">
              {categories.map((category, index) => {
                const value = tasksPerCategory[category];
                const percentage = (value / total) * 100;
                
                // Calculate the slice
                let currentOffset = 0;
                for (let i = 0; i < index; i++) {
                  currentOffset += (tasksPerCategory[categories[i]] / total) * 100;
                }
                
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -currentOffset;
                
                return (
                  <circle
                    key={category}
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke={getCategoryColor(index).replace('bg-', 'var(--tw-')}
                    strokeWidth="3.5"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={`${strokeDashoffset}`}
                    className="transition-all duration-500"
                  />
                );
              })}
              <circle cx="18" cy="18" r="12" fill="white" />
            </svg>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex-1 pl-4">
          <ul className="space-y-2">
            {categories.map((category, index) => {
              const value = tasksPerCategory[category];
              const percentage = Math.round((value / total) * 100);
              
              return (
                <li key={category} className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${getCategoryColor(index)}`}></div>
                  <span className="mr-2 text-sm text-gray-700">{category}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">
                    {value} ({percentage}%)
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;