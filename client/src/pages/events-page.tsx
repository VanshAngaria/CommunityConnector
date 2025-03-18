import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { useEvents } from "@/hooks/use-events";
import type { Event } from "@/services/eventService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventsPage() {
  const { user } = useAuth();
  const { events, registeredEvents, registerEventMutation, isLoadingEvents } = useEvents();

  const isRegistered = (eventId: string) => {
    return registeredEvents?.some((reg: Event) => reg._id === eventId);
  };

  if (isLoadingEvents) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <div className="relative h-[400px]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/src/components/images/event.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <header className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Upcoming Events
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Find and participate in local volunteer events and make a difference in your community.
            </p>
          </div>
        </header>
      </div>

      <main className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event, index) => (
            <Card 
              key={event._id} 
              className="group overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image || (index % 3 === 0 
                    ? "/src/components/images/Communitycleanup.jpg"
                    : index % 3 === 1
                    ? "/src/components/images/food.webp"
                    : "/src/components/images/blood donation.webp")} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.registeredUsers?.length || 0} volunteers registered</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event.organizerAvatar || "/avatars/default.jpg"} />
                      <AvatarFallback>{event.organizerName?.[0] || "O"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{event.organizerName || "Event Organizer"}</span>
                  </div>
                  
                  <Button 
                    className={`${
                      isRegistered(event._id) 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    } text-white shadow-sm hover:shadow-md transition-all duration-300`}
                    onClick={() => registerEventMutation.mutate(event._id)}
                    disabled={isRegistered(event._id) || registerEventMutation.isPending}
                  >
                    {isRegistered(event._id) ? "Registered" : "Join"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}