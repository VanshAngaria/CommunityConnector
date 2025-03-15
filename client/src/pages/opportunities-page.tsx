import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { useApplications } from "@/hooks/use-applications";
import { opportunityService } from "@/services/opportunityService";
import type { Opportunity } from "@/services/opportunityService";

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createApplicationMutation } = useApplications();

  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
    queryFn: opportunityService.getOpportunities,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/src/components/images/auth.jpg)' }}
        />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold mb-4">Volunteer Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Find meaningful opportunities to make a difference in your community.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {opportunities && opportunities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <Card key={opportunity._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-primary/5">
                  <CardTitle>{opportunity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Posted by {opportunity.organizationId.organizationName}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(opportunity.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Skills needed: {opportunity.requiredSkills.join(", ")}</span>
                    </div>
                  </div>
                  {user && user.userType === 'individual' ? (
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        console.log('Applying for opportunity:', opportunity._id);
                        createApplicationMutation.mutate(opportunity._id);
                      }}
                      disabled={createApplicationMutation.isPending || (opportunity.applicants && opportunity.applicants.includes(user._id))}
                    >
                      {createApplicationMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {opportunity.applicants && opportunity.applicants.includes(user._id) ? 'Already Applied' : 'Apply Now'}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Login as Individual to Apply
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Opportunities Available</h2>
            <p className="text-muted-foreground">Check back later for new opportunities.</p>
          </div>
        )}
      </main>
    </div>
  );
}