import React from 'react';
import MealCard from './MealCard';
import { Meal } from '../../types';

interface MealListProps {
  meals: Meal[];
  showActions?: boolean;
  onApprove?: (mealId: string) => void;
  onReject?: (mealId: string, feedback: string) => void;
}

const MealList: React.FC<MealListProps> = ({ 
  meals, 
  showActions = false,
  onApprove,
  onReject
}) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No meals found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard 
          key={meal.id} 
          meal={meal} 
          showActions={showActions}
          onApprove={() => onApprove && onApprove(meal.id)}
          onReject={() => onReject && onReject(meal.id, '')}
        />
      ))}
    </div>
  );
};

export default MealList;
