import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks/tasksSlice';
import filtersReducer from './filters/filtersSlice';
import statsReducer from './stats/statsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;