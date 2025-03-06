import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import { DietType, FamilyMember } from '../../types';

interface FamilyMemberFormProps {
  member?: FamilyMember;
  onSubmit: (member: FamilyMember) => void;
  onCancel: () => void;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  member,
  onSubmit,
  onCancel
}) => {
  const [name, setName] = useState(member?.name || '');
  const [dietType, setDietType] = useState<DietType>(member?.dietType || 'balanced');
  const [excludedIngredient, setExcludedIngredient] = useState('');
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>(member?.excludedIngredients || []);
  const [skipBreakfast, setSkipBreakfast] = useState(member?.skipBreakfast || false);
  const [daysOff, setDaysOff] = useState<string[]>(member?.daysOff || []);
  const [dayOff, setDayOff] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: FamilyMember = {
      id: member?.id || Date.now().toString(),
      name,
      dietType,
      excludedIngredients,
      skipBreakfast,
      daysOff
    };
    
    onSubmit(newMember);
  };

  const addExcludedIngredient = () => {
    if (excludedIngredient.trim() && !excludedIngredients.includes(excludedIngredient.trim())) {
      setExcludedIngredients([...excludedIngredients, excludedIngredient.trim()]);
      setExcludedIngredient('');
    }
  };

  const removeExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients(excludedIngredients.filter(i => i !== ingredient));
  };

  const addDayOff = () => {
    if (dayOff && !daysOff.includes(dayOff)) {
      setDaysOff([...daysOff, dayOff]);
      setDayOff('');
    }
  };

  const removeDayOff = (day: string) => {
    setDaysOff(daysOff.filter(d => d !== day));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="dietType" className="block text-sm font-medium text-gray-700">
          Diet Type
        </label>
        <select
          id="dietType"
          value={dietType}
          onChange={(e) => setDietType(e.target.value as DietType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        >
          <option value="balanced">Balanced</option>
          <option value="low-carb">Low Carb</option>
          <option value="low-calorie">Low Calorie</option>
          <option value="high-protein">High Protein</option>
        </select>
      </div>

      <div>
        <label htmlFor="excludedIngredient" className="block text-sm font-medium text-gray-700">
          Excluded Ingredients
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="excludedIngredient"
            value={excludedIngredient}
            onChange={(e) => setExcludedIngredient(e.target.value)}
            className="block w-full rounded-l-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            placeholder="e.g., mushrooms"
          />
          <button
            type="button"
            onClick={addExcludedIngredient}
            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
          >
            Add
          </button>
        </div>
        {excludedIngredients.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {excludedIngredients.map((ingredient, index) => (
              <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                {ingredient}
                <button
                  type="button"
                  onClick={() => removeExcludedIngredient(ingredient)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="skipBreakfast"
          type="checkbox"
          checked={skipBreakfast}
          onChange={(e) => setSkipBreakfast(e.target.checked)}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="skipBreakfast" className="ml-2 block text-sm text-gray-700">
          Skip breakfast
        </label>
      </div>

      <div>
        <label htmlFor="dayOff" className="block text-sm font-medium text-gray-700">
          Days Off
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="date"
            id="dayOff"
            value={dayOff}
            onChange={(e) => setDayOff(e.target.value)}
            className="block w-full rounded-l-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addDayOff}
            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
          >
            Add
          </button>
        </div>
        {daysOff.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {daysOff.map((day, index) => (
              <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                {new Date(day).toLocaleDateString()}
                <button
                  type="button"
                  onClick={() => removeDayOff(day)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name}>
          {member ? 'Update' : 'Add'} Family Member
        </Button>
      </div>
    </form>
  );
};

export default FamilyMemberForm;
