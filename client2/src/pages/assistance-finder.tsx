import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Clock, Heart, Cross, Home, Droplet, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AssistanceFinder() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("all");

  // Sample data - in a real app, this would come from an API
  const organizations = [
    {
      id: 1,
      name: "City Food Bank",
      category: "food",
      address: "123 Main St, City Center",
      phone: "555-0123",
      hours: "Mon-Sat: 9AM-5PM",
      services: ["Food distribution", "Meal service", "Emergency food boxes"],
      distance: "0.8 miles",
      status: "Open now",
    },
    {
      id: 2,
      name: "Community Blood Center",
      category: "blood",
      address: "456 Health Ave",
      phone: "555-0124",
      hours: "Mon-Sun: 8AM-8PM",
      services: ["Blood donation", "Plasma donation", "Health screening"],
      distance: "1.2 miles",
      status: "Open now",
    },
    {
      id: 3,
      name: "Hope Shelter",
      category: "shelter",
      address: "789 Hope Street",
      phone: "555-0125",
      hours: "24/7",
      services: ["Emergency shelter", "Transitional housing", "Support services"],
      distance: "2.5 miles",
      status: "Open 24/7",
    },
  ];

  const filteredOrganizations = organizations.filter(org => 
    (category === "all" || org.category === category) &&
    (!location || org.address.toLowerCase().includes(location.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Heart className="h-5 w-5" />;
      case "blood":
        return <Droplet className="h-5 w-5 text-red-500" />;
      case "shelter":
        return <Home className="h-5 w-5 text-blue-500" />;
      default:
        return <Cross className="h-5 w-5 text-primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-rose-500";
      case "blood":
        return "bg-red-500";
      case "shelter":
        return "bg-blue-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <header className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-background py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Community Support Network
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-foreground via-foreground/80 to-foreground/40 bg-clip-text text-transparent pb-2">
              Find Assistance Near You
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Locate nearby NGOs, food banks, blood donation centers, and shelters providing essential services to your community.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Food Banks</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-red-500" />
                <span>Blood Centers</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-primary/20" />
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-500" />
                <span>Shelters</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto -mt-12 mb-12 relative z-10">
          <Card className="shadow-xl border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground/90">Location</label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      className="pl-10 h-12 text-lg bg-background/50 border-primary/20 focus-visible:ring-primary hover:bg-background/70 transition-all"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground/90">Category</label>
                  <Select defaultValue={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 text-lg bg-background/50 border-primary/20 focus:ring-primary hover:bg-background/70 transition-all">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-primary/20">
                      <SelectItem value="all" className="text-base hover:bg-primary/5 transition-colors">All Services</SelectItem>
                      <SelectItem value="food" className="text-base hover:bg-primary/5 transition-colors">Food Banks</SelectItem>
                      <SelectItem value="blood" className="text-base hover:bg-primary/5 transition-colors">Blood Donation</SelectItem>
                      <SelectItem value="shelter" className="text-base hover:bg-primary/5 transition-colors">Shelters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredOrganizations.map((org) => (
              <Card 
                key={org.id} 
                className="group hover:shadow-xl transition-all duration-300 border-primary/10 overflow-hidden"
              >
                <CardHeader className="bg-primary/5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${getCategoryColor(org.category)} bg-opacity-20 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      {getCategoryIcon(org.category)}
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {org.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{org.distance}</span>
                        <span className="h-1 w-1 rounded-full bg-primary/40" />
                        <span className="text-sm font-medium text-primary/80">{org.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-background hover:bg-primary hover:text-background transition-colors flex items-center justify-center gap-2"
                  >
                    Get Directions
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{org.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{org.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{org.hours}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                        <Heart className="h-4 w-4 text-primary" />
                        Available Services
                      </h4>
                      <ul className="grid gap-2">
                        {org.services.map((service, index) => (
                          <li 
                            key={index} 
                            className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/80 transition-colors bg-primary/5 px-3 py-2 rounded-lg"
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredOrganizations.length === 0 && (
              <Card className="col-span-full border-primary/10">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-primary/40 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No Results Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any organizations matching your criteria. Try adjusting your filters or location.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
