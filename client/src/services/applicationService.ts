import { apiRequest } from '../lib/queryClient';

export interface Application {
  _id: string;
  userId: string;
  opportunityId: {
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
  };
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export const applicationService = {
  getApplications: async () => {
    return apiRequest('GET', '/api/applications');
  },

  createApplication: async (opportunityId: string) => {
    return apiRequest('POST', `/api/applications/${opportunityId}`);
  },

  updateApplication: async (id: string, status: 'accepted' | 'rejected') => {
    return apiRequest('PUT', `/api/applications/${id}`, { status });
  }
}; 