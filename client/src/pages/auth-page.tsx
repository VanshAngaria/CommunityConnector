import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertUserSchema } from "@/lib/schema";
import { Redirect } from "wouter";
import { Loader2, Heart, Users, Calendar, Trophy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/header";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
      userType: "individual",
      name: "",
      email: "",
      bio: "",
      location: "",
      skills: [],
      organizationName: "",
      contactPhone: "",
      address: "",
      serviceTypes: [],
      operatingHours: "",
      website: "",
    },
  });

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const onLogin = (data: { username: string; password: string }) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: any) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#e3f2fd,#ffffff)]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Join our Community of Change-Makers
                </h1>
                <p className="text-lg text-muted-foreground">
                  Connect with NGOs and volunteers making a real difference in communities worldwide.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="group p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Make an Impact</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Join initiatives that create positive change in communities
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="group p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Connect</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Network with passionate volunteers and organizations
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="group p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Flexible Schedule</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Find opportunities that fit your availability
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="group p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Track Progress</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Monitor your volunteering journey and impact
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-primary/10">
              <CardHeader
  className="space-y-1 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/src/components/images/auth.jpg')" }}
>
  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent text-center">
    Welcome Back
  </CardTitle>
  <p className="text-sm text-muted-foreground text-center">
    Enter your credentials to access your account
  </p>
</CardHeader>

                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        Login
                      </TabsTrigger>
                      <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        Register
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-0">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90">Username</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-white/50 border-primary/20 focus-visible:ring-primary" 
                                    placeholder="Enter your username"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90">Password</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    {...field} 
                                    className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                    placeholder="Enter your password"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                              </>
                            ) : (
                              "Sign In"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-0">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                          <FormField
                            control={registerForm.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90">I am a</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/50 border-primary/20 focus-visible:ring-primary">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="individual">Individual Volunteer</SelectItem>
                                    <SelectItem value="ngo">NGO/Organization</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid gap-4">
                            <FormField
                              control={registerForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/90">Username</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                      placeholder="Choose a username"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={registerForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/90">Email</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email" 
                                      {...field} 
                                      className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                      placeholder="Enter your email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/90">Password</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="password" 
                                      {...field} 
                                      className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                      placeholder="Create a password"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {registerForm.watch("userType") === "ngo" ? (
                            <div className="space-y-4 border-t pt-4 border-primary/10">
                              <h4 className="font-medium text-foreground/90">Organization Details</h4>
                              <div className="grid gap-4">
                                <FormField
                                  control={registerForm.control}
                                  name="organizationName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-foreground/90">Organization Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                          placeholder="Enter organization name"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={registerForm.control}
                                    name="contactPhone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-foreground/90">Contact Phone</FormLabel>
                                        <FormControl>
                                          <Input 
                                            {...field} 
                                            className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                            placeholder="Phone number"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={registerForm.control}
                                    name="website"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-foreground/90">Website</FormLabel>
                                        <FormControl>
                                          <Input 
                                            {...field} 
                                            className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                            placeholder="Organization website"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <FormField
                                  control={registerForm.control}
                                  name="address"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-foreground/90">Address</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                          placeholder="Organization address"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={registerForm.control}
                                  name="operatingHours"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-foreground/90">Operating Hours</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                          placeholder="e.g. Mon-Fri: 9AM-5PM"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4 border-t pt-4 border-primary/10">
                              <h4 className="font-medium text-foreground/90">Personal Details</h4>
                              <div className="grid gap-4">
                                <FormField
                                  control={registerForm.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-foreground/90">Full Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                          placeholder="Enter your full name"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={registerForm.control}
                                  name="location"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-foreground/90">Location</FormLabel>
                                      <FormControl>
                                        <Input 
                                          {...field} 
                                          className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                          placeholder="Your location"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}

                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-white font-medium mt-6"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              "Create Account"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}