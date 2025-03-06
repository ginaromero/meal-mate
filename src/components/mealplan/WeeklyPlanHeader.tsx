import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import { WeeklyPlan } from '../../types';

interface WeeklyPlanHeaderProps {
  weeklyPlan: WeeklyPlan;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGeneratePlan: () => void;
}

const WeeklyPlanHeader: React.FC<WeeklyPlanHeaderProps> = ({
  weeklyPlan,
  onPreviousWeek,
  onNextWeek,
  onGeneratePlan
}) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    if (startYear !== endYear) {
      return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
    } else if (startMonth !== endMonth) {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    } else {
      return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
    }
  };

  const dateRange = formatDateRange(weeklyPlan.startDate, weeklyPlan.endDate);
  
  const approvedMeals = weeklyPlan.mealPlans.filter(mp => mp.approved).length;
  const totalMeals = weeklyPlan.mealPlans.length;
  const progress = Math.round((approvedMeals / totalMeals) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={onPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900 mx-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
            {dateRange}
          </h2>
          <Button variant="outline" size="sm" onClick={onNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onGeneratePlan}>
          Generate New Plan
        </Button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">Weekly Progress</h3>
          <span className="text-sm text-gray-500">{approvedMeals} of {totalMeals} meals approved</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-emerald-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanHeader;
