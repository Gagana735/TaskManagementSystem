import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  setSearchQuery, 
  setStatusFilter, 
  togglePriorityFilter, 
  toggleCategoryFilter,
  setSortBy,
  setSortOrder,
  resetFilters 
} from '../../store/filters/filtersSlice';
import { Priority } from '../../types';
import { Search, Filter, SortAsc, SortDesc, XCircle } from 'lucide-react';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const { searchQuery, status, priorities, categories, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.filters
  );
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract all unique categories from tasks
  const uniqueCategories = Array.from(new Set(allTasks.map(task => task.category)));

  const handleStatusChange = (newStatus: 'all' | 'completed' | 'active') => {
    dispatch(setStatusFilter(newStatus));
  };

  const handlePriorityToggle = (priority: Priority) => {
    dispatch(togglePriorityFilter(priority));
  };

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategoryFilter(category));
  };

  const handleSortChange = (newSortBy: string) => {
    dispatch(setSortBy(newSortBy as any));
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters = searchQuery || status !== 'all' || priorities.length > 0 || categories.length > 0;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        {/* Search field */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="input w-full pl-10"
          />
        </div>

        {/* Filter and sort */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`btn ${isFilterOpen || hasActiveFilters ? 'btn-primary' : 'btn-outline'}`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary-600">
                {priorities.length + categories.length + (status !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>

          <button onClick={toggleSortOrder} className="btn btn-outline p-2">
            {sortOrder === 'asc' ? (
              <SortAsc className="h-5 w-5" />
            ) : (
              <SortDesc className="h-5 w-5" />
            )}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="input"
            aria-label="Sort by"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="createdAt">Created Date</option>
          </select>
        </div>
      </div>

      {/* Expanded filter options */}
      {isFilterOpen && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-slide-down">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Status filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Status</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'all'}
                    onChange={() => handleStatusChange('all')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'active'}
                    onChange={() => handleStatusChange('active')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'completed'}
                    onChange={() => handleStatusChange('completed')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Completed</span>
                </label>
              </div>
            </div>

            {/* Priority filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">Priority</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={priorities.includes(Priority.HIGH)}
                    onChange={() => handlePriorityToggle(Priority.HIGH)}
                    className="h-4 w-4 rounded text-error-600 focus:ring-error-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">High</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={priorities.includes(Priority.MEDIUM)}
                    onChange={() => handlePriorityToggle(Priority.MEDIUM)}
                    className="h-4 w-4 rounded text-warning-600 focus:ring-warning-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Medium</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={priorities.includes(Priority.LOW)}
                    onChange={() => handlePriorityToggle(Priority.LOW)}
                    className="h-4 w-4 rounded text-success-600 focus:ring-success-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Low</span>
                </label>
              </div>
            </div>

            {/* Category filter */}
            <div className="lg:col-span-2">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((cat) => (
                  <label key={cat} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={categories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 mr-4 text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filter actions */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="btn btn-outline"
              disabled={!hasActiveFilters}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;