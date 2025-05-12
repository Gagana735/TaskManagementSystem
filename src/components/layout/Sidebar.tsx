import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, ListTodo as ListTodos, Tag, Calendar, Settings, HelpCircle, LogOut, CheckCircle2, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-7 w-7 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
        <nav className="space-y-6">
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">Main</h3>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <ListTodos className="mr-3 h-5 w-5" />
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tasks/add"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <CheckSquare className="mr-3 h-5 w-5" />
                  Add Task
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">Categories</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Tag className="mr-3 h-5 w-5 text-blue-500" />
                  Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Tag className="mr-3 h-5 w-5 text-green-500" />
                  Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Tag className="mr-3 h-5 w-5 text-purple-500" />
                  Research
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">Tools</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ClipboardList className="mr-3 h-5 w-5" />
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-6">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;