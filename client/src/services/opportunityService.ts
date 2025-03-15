import { apiRequest } from '../lib/queryClient';

export interface Opportunity {
  _id: string;
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
  organizationId: {
    _id: string;
    name: string;
    organizationName: string;
  };
  startDate: string;
  endDate?: string;
  status: 'open' | 'closed';
  applicants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOpportunityData {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
  startDate: string;
  endDate?: string;
}

export const opportunityService = {
  getOpportunities: async () => {
    return apiRequest('GET', '/api/opportunities');
  },

  getMyOpportunities: async () => {
    return apiRequest('GET', '/api/opportunities/my-opportunities');
  },

  createOpportunity: async (data: CreateOpportunityData) => {
    return apiRequest('POST', '/api/opportunities', data);
  },

  updateOpportunity: async (id: string, data: Partial<CreateOpportunityData>) => {
    return apiRequest('PUT', `/api/opportunities/${id}`, data);
  },

  deleteOpportunity: async (id: string) => {
    return apiRequest('DELETE', `/api/opportunities/${id}`);
  }
}; 