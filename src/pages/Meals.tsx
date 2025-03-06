import React, { useState } from 'react';
import { useAppStore } from '../store';
import MealList from '../components/meals/MealList';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CuisineTheme, DailyTheme, BudgetLevel } from '../types';

const Meals: React.FC = () => {
  const { meals } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [cuisineFilter, setCuisineFilter] = useState<CuisineTheme | 'all'>('all');
  const [themeFilter, setThemeFilter] = useState<DailyTheme | 'all'>('all');
  const [budgetFilter, setBudgetFilter] = useState<BudgetLevel | 'all'>('all');
  
  const filteredMeals = meals.filter(meal => {
    if (activeTab === 'favorites' && !meal.isFavorite) return false;
    if (cuisineFilter !== 'all' && meal.cuisineTheme !== cuisineFilter) return false;
    if (themeFilter !== 'all' && meal.dailyTheme !== themeFilter) return false;
    if (budgetFilter !== 'all' && meal.budgetLevel !== budgetFilter) return false;
    return true;
  });
  
  const cuisineThemes: CuisineTheme[] = ['Western', 'American', 'Italian', 'Asian', 'Filipino'];
  const dailyThemes: DailyTheme[] = ['Pasta', 'Chicken', 'Pork', 'Fish', 'Curry', 'Vegetarian', 'Beef'];
  const budgetLevels: BudgetLevel[] = ['$', '$$', '$$$'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meals</h1>
        <p className="text-gray-600">Browse and manage your meal options</p>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <Button 
            variant={activeTab === 'all' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            All Meals
          </Button>
          <Button 
            variant={activeTab === 'favorites' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine
                </label>
                <select
                  value={cuisineFilter}
                  onChange={(e) => setCuisineFilter(e.target.value as CuisineTheme | 'all')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                >
                  <option value="all">All Cuisines</option>
                  {cuisineThemes.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Theme
                </label>
                <select
                  value={themeFilter}
                  onChange={(e) => setThemeFilter(e.target.value as DailyTheme | 'all')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                >
                  <option value="all">All Themes</option>
                  {dailyThemes.map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget
                </label>
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value as BudgetLevel | 'all')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                >
                  <option value="all">All Budgets</option>
                  {budgetLevels.map((budget) => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {filteredMeals.length > 0 ? (
        <MealList meals={filteredMeals} />
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Meals;
