import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  // Pages where Sidebar should be visible
  const isDashboardArea = [
    '/dashboard',
    '/discover',
    '/match',
    '/guidance',
    '/test-prep',
    '/shortlist',
    '/profile'
  ].some((path) => location.pathname === path || location.pathname.startsWith(path + '/'));

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F9] text-[#1B1F27]">
      <Navbar />
      <div className="flex-1 flex w-full">
        {isDashboardArea && <Sidebar />}
        <main className="flex-1 min-w-0 flex flex-col">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
