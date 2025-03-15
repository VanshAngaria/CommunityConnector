import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { CreateOpportunityData } from "@/types/opportunity";
import { insertOpportunitySchema } from "@/lib/schema";
import { z } from "zod";

const createOpportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  requiredSkills: z.array(z.string()).min(1, "At least one skill is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
});

export default function PostOpportunity() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CreateOpportunityData>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      requiredSkills: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateOpportunityData) => {
      const res = await apiRequest('POST', '/opportunities', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/opportunities'] });
      toast({
        title: "Success",
        description: "Opportunity posted successfully",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user || user.userType !== "ngo") {
    setLocation("/dashboard");
    return null;
  }

  const onSubmit = (data: CreateOpportunityData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Post New Opportunity</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter opportunity title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe the opportunity and requirements" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requiredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value.join(', ')}
                          onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          placeholder="Enter skills separated by commas"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          value={field.value || ''} 
                          min={form.watch('startDate')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Post Opportunity
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
