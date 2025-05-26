export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  tips?: string[];
  createdAt: number;
}
export interface MealPlan {
  id: string;
  name: string;
  days: {
    [key: string]: {
      breakfast?: string;
      lunch?: string;
      dinner?: string;
    };
  };
  createdAt: number;
}
export interface RecipeContextType {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  mealPlans: MealPlan[];
  loading: boolean;
  error: string | null;
  generateRecipes: (ingredients: string[]) => Promise<void>;
  saveRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  saveMealPlan: (mealPlan: MealPlan) => void;
  deleteMealPlan: (id: string) => void;
  updateMealPlan: (mealPlan: MealPlan) => void;
  clearRecipes: () => void;
}