'use client';

import AdminModule from '../placeholder';
import { Users } from 'lucide-react';

const AdminVolunteers = () => {
  const fields: any[] = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'occupation', label: 'Occupation', type: 'text' },
    { name: 'availability', label: 'Availability', type: 'select', options: ['Full Time', 'Part Time'] },
    { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] }
  ];

  return (
    <AdminModule 
      title="Volunteer Network" 
      description="Onboard, categorize, and manage trust volunteers for social activities." 
      fields={fields} 
      endpoint="/api/volunteers" 
      icon={Users} 
    />
  );
};

export default AdminVolunteers;
