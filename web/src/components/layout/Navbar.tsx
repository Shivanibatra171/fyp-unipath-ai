import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  FileCheck,
  BookOpen,
  Bookmark,
  Bell,
  Scale,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShortlist } from '../../context/ShortlistContext';
import { MOCK_NOTIFICATIONS } from '../../data/mockNotifications';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { shortlistedUniversityIds, compareUniversityIds } = useShortlist();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <Sparkles className="w-4 h-4" /> },
    { label: '1. Discover Interest', path: '/discover', icon: <Compass className="w-4 h-4" /> },
    { label: '2. Match Programs', path: '/match', icon: <GraduationCap className="w-4 h-4" /> },
    { label: '3. Application Roadmap', path: '/guidance', icon: <FileCheck className="w-4 h-4" /> },
    { label: '4. Test Prep', path: '/test-prep', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#17284A] text-white border-b border-[#0E1B33] shadow-md">
      {/* Top Academic Notice Bar */}
      <div className="bg-[#0E1B33] px-4 py-1.5 text-xs text-[#DEE6F2] flex items-center justify-between border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C79A3D] animate-pulse" />
            <span className="font-medium text-white/90">
              Admissions 2026 Alert:
            </span>
            <span className="hidden sm:inline text-white/70">
              NUST NET-3, FAST-NUCES & IBA Karachi registration schedules now live.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/compare"
              className="text-[#C79A3D] hover:text-[#E9CCA0] font-medium flex items-center gap-1 transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare ({compareUniversityIds.length})</span>
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/60 hidden sm:inline">
              Pakistan Undergraduate Gateway
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <Link
            to={user.isLoggedIn ? '/dashboard' : '/'}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-[8px] bg-gradient-to-br from-[#C79A3D] to-[#A67C28] flex items-center justify-center text-[#17284A] shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  UniPath <span className="text-[#C79A3D]">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-white/10 text-[#C79A3D] px-1.5 py-0.5 rounded border border-white/15 font-semibold">
                  PAKISTAN
                </span>
              </div>
              <p className="text-[11px] text-[#CAD8EC] hidden sm:block tracking-wide">
                Undergraduate Admissions & Test Prep Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[8px] text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold shadow-xs'
                      : 'text-[#DEE6F2] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* Shortlist Badge Button */}
            <Link
              to="/shortlist"
              className="relative p-2 text-[#DEE6F2] hover:text-white hover:bg-white/10 rounded-[8px] transition-colors"
              title="Saved Universities"
            >
              <Bookmark className="w-5 h-5" />
              {shortlistedUniversityIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C79A3D] text-[#17284A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {shortlistedUniversityIds.length}
                </span>
              )}
            </Link>

            {/* Notification Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-[#DEE6F2] hover:text-white hover:bg-white/10 rounded-[8px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C79A3D]"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B5482F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popup Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-[#1B1F27] rounded-[12px] shadow-2xl border border-[#DEE6F2] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 bg-[#FAFBFD] border-b border-[#E1E4EA] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#17284A]">
                        Admission Alerts & Updates
                      </h4>
                      <p className="text-[11px] text-[#5B6472]">
                        {unreadCount} unread notices
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#C79A3D] hover:text-[#A67C28] font-medium transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E1E4EA]">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markSingleAsRead(notif.id);
                          setNotificationsOpen(false);
                          navigate(notif.linkTo);
                        }}
                        className={`p-3.5 hover:bg-[#F5F6F9] cursor-pointer transition-colors flex gap-3 items-start ${
                          !notif.isRead ? 'bg-[#F0F4FA]/70' : ''
                        }`}
                      >
                        <div className="mt-0.5">
                          {notif.urgency === 'urgent' ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#B5482F] inline-block" />
                          ) : notif.urgency === 'success' ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F] inline-block" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#17284A] inline-block" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-[#17284A] truncate">
                              {notif.universityName}
                            </span>
                            <span className="text-[10px] text-[#5B6472] shrink-0">
                              {notif.date}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-[#1B1F27] mt-0.5">
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-[#5B6472] line-clamp-2 mt-0.5">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 bg-[#FAFBFD] border-t border-[#E1E4EA] text-center">
                    <Link
                      to="/guidance"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-medium text-[#17284A] hover:text-[#C79A3D] flex items-center justify-center gap-1"
                    >
                      <span>View All Application Deadlines</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu or Login Button */}
            {user.isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-[8px] text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#C79A3D]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C79A3D] text-[#17284A] font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline font-medium text-white max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </button>

                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-[#1B1F27] rounded-[12px] shadow-xl border border-[#DEE6F2] z-50 overflow-hidden py-1.5 animate-in fade-in duration-100">
                    <div className="px-4 py-2.5 border-b border-[#E1E4EA] bg-[#FAFBFD]">
                      <p className="text-xs font-semibold text-[#17284A]">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-[#5B6472] truncate">
                        {user.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Badge variant="navy" size="sm">
                          {user.intermediateGroup}
                        </Badge>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#1B1F27] hover:bg-[#F5F6F9] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#5B6472]" />
                      <span>Profile & Academic Settings</span>
                    </Link>

                    <Link
                      to="/shortlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#1B1F27] hover:bg-[#F5F6F9] transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-[#5B6472]" />
                      <span>My Saved Shortlist ({shortlistedUniversityIds.length})</span>
                    </Link>

                    <Link
                      to="/compare"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#1B1F27] hover:bg-[#F5F6F9] transition-colors"
                    >
                      <Scale className="w-4 h-4 text-[#5B6472]" />
                      <span>Comparison Table</span>
                    </Link>

                    <div className="border-t border-[#E1E4EA] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-[#B5482F] hover:bg-[#FDF2F0] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-white hover:text-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#DEE6F2] hover:text-white hover:bg-white/10 rounded-[8px]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E1B33] border-t border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-[#DEE6F2] hover:bg-white/10'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="border-t border-white/10 pt-3 mt-3 flex flex-col gap-2">
            <Link
              to="/compare"
              className="flex items-center justify-between px-3 py-2 text-sm text-[#DEE6F2] hover:bg-white/10 rounded-[8px]"
            >
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4" /> Compare Universities
              </span>
              <Badge variant="gold" size="sm">
                {compareUniversityIds.length} Selected
              </Badge>
            </Link>
            <Link
              to="/shortlist"
              className="flex items-center justify-between px-3 py-2 text-sm text-[#DEE6F2] hover:bg-white/10 rounded-[8px]"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> My Shortlist
              </span>
              <Badge variant="navy" size="sm">
                {shortlistedUniversityIds.length} Saved
              </Badge>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
