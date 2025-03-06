import { create } from 'zustand';
import { AppSettings, FamilyMember, Meal, MealPlan, WeeklyPlan } from '../types';
import { mockAppSettings, mockFamilyMembers, mockMeals, mockWeeklyPlan } from '../data/mockData';

interface AppState {
  familyMembers: FamilyMember[];
  meals: Meal[];
  weeklyPlan: WeeklyPlan;
  appSettings: AppSettings;
  selectedFamilyMemberId: string | null;
  
  // Family member actions
  addFamilyMember: (member: FamilyMember) => void;
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;
  removeFamilyMember: (id: string) => void;
  setSelectedFamilyMember: (id: string | null) => void;
  
  // Meal actions
  addMeal: (meal: Meal) => void;
  updateMeal: (id: string, meal: Partial<Meal>) => void;
  removeMeal: (id: string) => void;
  toggleFavoriteMeal: (id: string) => void;
  
  // Meal plan actions
  updateMealPlan: (id: string, mealPlan: Partial<MealPlan>) => void;
  approveMealPlan: (id: string, feedback?: string) => void;
  rejectMealPlan: (id: string, feedback: string) => void;
  
  // Settings actions
  updateAppSettings: (settings: Partial<AppSettings>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  familyMembers: mockFamilyMembers,
  meals: mockMeals,
  weeklyPlan: mockWeeklyPlan,
  appSettings: mockAppSettings,
  selectedFamilyMemberId: mockFamilyMembers[0]?.id || null,
  
  // Family member actions
  addFamilyMember: (member) => set((state) => ({
    familyMembers: [...state.familyMembers, member]
  })),
  
  updateFamilyMember: (id, member) => set((state) => ({
    familyMembers: state.familyMembers.map((m) => 
      m.id === id ? { ...m, ...member } : m
    )
  })),
  
  removeFamilyMember: (id) => set((state) => ({
    familyMembers: state.familyMembers.filter((m) => m.id !== id)
  })),
  
  setSelectedFamilyMember: (id) => set({
    selectedFamilyMemberId: id
  }),
  
  // Meal actions
  addMeal: (meal) => set((state) => ({
    meals: [...state.meals, meal]
  })),
  
  updateMeal: (id, meal) => set((state) => ({
    meals: state.meals.map((m) => 
      m.id === id ? { ...m, ...meal } : m
    )
  })),
  
  removeMeal: (id) => set((state) => ({
    meals: state.meals.filter((m) => m.id !== id)
  })),
  
  toggleFavoriteMeal: (id) => set((state) => ({
    meals: state.meals.map((m) => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    )
  })),
  
  // Meal plan actions
  updateMealPlan: (id, mealPlan) => set((state) => ({
    weeklyPlan: {
      ...state.weeklyPlan,
      mealPlans: state.weeklyPlan.mealPlans.map((mp) => 
        mp.id === id ? { ...mp, ...mealPlan } : mp
      )
    }
  })),
  
  approveMealPlan: (id, feedback) => set((state) => ({
    weeklyPlan: {
      ...state.weeklyPlan,
      mealPlans: state.weeklyPlan.mealPlans.map((mp) => 
        mp.id === id ? { ...mp, approved: true, feedback } : mp
      )
    }
  })),
  
  rejectMealPlan: (id, feedback) => set((state) => ({
    weeklyPlan: {
      ...state.weeklyPlan,
      mealPlans: state.weeklyPlan.mealPlans.map((mp) => 
        mp.id === id ? { ...mp, approved: false, feedback } : mp
      )
    }
  })),
  
  // Settings actions
  updateAppSettings: (settings) => set((state) => ({
    appSettings: { ...state.appSettings, ...settings }
  })),
}));
