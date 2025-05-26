import React, { createContext, useState, useContext, useEffect } from 'react';
import { Recipe, MealPlan, RecipeContextType } from '../types';
import { generateRecipesFromIngredients } from '../services/apiService';
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);
export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedRecipesData = localStorage.getItem('savedRecipes');
        if (savedRecipesData) {
          setSavedRecipes(JSON.parse(savedRecipesData));
        }
        const mealPlansData = localStorage.getItem('mealPlans');
        if (mealPlansData) {
          setMealPlans(JSON.parse(mealPlansData));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        setError('Failed to load saved recipes and meal plans.');
      }
    };
    loadSavedData();
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    } catch (error) {
      console.error('Error saving recipes:', error);
    }
  }, [savedRecipes]);
  useEffect(() => {
    try {
      localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    } catch (error) {
      console.error('Error saving meal plans:', error);
    }
  }, [mealPlans]);
  const generateRecipes = async (ingredients: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const generatedRecipes = await generateRecipesFromIngredients(ingredients);
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const saveRecipe = (recipe: Recipe) => {
    setSavedRecipes(prevRecipes => {
      const exists = prevRecipes.some(r => r.id === recipe.id);
      if (exists) {
        return prevRecipes.map(r => r.id === recipe.id ? recipe : r);
      } else {
        return [...prevRecipes, recipe];
      }
    });
  };
  const deleteRecipe = (id: string) => {
    setSavedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
  };
  const saveMealPlan = (mealPlan: MealPlan) => {
    setMealPlans(prevPlans => {
      const exists = prevPlans.some(p => p.id === mealPlan.id);
      if (exists) {
        return prevPlans.map(p => p.id === mealPlan.id ? mealPlan : p);
      } else {
        return [...prevPlans, mealPlan];
      }
    });
  };
  const deleteMealPlan = (id: string) => {
    setMealPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  };
  const updateMealPlan = (mealPlan: MealPlan) => {
    setMealPlans(prevPlans => 
      prevPlans.map(plan => plan.id === mealPlan.id ? mealPlan : plan)
    );
  };
  const clearRecipes = () => {
    setRecipes([]);
  };
  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipes,
        mealPlans,
        loading,
        error,
        generateRecipes,
        saveRecipe,
        deleteRecipe,
        saveMealPlan,
        deleteMealPlan,
        updateMealPlan,
        clearRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};