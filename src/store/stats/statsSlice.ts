import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface StatsState {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  tasksPerCategory: Record<string, number>;
  tasksPerPriority: Record<string, number>;
  overdueTasks: number;
}

const initialState: StatsState = {
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  tasksPerCategory: {},
  tasksPerPriority: {},
  overdueTasks: 0,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateStats: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    // This will update stats whenever the tasks state changes
    builder.addMatcher(
      (action) => action.type.startsWith('tasks/'),
      (state, action) => {
        // Empty function to be replaced with middleware
      }
    );
  },
});

export const { updateStats } = statsSlice.actions;

// Selector to calculate stats based on current tasks
export const selectStats = (state: RootState) => {
  const { tasks } = state.tasks;
  const today = new Date().toISOString().split('T')[0];
  
  const stats: StatsState = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    pendingTasks: tasks.filter(task => !task.completed).length,
    tasksPerCategory: {},
    tasksPerPriority: {},
    overdueTasks: tasks.filter(task => !task.completed && task.dueDate < today).length,
  };
  
  // Calculate tasks per category
  tasks.forEach(task => {
    if (task.category) {
      stats.tasksPerCategory[task.category] = (stats.tasksPerCategory[task.category] || 0) + 1;
    }
  });
  
  // Calculate tasks per priority
  tasks.forEach(task => {
    stats.tasksPerPriority[task.priority] = (stats.tasksPerPriority[task.priority] || 0) + 1;
  });
  
  return stats;
};

export default statsSlice.reducer;