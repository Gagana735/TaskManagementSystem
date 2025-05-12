import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Priority } from '../../types';

interface FiltersState {
  searchQuery: string;
  status: 'all' | 'completed' | 'active';
  priorities: Priority[];
  categories: string[];
  sortBy: 'dueDate' | 'priority' | 'title' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

const initialState: FiltersState = {
  searchQuery: '',
  status: 'all',
  priorities: [],
  categories: [],
  sortBy: 'dueDate',
  sortOrder: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
      state.status = action.payload;
    },
    togglePriorityFilter: (state, action: PayloadAction<Priority>) => {
      const priority = action.payload;
      if (state.priorities.includes(priority)) {
        state.priorities = state.priorities.filter((p) => p !== priority);
      } else {
        state.priorities.push(priority);
      }
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.status = 'all';
      state.priorities = [];
      state.categories = [];
      state.sortBy = 'dueDate';
      state.sortOrder = 'asc';
    },
  },
});

export const {
  setSearchQuery,
  setStatusFilter,
  togglePriorityFilter,
  toggleCategoryFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;