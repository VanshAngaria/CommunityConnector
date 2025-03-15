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

export interface UpdateOpportunityData extends Partial<CreateOpportunityData> {
  status?: 'open' | 'closed';
} 