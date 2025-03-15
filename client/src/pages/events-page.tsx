import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { useEvents } from "@/hooks/use-events";
import type { Event } from "@/services/eventService";

export default function EventsPage() {
  const { user } = useAuth();
  const { events, registeredEvents, registerEventMutation, isLoadingEvents } = useEvents();

  const isRegistered = (eventId: string) => {
    return registeredEvents?.some((reg: Event) => reg._id === eventId);
  };

  if (isLoadingEvents) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground">
            Find and participate in local volunteer events and make a difference in your community.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <Card key={event._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5">
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.registeredUsers?.length || 0} registered</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <Button 
                    className={`w-full ${isRegistered(event._id) ? 'bg-green-600 hover:bg-green-700' : 'bg-primary/90 hover:bg-primary'}`}
                    onClick={() => registerEventMutation.mutate(event._id)}
                    disabled={isRegistered(event._id) || registerEventMutation.isPending}
                  >
                    {isRegistered(event._id) ? "Registered" : "Register"}
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