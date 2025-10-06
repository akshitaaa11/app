import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageSquare, 
  User, 
  Search, 
  BookOpen, 
  BarChart3, 
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';
import { mockNotifications } from '../data/mockData';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/chat', label: 'Chat Assistant', icon: MessageSquare },
    { path: '/scholarships', label: 'Find Scholarships', icon: Search },
    { path: '/my-scholarships', label: 'My Applications', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-full sidebar-glass transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="glass-purple p-2 rounded-lg animate-glow">
                  <GraduationCap className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">VidyaVikas</h1>
                  <p className="text-xs text-gray-600">Scholarship Platform</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-700"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'glass-purple text-amber-800 purple-glow'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-white/20">
          {/* Notifications */}
          <button className="flex items-center justify-center w-full p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white/10 transition-all duration-200 mb-3">
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-amber-500 rounded-full text-xs"></span>
            </div>
            {!isCollapsed && <span className="ml-3 font-medium text-sm">Notifications</span>}
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mb-3 ${
              isActive('/profile')
                ? 'glass-purple text-amber-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
            }`}
            title={isCollapsed ? user?.name : ''}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
              alt={user?.name}
              className="h-8 w-8 rounded-full border-2 border-white/30 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user?.name}</p>
                <p className="text-xs text-gray-600 truncate">{user?.university}</p>
              </div>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center justify-center w-full p-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50/20 transition-all duration-200"
            title={isCollapsed ? "Logout" : ''}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;