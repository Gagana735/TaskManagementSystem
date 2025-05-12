import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { Task, Priority } from '../../types';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Complete React project setup',
      description: 'Set up React with Redux and React Router',
      completed: false,
      priority: Priority.HIGH,
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      category: 'Development',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      id: '2',
      title: 'Design task management UI',
      description: 'Create wireframes and mockups for the task management interface',
      completed: true,
      priority: Priority.MEDIUM,
      dueDate: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
      category: 'Design',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      id: '3',
      title: 'Implement task filtering',
      description: 'Add ability to filter tasks by status, priority, and category',
      completed: false,
      priority: Priority.LOW,
      dueDate: format(new Date(Date.now() + 172800000), 'yyyy-MM-dd'),
      category: 'Development',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    },
  ],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: format(new Date(), 'yyyy-MM-dd'),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;