import { apiRequest } from '../lib/queryClient';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  registeredUsers: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
  image?: string;
  organizerAvatar?: string;
  organizerName?: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export const eventService = {
  getEvents: async () => {
    return apiRequest('GET', '/api/events');
  },

  getRegisteredEvents: async () => {
    return apiRequest('GET', '/api/events/registrations');
  },

  createEvent: async (data: CreateEventData) => {
    return apiRequest('POST', '/api/events', data);
  },

  registerForEvent: async (eventId: string) => {
    return apiRequest('POST', `/api/users/events/${eventId}/register`);
  },

  unregisterFromEvent: async (eventId: string) => {
    return apiRequest('DELETE', `/api/users/events/${eventId}/register`);
  }
}; 