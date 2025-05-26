import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/saved-recipes', label: 'Saved Recipes' },
    { path: '/meal-planner', label: 'Meal Planner' },
    { path: '/about', label: 'About' },
  ];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className={`sticky top-0 z-10 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-md transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
          <ChefHat size={28} />
          <span className="font-bold text-xl sm:text-2xl">SmartRecipe</span>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === item.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden px-4 py-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
export default Header;