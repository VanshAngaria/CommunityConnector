import { useQuery, useMutation } from '@tanstack/react-query';
import { applicationService, Application } from '../services/applicationService';
import { useToast } from './use-toast';
import { queryClient } from '../lib/queryClient';

export function useApplications() {
  const { toast } = useToast();

  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ['/api/applications'],
    queryFn: applicationService.getApplications,
  });

  const createApplicationMutation = useMutation({
    mutationFn: (opportunityId: string) => applicationService.createApplication(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'accepted' | 'rejected' }) => 
      applicationService.updateApplication(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
      toast({
        title: 'Success',
        description: 'Application status updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    applications,
    isLoadingApplications,
    createApplicationMutation,
    updateApplicationMutation,
  };
} 