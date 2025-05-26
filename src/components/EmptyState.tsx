import React from 'react';
import { ChefHat } from 'lucide-react';
interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}
const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full mb-4">
        <ChefHat size={40} className="text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 
                    transition-colors duration-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
export default EmptyState;