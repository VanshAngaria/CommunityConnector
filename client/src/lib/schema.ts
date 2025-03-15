import { z } from 'zod';

export const insertUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  userType: z.enum(['individual', 'ngo']),
  bio: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  organizationName: z.string().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  serviceTypes: z.array(z.string()).optional(),
  operatingHours: z.string().optional(),
  website: z.string().url().optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const insertOpportunitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  requiredSkills: z.array(z.string()).min(1, 'At least one skill is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
}); 