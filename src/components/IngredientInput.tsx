import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
interface IngredientInputProps {
  onSubmit: (ingredients: string[]) => void;
}
const IngredientInput: React.FC<IngredientInputProps> = ({ onSubmit }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]); 
  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onSubmit(ingredients);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-fade-in transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">What's in your kitchen?</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Add the ingredients you have available, and we'll create personalized recipes for you.
      </p>  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter an ingredient..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                      focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                      dark:text-white transition-colors duration-200"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 
                      transition-colors duration-200 flex items-center"
          >
            <Plus size={18} className="mr-1" />
            <span>Add</span>
          </button>
        </div>
        {ingredients.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm
                            bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300
                            transition-colors duration-200"
                >
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="pt-4">
          <button
            type="submit"
            disabled={ingredients.length === 0}
            className={`w-full py-3 rounded-md font-medium transition-colors duration-200 
                      ${ingredients.length > 0 
                        ? 'bg-secondary-500 text-white hover:bg-secondary-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
          >
            Generate Recipes
          </button>
        </div>
      </form>
    </div>
  );
};
export default IngredientInput;