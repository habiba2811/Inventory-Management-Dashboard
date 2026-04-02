'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import {
  setGlobalSearchTerm,
  setIsDarkMode,
  setIsSidebarCollapsed,
  logout,
} from '@/app/state';
import { Settings, Bell, Menu, Sun, Moon, Search, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const globalSearchTerm = useAppSelector((state) => state.global.globalSearchTerm ?? '');
  const currentUser = useAppSelector((state) => state.global.currentUser);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const clearSearch = () => {
    dispatch(setGlobalSearchTerm(''));
  };

  const markNotificationsRead = () => {
    setNotificationCount(0);
    setIsNotificationsOpen(false);
  };

  return (
    <div className="flex justify-between items-center w-full mb-7" data-testid="top-navbar">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          data-testid="toggle-sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Search products, users, and categories"
            className="pl-10 pr-10 py-2 w-56 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
            value={globalSearchTerm}
            onChange={(e) => dispatch(setGlobalSearchTerm(e.target.value))}
            data-testid="global-search-input"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          {globalSearchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
              data-testid="clear-global-search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode} aria-label="Toggle dark mode" data-testid="toggle-dark-mode">
              {isDarkMode ? (
                <Sun className=" cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className=" cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="relative"
              aria-label="Open notifications"
              data-testid="notifications-toggle"
            >
              <Bell className="cursor-pointer text-gray-500" size={24} />
              <span
                className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full"
                data-testid="notifications-count"
              >
                {notificationCount}
              </span>
            </button>
            {isNotificationsOpen && (
              <div
                className="absolute right-0 top-10 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3"
                data-testid="notifications-menu"
              >
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Notifications
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>Inventory sync completed.</li>
                  <li>2 low-stock alerts.</li>
                  <li>1 new product submitted.</li>
                </ul>
                <button
                  onClick={markNotificationsRead}
                  className="w-full text-xs bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-700"
                  data-testid="mark-notifications-read"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3" data-testid="profile-chip">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white grid place-items-center text-xs font-bold">
              {initials}
            </div>
            <span className="font-semibold">{currentUser?.name ?? ''}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-red-100 hover:text-red-600 transition flex items-center gap-1 text-sm text-gray-600"
            aria-label="Logout"
            data-testid="logout-button"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
        <Link href="/settings" data-testid="navbar-settings-link">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
