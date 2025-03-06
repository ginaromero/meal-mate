import React from 'react';
import { User, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { FamilyMember } from '../../types';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (id: string) => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ 
  member, 
  onEdit, 
  onDelete 
}) => {
  const dietTypeVariant = {
    'balanced': 'default',
    'low-carb': 'primary',
    'low-calorie': 'success',
    'high-protein': 'warning'
  } as const;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <User className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <Badge variant={dietTypeVariant[member.dietType]}>
              {member.dietType.replace('-', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {member.excludedIngredients.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Excluded Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {member.excludedIngredients.map((ingredient, index) => (
                <Badge key={index} variant="danger">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          {member.skipBreakfast && (
            <p>Skips breakfast</p>
          )}
          
          {member.daysOff.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Days off:</p>
              <ul className="list-disc list-inside">
                {member.daysOff.map((day, index) => (
                  <li key={index}>{new Date(day).toLocaleDateString()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex space-x-2 w-full">
          <Button 
            variant="outline" 
            onClick={() => onEdit(member)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onDelete(member.id)}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FamilyMemberCard;
