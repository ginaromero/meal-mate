import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Lightbulb } from 'lucide-react';

interface FoodFactCardProps {
  fact: string;
}

const FoodFactCard: React.FC<FoodFactCardProps> = ({ fact }) => {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Did you know?</h3>
            <p className="text-gray-700">{fact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodFactCard;
