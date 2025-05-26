import React from 'react';
import { Loader2 } from 'lucide-react';
interface LoadingStateProps {
  message?: string;
}
const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Cooking up something delicious...' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <Loader2 size={48} className="text-primary-500 animate-spin mb-4" />
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center">{message}</p>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 max-w-md text-center">
        <p>Our AI chef is carefully preparing recipes tailored to your ingredients.</p>
      </div>
    </div>
  );
};
export default LoadingState;