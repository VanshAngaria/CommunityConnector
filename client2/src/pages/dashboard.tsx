import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  ChartBar, 
  Target, 
  Loader2,
  ArrowRight,
  Bell,
  Star
} from "lucide-react";
import type { Opportunity, Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: opportunities, isLoading: loadingOpportunities, error: opportunitiesError } = useQuery<Opportunity[]>({
    queryKey: ["/api/opportunities"],
  });

  const { data: applications, isLoading: loadingApplications, error: applicationsError } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    enabled: user?.userType === "individual",
  });

  const { data: registeredEvents, isLoading: loadingEvents } = useQuery({
    queryKey: ["/api/events/registrations"],
    enabled: user?.userType === "individual",
  });

  const applyMutation = useMutation({
    mutationFn: async (opportunityId: number) => {
      const res = await apiRequest("POST", `/api/opportunities/${opportunityId}/apply`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Success",
        description: "Application submitted successfully",
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

  if (loadingOpportunities || loadingApplications || loadingEvents) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (opportunitiesError || applicationsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative group h-10 w-10 transition-colors hover:bg-primary/5">
                <Bell className="h-5 w-5 transition-colors group-hover:text-primary" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full group-hover:animate-pulse" />
              </Button>
              {user?.userType === "ngo" && (
                <Link href="/opportunities/new">
                  <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 group">
                    <span className="flex items-center gap-2">
                      Post New Opportunity
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-none">
              <CardContent className="p-6 h-[160px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-500">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    This Month
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Impact Score</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold group-hover:text-primary transition-colors">85</span>
                    <span className="text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12.3%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-none">
              <CardContent className="p-6 h-[160px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    Total
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Volunteer Hours</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold group-hover:text-blue-500 transition-colors">24</span>
                    <span className="text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.1%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border-none">
              <CardContent className="p-6 h-[160px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-rose-500/10 group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-6 w-6 text-rose-500" />
                  </div>
                  <span className="text-xs font-medium bg-rose-500/10 text-rose-500 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Goals Completed</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold group-hover:text-rose-500 transition-colors">3</span>
                    <span className="text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2 this month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {user?.userType === "individual" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Your Applications
                  </h2>
                  <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors group">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  {applications && applications.length > 0 ? (
                    applications.map((application) => {
                      const opportunity = opportunities?.find(
                        (o) => o.id === application.opportunityId
                      );
                      return (
                        <Card key={application.id} className="group hover:shadow-lg transition-all duration-300">
                          <CardHeader className={`
                            ${application.status === 'accepted' ? 'bg-green-500/10' :
                              application.status === 'rejected' ? 'bg-red-500/10' :
                              'bg-primary/5'} border-b border-border/5
                          `}>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{opportunity?.title || "Opportunity"}</CardTitle>
                              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                application.status === 'accepted' ? 'bg-green-500/20 text-green-700' :
                                application.status === 'rejected' ? 'bg-red-500/20 text-red-700' :
                                'bg-primary/20 text-primary'
                              }`}>
                                {application.status}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Star className="h-4 w-4" />
                                <span>Priority: High</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">No Applications Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Start your volunteering journey by applying to opportunities.
                        </p>
                        <Link href="/opportunities">
                          <Button variant="outline">Browse Opportunities</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </h2>
                  <Link href="/events">
                    <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors group">
                      View Calendar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-4">
                  {registeredEvents && registeredEvents.length > 0 ? (
                    registeredEvents.map((event: any) => (
                      <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                        <CardHeader className="bg-primary/5 border-b border-border/5">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">No Upcoming Events</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Register for events to see them appear here.
                        </p>
                        <Link href="/events">
                          <Button variant="outline">Browse Events</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}

          {user?.userType === "ngo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Opportunities
                </h2>
                <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/auth-back.jpg)' }}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {opportunities?.filter(o => o.organizationId === user.id).map((opportunity) => (
                    <Card 
                      key={opportunity.id} 
                      className="group hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
                    >
                      <CardHeader className="border-b border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-lg text-white group-hover:text-primary transition-colors">
                            {opportunity.title}
                          </CardTitle>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            opportunity.status === 'open' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {opportunity.status}
                          </span>
                        </div>
                        <p className="text-sm text-white/70 line-clamp-2">
                          {opportunity.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-center gap-2 text-white/70">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="truncate">{opportunity.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{new Date(opportunity.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <Users className="h-4 w-4 text-primary" />
                            <span>12 applications</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 border-white/20 text-white hover:bg-white/20 hover:text-primary"
                        >
                          Manage Opportunity
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}