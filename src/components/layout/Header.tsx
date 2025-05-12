import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : 'Dashboard';

  const getPageTitle = () => {
    if (pathSegments.length === 0) return 'Dashboard';
    
    switch (pathSegments[0]) {
      case 'dashboard':
        return 'Dashboard';
      case 'tasks':
        if (pathSegments.length === 1) return 'Task List';
        if (pathSegments[1] === 'add') return 'Add New Task';
        return 'Task Details';
      default:
        return currentPage;
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          {children}
          <h1 className="ml-4 text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="relative cursor-pointer rounded-full bg-primary-100 p-1.5 text-primary-700 hover:bg-primary-200">
            <span className="sr-only">User menu</span>
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;