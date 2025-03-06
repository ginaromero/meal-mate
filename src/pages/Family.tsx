import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppStore } from '../store';
import FamilyMemberCard from '../components/family/FamilyMemberCard';
import FamilyMemberForm from '../components/family/FamilyMemberForm';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { FamilyMember } from '../types';

const Family: React.FC = () => {
  const { familyMembers, addFamilyMember, updateFamilyMember, removeFamilyMember } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  
  const handleAddMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };
  
  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setShowForm(true);
  };
  
  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this family member?')) {
      removeFamilyMember(id);
    }
  };
  
  const handleSubmit = (member: FamilyMember) => {
    if (editingMember) {
      updateFamilyMember(member.id, member);
    } else {
      addFamilyMember(member);
    }
    setShowForm(false);
    setEditingMember(null);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Family Members</h1>
        <p className="text-gray-600">Manage your family members and their preferences</p>
      </div>
      
      <div className="mb-6">
        <Button onClick={handleAddMember}>
          <Plus className="h-4 w-4 mr-1" />
          Add Family Member
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingMember ? 'Edit' : 'Add'} Family Member
            </h2>
            <FamilyMemberForm 
              member={editingMember || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}
      
      {familyMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <FamilyMemberCard 
              key={member.id} 
              member={member} 
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No family members yet</h3>
            <p className="text-gray-600 mb-4">Add your first family member to get started</p>
            <Button onClick={handleAddMember}>
              <Plus className="h-4 w-4 mr-1" />
              Add Family Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Family;
