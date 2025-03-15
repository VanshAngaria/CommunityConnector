import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would redirect to a payment gateway
    toast({
      title: "Thank you for your donation!",
      description: `Click here to complete your $${amount} donation.`,
      action: (
        <Button 
          variant="link" 
          onClick={() => window.open('https://example.com/donate', '_blank')}
          className="text-primary hover:text-primary/90"
        >
          Complete Payment
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/src/components/images/hands-homepg.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl font-bold mb-4 text-white">Support Our Cause</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your donation helps us continue connecting volunteers with meaningful opportunities and supporting local communities.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Your Impact</h2>
            <div className="grid gap-6">
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Heart className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Support Local Communities</h3>
                      <p className="text-muted-foreground">
                        Your donation helps local initiatives reach more people in need.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Enable More Opportunities</h3>
                      <p className="text-muted-foreground">
                        Help us create and support more volunteer opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Secure Platform</h3>
                      <p className="text-muted-foreground">
                        Maintain and improve our platform for volunteers and NGOs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white via-white to-primary/10">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleDonate(); }}>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={selectedAmount === 10 ? "default" : "outline"}
                      onClick={() => { setSelectedAmount(10); setCustomAmount(""); }}
                      className="h-16 text-lg font-semibold"
                    >
                      $10
                    </Button>
                    <Button
                      type="button"
                      variant={selectedAmount === 25 ? "default" : "outline"}
                      onClick={() => { setSelectedAmount(25); setCustomAmount(""); }}
                      className="h-16 text-lg font-semibold"
                    >
                      $25
                    </Button>
                    <Button
                      type="button"
                      variant={selectedAmount === 50 ? "default" : "outline"}
                      onClick={() => { setSelectedAmount(50); setCustomAmount(""); }}
                      className="h-16 text-lg font-semibold"
                    >
                      $50
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Custom Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      min="1"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="Your email" />
                  </div>
                  <Button type="submit" className="w-full bg-primary/90 hover:bg-primary">
                    Donate Now
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment powered by Stripe
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}