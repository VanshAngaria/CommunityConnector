import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Registration {
  eventId: number;
}

export default function EventsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: registrations = [] } = useQuery<Registration[]>({
    queryKey: ["/api/events/registrations"],
    enabled: !!user,
  });

  const registerMutation = useMutation({
    mutationFn: async (eventId: number) => {
      const res = await apiRequest("POST", `/api/events/${eventId}/register`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events/registrations"] });
      toast({
        title: "Success",
        description: "Successfully registered for the event",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const events = [
    {
      id: 1,
      title: "Community Clean-up Drive",
      date: "March 20, 2024",
      time: "9:00 AM - 1:00 PM",
      location: "Central Park",
      attendees: 45,
      description: "Join us for a community-wide initiative to clean and beautify our local parks.",
      category: "Environment",
      organizer: {
        name: "Sarah Wilson",
        avatar: "/avatars/sarah.jpg"
      },
      image: "/src/components/images/Communitycleanup.jpg"
    },
    {
      id: 2,
      title: "Food Bank Distribution",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      attendees: 30,
      description: "Help distribute food packages to families in need.",
      category: "Food",
      organizer: {
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      },
      image: "/src/components/images/foodbankimage.jpg"
    },
    {
      id: 3,
      title: "Senior Center Visit",
      date: "March 28, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Golden Age Center",
      attendees: 20,
      description: "Spend time with seniors through various activities and conversations.",
      category: "Community",
      organizer: {
        name: "Emily Brown",
        avatar: "/avatars/emily.jpg"
      },
      image: "/src/components/images/senior.jpg"
    },
  ];

  const isRegistered = (eventId: number) => {
    return registrations.some((reg) => reg.eventId === eventId);
  };

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
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
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
                    <span>{event.attendees} volunteers needed</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{event.organizer.name}</span>
                  </div>
                  
                  <Button 
                    className={`${
                      isRegistered(event.id) 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    } text-white shadow-sm hover:shadow-md transition-all duration-300`}
                    onClick={() => registerMutation.mutate(event.id)}
                    disabled={isRegistered(event.id) || registerMutation.isPending}
                  >
                    {isRegistered(event.id) ? "Registered" : "Join"}
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