import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { AppSettings, CuisineTheme, DailyTheme, BudgetLevel } from '../types';

const Settings: React.FC = () => {
  const { appSettings, updateAppSettings } = useAppStore();
  const [settings, setSettings] = useState<AppSettings>({ ...appSettings });
  
  const cuisineThemes: CuisineTheme[] = ['Western', 'American', 'Italian', 'Asian', 'Filipino'];
  const dailyThemes: DailyTheme[] = ['Pasta', 'Chicken', 'Pork', 'Fish', 'Curry', 'Vegetarian', 'Beef'];
  const budgetLevels: BudgetLevel[] = ['$', '$$', '$$$'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const handleCuisineChange = (cuisine: CuisineTheme) => {
    const updatedCuisines = settings.cuisinePreferences.includes(cuisine)
      ? settings.cuisinePreferences.filter(c => c !== cuisine)
      : [...settings.cuisinePreferences, cuisine];
    
    setSettings({
      ...settings,
      cuisinePreferences: updatedCuisines
    });
  };
  
  const handleDailyThemeChange = (day: string, theme: DailyTheme) => {
    setSettings({
      ...settings,
      dailyThemeSchedule: {
        ...settings.dailyThemeSchedule,
        [day]: theme
      }
    });
  };
  
  const handleBudgetChange = (budget: BudgetLevel) => {
    setSettings({
      ...settings,
      budgetPreference: budget
    });
  };
  
  const handleSaveSettings = () => {
    updateAppSettings(settings);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Customize your meal planning preferences</p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Cuisine Preferences</h2>
            <p className="text-sm text-gray-600">Select the cuisines you prefer for your meal plans</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cuisineThemes.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={settings.cuisinePreferences.includes(cuisine) ? 'primary' : 'outline'}
                  onClick={() => handleCuisineChange(cuisine)}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Daily Theme Schedule</h2>
            <p className="text-sm text-gray-600">Assign meal themes to each day of the week</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="flex items-center">
                  <span className="w-32 font-medium text-gray-700">{day}:</span>
                  <select
                    value={settings.dailyThemeSchedule[index.toString()] || ''}
                    onChange={(e) => handleDailyThemeChange(index.toString(), e.target.value as DailyTheme)}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  >
                    {dailyThemes.map((theme) => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Budget Preference</h2>
            <p className="text-sm text-gray-600">Set your preferred budget level for meals</p>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              {budgetLevels.map((budget) => (
                <Button
                  key={budget}
                  variant={settings.budgetPreference === budget ? 'primary' : 'outline'}
                  onClick={() => handleBudgetChange(budget)}
                >
                  {budget}
                </Button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              $ = Budget-friendly, $$ = Moderate, $$$ = Premium ingredients
            </p>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
