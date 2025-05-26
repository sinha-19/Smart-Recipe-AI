import React from 'react';
import { Heart } from 'lucide-react';
const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Created by Saket
          </p>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <Heart size={14} className="text-secondary-500" />
          <span>and good ingredients</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;