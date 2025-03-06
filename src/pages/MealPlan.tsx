import React, { useState } from 'react';
import { useAppStore } from '../store';
import MealPlanCard from '../components/mealplan/MealPlanCard';
import WeeklyPlanHeader from '../components/mealplan/WeeklyPlanHeader';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const MealPlan: React.FC = () => {
  const { weeklyPlan, familyMembers } = useAppStore();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  const handlePreviousWeek = () => {
    // In a real app, this would load the previous week's plan
    console.log('Load previous week');
  };
  
  const handleNextWeek = () => {
    // In a real app, this would load the next week's plan
    console.log('Load next week');
  };
  
  const handleGeneratePlan = () => {
    // In a real app, this would generate a new meal plan
    console.log('Generate new plan');
  };
  
  const getDaysInWeek = () => {
    const days = [];
    const startDate = new Date(weeklyPlan.startDate);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    
    return days;
  };
  
  const daysInWeek = getDaysInWeek();
  
  const getMealPlansByDay = (day: string) => {
    return weeklyPlan.mealPlans.filter(mp => mp.date === day);
  };
  
  const getFamilyMemberById = (id: string) => {
    return familyMembers.find(fm => fm.id === id);
  };
  
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meal Plan</h1>
        <p className="text-gray-600">Plan and organize your family's meals</p>
      </div>
      
      <WeeklyPlanHeader 
        weeklyPlan={weeklyPlan}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onGeneratePlan={handleGeneratePlan}
      />
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {daysInWeek.map((day) => {
          const dayName = getDayName(day);
          const isSelected = selectedDay === day;
          const mealPlans = getMealPlansByDay(day);
          const approvedCount = mealPlans.filter(mp => mp.approved).length;
          const totalCount = mealPlans.length;
          
          return (
            <Button
              key={day}
              variant={isSelected ? 'primary' : 'outline'}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className="flex flex-col items-center py-3"
              fullWidth
            >
              <span className="text-xs">{dayName.substring(0, 3)}</span>
              <span className="text-lg font-bold">{new Date(day).getDate()}</span>
              <span className="text-xs mt-1">{approvedCount}/{totalCount}</span>
            </Button>
          );
        })}
      </div>
      
      {selectedDay ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getMealPlansByDay(selectedDay).map((mealPlan) => {
            const familyMember = getFamilyMemberById(mealPlan.familyMemberId);
            if (!familyMember) return null;
            
            return (
              <MealPlanCard 
                key={mealPlan.id} 
                mealPlan={mealPlan} 
                familyMember={familyMember} 
              />
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a day to view meal plans</h3>
            <p className="text-gray-600">Click on any day above to see the meal plans for that day</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MealPlan;
