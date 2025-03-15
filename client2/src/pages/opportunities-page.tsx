import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Globe, Send, Headphones, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Opportunity } from "@shared/schema";
import { Header } from "@/components/header";

// Helper function to get icon by opportunity type
const getOpportunityIcon = (id: number) => {
  const icons = {
    1: <Globe className="h-8 w-8" />,
    2: <Headphones className="h-8 w-8" />,
    3: <Send className="h-8 w-8" />
  };
  return icons[id as keyof typeof icons] || <Globe className="h-8 w-8" />;
};

// Helper function to get button color by opportunity type
const getButtonColor = (id: number) => {
  const colors = {
    1: "bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-500 hover:to-pink-500 border-2 border-rose-500 text-rose-500 hover:text-white shadow-[0_4px_12px_rgba(251,113,133,0.2)] hover:shadow-[0_6px_20px_rgba(251,113,133,0.4)]",
    2: "bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-500 hover:to-cyan-500 border-2 border-blue-500 text-blue-500 hover:text-white shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]",
    3: "bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-500 hover:to-yellow-500 border-2 border-yellow-500 text-yellow-500 hover:text-white shadow-[0_4px_12px_rgba(234,179,8,0.2)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.4)]"
  };
  return colors[id as keyof typeof colors] || colors[1];
};

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Sample opportunities data while API integration is pending
  const sampleOpportunities = [
    {
      id: 1,
      title: "Food Bank Distribution Assistant",
      description: "Help sort and distribute food packages to families in need at our local food bank.",
      location: "Downtown Community Center",
      requiredSkills: ["Organization", "Communication", "Physical Activity"],
      startDate: "2024-03-20",
      status: "open",
      organizationId: 1
    },
    {
      id: 2,
      title: "Senior Center Tech Support",
      description: "Provide basic technology assistance to seniors learning to use computers and smartphones.",
      location: "Golden Age Center",
      requiredSkills: ["Technology", "Patience", "Teaching"],
      startDate: "2024-03-22",
      status: "open",
      organizationId: 2
    },
    {
      id: 3,
      title: "Community Garden Coordinator",
      description: "Help maintain and organize activities in our community garden. Perfect for nature enthusiasts!",
      location: "Green Valley Garden",
      requiredSkills: ["Gardening", "Leadership", "Organization"],
      startDate: "2024-03-25",
      status: "open",
      organizationId: 3
    }
  ];

  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ["/api/opportunities"],
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Use sample data if no opportunities are fetched
  const displayOpportunities = opportunities?.length ? opportunities : sampleOpportunities;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <div className="relative w-full">
        <img 
          src="/src/components/images/volunteeroportunities.jpeg"
          alt="Volunteer Opportunities"
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <main className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayOpportunities.map((opportunity) => (
            <Card 
              key={opportunity.id} 
              className="group overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 border-0 bg-white text-center p-8"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <div className="mb-6 text-gray-600">
                  {getOpportunityIcon(opportunity.id)}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {opportunity.title}
                </h3>
                
                <p className="text-gray-500 text-sm mb-8">
                  {opportunity.description}
                </p>

                {user?.userType === "individual" ? (
                  <Button 
                    className={`w-full ${getButtonColor(opportunity.id)} font-semibold rounded-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] px-8 py-2`}
                    onClick={() => applyMutation.mutate(opportunity.id)}
                    disabled={applyMutation.isPending}
                  >
                    {applyMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : "Read More"}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-300 text-gray-400 font-semibold rounded-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
                    disabled
                  >
                    Login as Individual
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}