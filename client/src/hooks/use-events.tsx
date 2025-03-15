import { useQuery, useMutation } from '@tanstack/react-query';
import { eventService, Event } from '../services/eventService';
import { useToast } from './use-toast';
import { queryClient } from '../lib/queryClient';

export function useEvents() {
  const { toast } = useToast();

  const { data: events, isLoading: isLoadingEvents } = useQuery<Event[]>({
    queryKey: ['/api/events'],
    queryFn: eventService.getEvents,
  });

  const { data: registeredEvents, isLoading: isLoadingRegisteredEvents } = useQuery<Event[]>({
    queryKey: ['/api/events/registrations'],
    queryFn: eventService.getRegisteredEvents,
  });

  const registerEventMutation = useMutation({
    mutationFn: (eventId: string) => eventService.registerForEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events/registrations'] });
      toast({
        title: 'Success',
        description: 'Successfully registered for the event',
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

  const unregisterEventMutation = useMutation({
    mutationFn: (eventId: string) => eventService.unregisterFromEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events/registrations'] });
      toast({
        title: 'Success',
        description: 'Successfully unregistered from the event',
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
    events,
    registeredEvents,
    isLoadingEvents,
    isLoadingRegisteredEvents,
    registerEventMutation,
    unregisterEventMutation,
  };
} 