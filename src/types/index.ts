export type DietType = 'balanced' | 'low-carb' | 'low-calorie' | 'high-protein';

export type CuisineTheme = 'Western' | 'American' | 'Italian' | 'Asian' | 'Filipino';

export type DailyTheme = 'Pasta' | 'Chicken' | 'Pork' | 'Fish' | 'Curry' | 'Vegetarian' | 'Beef';

export type BudgetLevel = '$' | '$$' | '$$$';

export interface FamilyMember {
  id: string;
  name: string;
  dietType: DietType;
  excludedIngredients: string[];
  skipBreakfast: boolean;
  daysOff: string[]; // ISO date strings
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  cuisineTheme: CuisineTheme;
  dailyTheme: DailyTheme;
  budgetLevel: BudgetLevel;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
  preparationTime: number; // in minutes
  isFavorite: boolean;
}

export interface MealPlan {
  id: string;
  date: string; // ISO date string
  familyMemberId: string;
  breakfast?: Meal;
  lunch?: Meal;
  dinner: Meal;
  approved: boolean;
  feedback?: string;
}

export interface WeeklyPlan {
  id: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  mealPlans: MealPlan[];
  completed: boolean;
}

export interface DailyThemeSchedule {
  [key: string]: DailyTheme; // day of week (0-6) to theme
}

export interface AppSettings {
  cuisinePreferences: CuisineTheme[];
  dailyThemeSchedule: DailyThemeSchedule;
  budgetPreference: BudgetLevel;
}
