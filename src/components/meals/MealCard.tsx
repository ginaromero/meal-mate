import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Meal } from '../../types';
import { useAppStore } from '../../store';

interface MealCardProps {
  meal: Meal;
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ 
  meal, 
  showActions = false,
  onApprove,
  onReject
}) => {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const toggleFavoriteMeal = useAppStore(state => state.toggleFavoriteMeal);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMeal(meal.id);
  };

  const handleReject = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    if (onReject) {
      onReject();
    }
    setShowFeedback(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
          alt={meal.name} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
        >
          <Heart 
            className={`h-5 w-5 ${meal.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
          <Badge variant={
            meal.budgetLevel === '$' ? 'success' : 
            meal.budgetLevel === '$$' ? 'warning' : 
            'danger'
          }>
            {meal.budgetLevel}
          </Badge>
        </div>
        <div className="flex space-x-2 mt-1">
          <Badge variant="primary">{meal.cuisineTheme}</Badge>
          <Badge variant="secondary">{meal.dailyTheme}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{meal.preparationTime} mins</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium">{meal.calories}</span> calories
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium">{meal.protein}g</span> protein
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium">{meal.carbs}g</span> carbs
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="font-medium">{meal.fat}g</span> fat
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="border-t pt-4">
          {!showFeedback ? (
            <div className="flex space-x-2 w-full">
              <Button 
                variant="primary" 
                onClick={onApprove}
                className="flex-1"
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReject}
                className="flex-1"
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Why are you rejecting this meal?"
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button 
                  variant="danger" 
                  onClick={submitFeedback}
                  disabled={!feedback.trim()}
                  className="flex-1"
                >
                  Submit Feedback
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFeedback(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default MealCard;
