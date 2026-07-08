// Navigation Component
// Main navigation bar with logo, links, and dark mode toggle

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeToggle, Button } from '../common';
import { SignInModal } from '../auth/SignInModal/SignInModal';
import { useAuth } from '../../context/AuthContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import './Navigation.scss';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { user, signOut, loading, isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
  };

  const handleSignInClick = () => {
    setShowSignInModal(true);
    closeMobileMenu();
  };

  // Modernized, consistent Tailwind classes for active and inactive links
  const getNavLinkClass = (isActive: boolean) => {
    return isActive
      ? 'flex items-center gap-2 px-4 py-2 text-emerald-950 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg font-semibold shadow-sm transition-all duration-200'
      : 'flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-200';
  };

  return (
    <nav className="navigation border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-4 py-3">
      <div className="navigation__container max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Modernized Branding Logotype */}
        <div className="navigation__brand flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-200 dark:shadow-none">
            <span className="text-white font-black text-lg">T</span>
          </div>
          <h1 className="text-xl font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Trackify
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {!isAuthenticated && (
            <NavLink
              to="/"
              className={({ isActive }) => getNavLinkClass(isActive)}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          )}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={closeMobileMenu}
          >
            Dashboard
            {!isAuthenticated && (
              <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 rounded">
                demo
              </span>
            )}
          </NavLink>
          <NavLink
            to="/custom-fields"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={closeMobileMenu}
          >
            Custom Fields
            {!isAuthenticated && (
              <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 rounded">
                demo
              </span>
            )}
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={closeMobileMenu}
          >
            Statistics
            {!isAuthenticated && (
              <span className="ml-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 rounded">
                demo
              </span>
            )}
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{user.email}</span>
                  <Button
                    onClick={handleSignOut}
                    variant="secondary"
                    size="small"
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleSignInClick}
                  variant="primary"
                  size="small"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
                >
                  Sign In
                </Button>
              )}
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className={`p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 navigation__mobile-toggle ${isMobileMenuOpen ? 'navigation__mobile-toggle--open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="navigation__hamburger-line bg-slate-600 dark:bg-slate-300"></span>
              <span className="navigation__hamburger-line bg-slate-600 dark:bg-slate-300"></span>
              <span className="navigation__hamburger-line bg-slate-600 dark:bg-slate-300"></span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[65px] p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-2">
            {!isAuthenticated && (
              <NavLink
                to="/"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            )}
            <NavLink
              to="/dashboard"
              className={({ isActive }) => getNavLinkClass(isActive)}
              onClick={closeMobileMenu}
            >
              Dashboard
              {!isAuthenticated && (
                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                  demo
                </span>
              )}
            </NavLink>
            <NavLink
              to="/custom-fields"
              className={({ isActive }) => getNavLinkClass(isActive)}
              onClick={closeMobileMenu}
            >
              Custom Fields
              {!isAuthenticated && (
                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                  demo
                </span>
              )}
            </NavLink>
            <NavLink
              to="/statistics"
              className={({ isActive }) => getNavLinkClass(isActive)}
              onClick={closeMobileMenu}
            >
              Statistics
              {!isAuthenticated && (
                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                  demo
                </span>
              )}
            </NavLink>

            {!loading && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400 font-medium px-2">{user.email}</div>
                    <Button
                      onClick={handleSignOut}
                      variant="secondary"
                      fullWidth
                      className="rounded-lg"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleSignInClick}
                    variant="primary"
                    fullWidth
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />
    </nav>
  );
};

export default Navigation;