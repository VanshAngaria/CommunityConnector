import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertUserSchema } from "@/lib/schema";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
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

  const onRegister = (data: any) => {
    registerMutation.mutate(data);
  };

  const onLogin = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <div 
      className="min-h-screen relative bg-black"
      style={{
        backgroundImage: "url('/src/components/images/login.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-purple-900/50 backdrop-blur-sm" />
      <Header />
      <div className="container mx-auto relative z-10 min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen items-stretch">
          {/* Left side with image and text */}
          <div className="hidden lg:flex flex-col justify-center p-12 text-white">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold mb-6">
                Bring Your Passion Along
              </h1>
              <p className="text-2xl text-white/90">
                Join our community of volunteers and make a real difference in the world
              </p>
            </div>
          </div>

          {/* Right side with form */}
          <div className="flex items-center justify-center p-8">
            <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <Tabs defaultValue="register" className="w-full">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Please sign in to your account or create a new one</p>
                  </div>

                  <TabsList className="grid grid-cols-2 w-full mb-8">
                    <TabsTrigger value="register" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      Register
                    </TabsTrigger>
                    <TabsTrigger value="login" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      Sign In
                    </TabsTrigger>
                  </TabsList>

                  <div className="space-y-6">
                    <TabsContent value="register">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                          <FormField
                            control={registerForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="e.g. John Smith"
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
                                <FormLabel className="text-gray-700">Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email"
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="your@email.com"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Username</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="Choose a username"
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
                                <FormLabel className="text-gray-700">Password</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="password"
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="Create a secure password"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center mt-6">
                            <input type="checkbox" className="h-4 w-4 text-purple-500 rounded border-gray-300" id="terms" />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                              By signing up, you agree to our{" "}
                              <a href="#" className="text-purple-500 hover:text-purple-600">
                                Terms of Service
                              </a>
                            </label>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full h-12 mt-6 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              "Register"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="login">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Username</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
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
                                <FormLabel className="text-gray-700">Password</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="password"
                                    className="h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                                    placeholder="Enter your password"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full h-12 mt-6 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                              </>
                            ) : (
                              "Sign In"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}