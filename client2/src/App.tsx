import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import Dashboard from "@/pages/dashboard";
import PostOpportunity from "@/pages/post-opportunity";
import EventsPage from "@/pages/events-page";
import DonatePage from "@/pages/donate-page";
import ForumPage from "@/pages/forum-page";
import OpportunitiesPage from "@/pages/opportunities-page";
import AssistanceFinder from "@/pages/assistance-finder";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/donate" component={DonatePage} />
      <Route path="/forum" component={ForumPage} />
      <Route path="/opportunities" component={OpportunitiesPage} />
      <Route path="/assistance-finder" component={AssistanceFinder} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/opportunities/new" component={PostOpportunity} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;