import React from 'react';
import { Calendar, Users, Utensils, ShoppingBag } from 'lucide-react';
import { useAppStore } from '../store';
import StatCard from '../components/dashboard/StatCard';
import FoodFactCard from '../components/dashboard/FoodFactCard';
import MealCard from '../components/meals/MealCard';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const foodFacts = [
  "Eating a rainbow of colorful fruits and vegetables ensures you get a wide variety of nutrients.",
  "Meal planning can reduce food waste by up to 40% in the average household.",
  "Cooking at home is not only healthier but can save you up to 60% compared to eating out.",
  "Proteins take longer to digest, helping you feel fuller for longer periods.",
  "Eating slowly can help you consume fewer calories and improve digestion.",
  "Frozen fruits and vegetables often contain more nutrients than 'fresh' ones that have been transported long distances.",
  "Spicy foods can temporarily boost your metabolism by up to 8%.",
  "Dark chocolate contains antioxidants that can improve heart health when consumed in moderation."
];

const Dashboard: React.FC = () => {
  const { familyMembers, meals, weeklyPlan } = useAppStore();
  
  const approvedMeals = weeklyPlan.mealPlans.filter(mp => mp.approved).length;
  const totalMeals = weeklyPlan.mealPlans.length;
  const completionPercentage = Math.round((approvedMeals / totalMeals) * 100);
  
  const favoriteMeals = meals.filter(meal => meal.isFavorite);
  const randomFoodFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your meal planning dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Family Members" 
          value={familyMembers.length}
          icon={<Users className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard 
          title="Meal Options" 
          value={meals.length}
          icon={<Utensils className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard 
          title="Weekly Plan Completion" 
          value={`${completionPercentage}%`}
          icon={<Calendar className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard 
          title="Shopping List Items" 
          value="24"
          icon={<ShoppingBag className="h-6 w-6 text-emerald-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Meal Plan</h2>
                <Link to="/meal-plan">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyPlan.mealPlans.slice(0, 3).map((mealPlan) => {
                  const familyMember = familyMembers.find(fm => fm.id === mealPlan.familyMemberId);
                  if (!familyMember) return null;
                  
                  return (
                    <div key={mealPlan.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {new Date(mealPlan.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </h3>
                          <p className="text-sm text-gray-600">For {familyMember.name}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mealPlan.approved 
                            ? 'bg-green-100 text-green-800' 
                            : mealPlan.feedback 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {mealPlan.approved 
                            ? 'Approved' 
                            : mealPlan.feedback 
                              ? 'Rejected' 
                              : 'Pending'}
                        </div>
                      </div>
                      <div className="text-sm">
                        {mealPlan.dinner && (
                          <div className="flex items-center">
                            <span className="font-medium mr-2">Dinner:</span>
                            <span>{mealPlan.dinner.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <FoodFactCard fact={randomFoodFact} />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Favorite Meals</h2>
          <Link to="/meals">
            <Button variant="outline" size="sm">View All Meals</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMeals.slice(0, 3).map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
