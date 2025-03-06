import { AppSettings, CuisineTheme, DailyTheme, DietType, FamilyMember, Meal, MealPlan, WeeklyPlan } from '../types';

// Mock family members
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'John',
    dietType: 'balanced',
    excludedIngredients: ['mushrooms', 'olives'],
    skipBreakfast: false,
    daysOff: [],
  },
  {
    id: '2',
    name: 'Sarah',
    dietType: 'low-carb',
    excludedIngredients: ['peas', 'bell peppers'],
    skipBreakfast: true,
    daysOff: [],
  },
  {
    id: '3',
    name: 'Emma',
    dietType: 'high-protein',
    excludedIngredients: ['onions'],
    skipBreakfast: false,
    daysOff: [],
  },
  {
    id: '4',
    name: 'Mike',
    dietType: 'low-calorie',
    excludedIngredients: ['cilantro'],
    skipBreakfast: false,
    daysOff: [],
  },
];

// Mock meals
export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich meat sauce',
    ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onions', 'garlic', 'herbs'],
    cuisineTheme: 'Italian',
    dailyTheme: 'Pasta',
    budgetLevel: '$',
    calories: 650,
    protein: 25,
    carbs: 80,
    fat: 20,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960',
    preparationTime: 30,
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    description: 'Fresh salad with grilled chicken breast',
    ingredients: ['chicken breast', 'lettuce', 'tomatoes', 'cucumber', 'olive oil', 'lemon juice'],
    cuisineTheme: 'Western',
    dailyTheme: 'Chicken',
    budgetLevel: '$$',
    calories: 350,
    protein: 35,
    carbs: 10,
    fat: 15,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    preparationTime: 20,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Pork Adobo',
    description: 'Filipino classic dish with soy sauce and vinegar',
    ingredients: ['pork belly', 'soy sauce', 'vinegar', 'garlic', 'bay leaves', 'black pepper'],
    cuisineTheme: 'Filipino',
    dailyTheme: 'Pork',
    budgetLevel: '$',
    calories: 550,
    protein: 30,
    carbs: 5,
    fat: 40,
    image: 'https://images.unsplash.com/photo-1627308595171-d1b5d95d741d',
    preparationTime: 45,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Healthy grilled salmon with lemon and herbs',
    ingredients: ['salmon fillet', 'lemon', 'dill', 'olive oil', 'salt', 'pepper'],
    cuisineTheme: 'Western',
    dailyTheme: 'Fish',
    budgetLevel: '$$$',
    calories: 400,
    protein: 40,
    carbs: 0,
    fat: 25,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    preparationTime: 25,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Thai Green Curry',
    description: 'Spicy and aromatic Thai curry with coconut milk',
    ingredients: ['chicken', 'coconut milk', 'green curry paste', 'bamboo shoots', 'basil', 'rice'],
    cuisineTheme: 'Asian',
    dailyTheme: 'Curry',
    budgetLevel: '$$',
    calories: 550,
    protein: 25,
    carbs: 45,
    fat: 30,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    preparationTime: 35,
    isFavorite: true,
  },
  {
    id: '6',
    name: 'Beef Tacos',
    description: 'Tasty beef tacos with fresh toppings',
    ingredients: ['ground beef', 'taco shells', 'lettuce', 'tomatoes', 'cheese', 'sour cream'],
    cuisineTheme: 'American',
    dailyTheme: 'Beef',
    budgetLevel: '$$',
    calories: 500,
    protein: 30,
    carbs: 35,
    fat: 25,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    preparationTime: 25,
    isFavorite: false,
  },
  {
    id: '7',
    name: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable stir fry',
    ingredients: ['broccoli', 'carrots', 'bell peppers', 'snap peas', 'soy sauce', 'ginger'],
    cuisineTheme: 'Asian',
    dailyTheme: 'Vegetarian',
    budgetLevel: '$',
    calories: 300,
    protein: 10,
    carbs: 40,
    fat: 10,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    preparationTime: 20,
    isFavorite: false,
  },
  {
    id: '8',
    name: 'Chicken Alfredo',
    description: 'Creamy pasta with grilled chicken',
    ingredients: ['fettuccine', 'chicken breast', 'heavy cream', 'parmesan cheese', 'garlic', 'butter'],
    cuisineTheme: 'Italian',
    dailyTheme: 'Pasta',
    budgetLevel: '$$',
    calories: 700,
    protein: 35,
    carbs: 60,
    fat: 35,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb',
    preparationTime: 30,
    isFavorite: true,
  },
];

// Mock meal plans
export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    date: '2023-06-05',
    familyMemberId: '1',
    breakfast: mockMeals[1],
    lunch: mockMeals[6],
    dinner: mockMeals[0],
    approved: true,
    feedback: 'Loved the pasta!',
  },
  {
    id: '2',
    date: '2023-06-05',
    familyMemberId: '2',
    lunch: mockMeals[1],
    dinner: mockMeals[3],
    approved: false,
    feedback: 'Would prefer chicken instead of fish',
  },
  {
    id: '3',
    date: '2023-06-06',
    familyMemberId: '1',
    breakfast: mockMeals[1],
    lunch: mockMeals[3],
    dinner: mockMeals[2],
    approved: true,
  },
  {
    id: '4',
    date: '2023-06-06',
    familyMemberId: '2',
    lunch: mockMeals[6],
    dinner: mockMeals[4],
    approved: true,
  },
];

// Mock weekly plan
export const mockWeeklyPlan: WeeklyPlan = {
  id: '1',
  startDate: '2023-06-05',
  endDate: '2023-06-11',
  mealPlans: mockMealPlans,
  completed: false,
};

// Mock app settings
export const mockAppSettings: AppSettings = {
  cuisinePreferences: ['Italian', 'Western', 'Asian', 'American', 'Filipino'],
  dailyThemeSchedule: {
    '0': 'Pasta',
    '1': 'Chicken',
    '2': 'Pork',
    '3': 'Fish',
    '4': 'Curry',
    '5': 'Beef',
    '6': 'Vegetarian',
  },
  budgetPreference: '$$',
};

// Helper function to get meals by diet type
export const getMealsByDietType = (dietType: DietType): Meal[] => {
  switch (dietType) {
    case 'low-carb':
      return mockMeals.filter(meal => meal.carbs < 30);
    case 'low-calorie':
      return mockMeals.filter(meal => meal.calories < 500);
    case 'high-protein':
      return mockMeals.filter(meal => meal.protein > 30);
    case 'balanced':
    default:
      return mockMeals;
  }
};

// Helper function to get meals by cuisine theme
export const getMealsByCuisineTheme = (cuisineTheme: CuisineTheme): Meal[] => {
  return mockMeals.filter(meal => meal.cuisineTheme === cuisineTheme);
};

// Helper function to get meals by daily theme
export const getMealsByDailyTheme = (dailyTheme: DailyTheme): Meal[] => {
  return mockMeals.filter(meal => meal.dailyTheme === dailyTheme);
};

// Helper function to get meals by budget level
export const getMealsByBudgetLevel = (budgetLevel: string): Meal[] => {
  return mockMeals.filter(meal => meal.budgetLevel === budgetLevel);
};

// Helper function to get favorite meals
export const getFavoriteMeals = (): Meal[] => {
  return mockMeals.filter(meal => meal.isFavorite);
};
