import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import NotFound from './pages/NotFound';

import { selectStats, updateStats } from './store/stats/statsSlice';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const stats = useSelector(selectStats);

  useEffect(() => {
    dispatch(updateStats(stats));
  }, [dispatch, tasks]); // Removed 'stats' from dependency array to prevent infinite loop

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/add" element={<AddTask />} />
        <Route path="tasks/:taskId" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;