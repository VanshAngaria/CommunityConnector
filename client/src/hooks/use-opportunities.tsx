import { useQuery, useMutation } from '@tanstack/react-query';
import { opportunityService, Opportunity, CreateOpportunityData } from '../services/opportunityService';
import { useToast } from './use-toast';
import { queryClient } from '../lib/queryClient';

export function useOpportunities() {
  const { toast } = useToast();

  const { data: opportunities, isLoading: isLoadingOpportunities } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
    queryFn: opportunityService.getOpportunities,
  });

  const { data: myOpportunities, isLoading: isLoadingMyOpportunities } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities/my-opportunities'],
    queryFn: opportunityService.getMyOpportunities,
  });

  const createOpportunityMutation = useMutation({
    mutationFn: (data: CreateOpportunityData) => {
      console.log('Creating opportunity:', data);
      return opportunityService.createOpportunity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities/my-opportunities'] });
      toast({
        title: 'Success',
        description: 'Opportunity created successfully',
      });
    },
    onError: (error: Error) => {
      console.error('Create opportunity error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create opportunity',
        variant: 'destructive',
      });
    },
  });

  const updateOpportunityMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateOpportunityData> }) =>
      opportunityService.updateOpportunity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities/my-opportunities'] });
      toast({
        title: 'Success',
        description: 'Opportunity updated successfully',
      });
    },
    onError: (error: Error) => {
      console.error('Update opportunity error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update opportunity',
        variant: 'destructive',
      });
    },
  });

  const deleteOpportunityMutation = useMutation({
    mutationFn: (id: string) => opportunityService.deleteOpportunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities/my-opportunities'] });
      toast({
        title: 'Success',
        description: 'Opportunity deleted successfully',
      });
    },
    onError: (error: Error) => {
      console.error('Delete opportunity error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete opportunity',
        variant: 'destructive',
      });
    },
  });

  return {
    opportunities,
    myOpportunities,
    isLoadingOpportunities,
    isLoadingMyOpportunities,
    createOpportunity: createOpportunityMutation.mutate,
    updateOpportunity: updateOpportunityMutation.mutate,
    deleteOpportunity: deleteOpportunityMutation.mutate,
    isCreating: createOpportunityMutation.isPending,
    isUpdating: updateOpportunityMutation.isPending,
    isDeleting: deleteOpportunityMutation.isPending,
  };
} 