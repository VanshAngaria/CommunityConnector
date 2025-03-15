export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  userType: 'individual' | 'ngo';
  bio?: string;
  location?: string;
  skills?: string[];
  organizationName?: string;
  contactPhone?: string;
  address?: string;
  serviceTypes?: string[];
  operatingHours?: string;
  website?: string;
  events: string[];
  opportunities: string[];
  createdAt: string;
  updatedAt: string;
} 