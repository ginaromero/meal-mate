import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { FamilyMember, Meal, MealPlan } from '../../types';
import { useAppStore } from '../../store';

interface MealPlanCardProps {
  mealPlan: MealPlan;
  familyMember: FamilyMember;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, familyMember }) => {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  const approveMealPlan = useAppStore(state => state.approveMealPlan);
  const rejectMealPlan = useAppStore(state => state.rejectMealPlan);

  const handleApprove = () => {
    approveMealPlan(mealPlan.id);
  };

  const handleReject = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    rejectMealPlan(mealPlan.id, feedback);
    setShowFeedback(false);
    setFeedback('');
  };

  const renderMealSection = (title: string, meal?: Meal) => {
    if (!meal) return null;
    
    return (
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">{title}</h4>
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-start">
            {meal.image && (
              <img 
                src={meal.image} 
                alt={meal.name} 
                className="w-16 h-16 object-cover rounded-md mr-3"
              />
            )}
            <div>
              <h5 className="font-medium">{meal.name}</h5>
              <p className="text-sm text-gray-600">{meal.description}</p>
              <div className="mt-1 text-xs text-gray-500">
                {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fat}g fat
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {new Date(mealPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>
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
        <p className="text-sm text-gray-600">Meal plan for {familyMember.name}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {renderMealSection('Breakfast', mealPlan.breakfast)}
        {renderMealSection('Lunch', mealPlan.lunch)}
        {renderMealSection('Dinner', mealPlan.dinner)}
        
        {mealPlan.feedback && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <h5 className="text-sm font-medium text-gray-700">Feedback:</h5>
                <p className="text-sm text-gray-600">{mealPlan.feedback}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {!mealPlan.approved && !mealPlan.feedback && (
        <CardFooter className="border-t pt-4">
          {!showFeedback ? (
            <div className="flex space-x-2 w-full">
              <Button 
                variant="primary" 
                onClick={handleApprove}
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
                placeholder="Why are you rejecting this meal plan?"
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

export default MealPlanCard;
