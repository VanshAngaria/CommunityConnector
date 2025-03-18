import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Calendar, MessageSquare, MapPin, Droplet, Home } from "lucide-react";
import { Header } from "@/components/header";
import { useEffect } from "react";
import Typed from "typed.js";

// Add custom animation keyframes
const styles = `
  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-up {
    animation: slideUpAndFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .animate-scale-in {
    animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }

  .animation-delay-500 {
    animation-delay: 500ms;
  }
`;

export default function HomePage() {
  const { user } = useAuth();

  useEffect(() => {
    // Add styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const typed = new Typed(".typed-text", {
      strings: [
        "Whether you're looking to make a difference^1000",
        "seeking assistance^1000",
        "we're here to help you connect^1000",
        "and create positive change.^1000"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: false
    });

    return () => {
      typed.destroy();
      styleSheet.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="py-48 md:py-64 relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 animate-scale-in"
            style={{
              backgroundImage: 'url("/src/components/images/image.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.2,
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white z-0"
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent opacity-0 animate-slide-up">
              Connect with Meaningful Volunteer Opportunities
            </h2>
            <p className="text-3xl md:text-4xl text-muted-foreground mb-12 max-w-4xl mx-auto font-light opacity-0 animate-slide-up animation-delay-200 leading-relaxed">
              <span className="typed-text bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent"></span>
            </p>
            <div className="space-x-6 opacity-0 animate-slide-up animation-delay-300">
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 py-6">Get Started</Button>
              </Link>
              <Link href="/assistance-finder">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">Find Local Help</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 relative">
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[20%] text-[16rem] leading-none select-none font-black tracking-[0.2em] text-center whitespace-nowrap opacity-0 animate-slide-up"
              style={{
                background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.03) 0%, rgba(244, 63, 94, 0) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none'
              }}
            >
              SERVICES
            </div>
            <h3 className="text-4xl font-bold text-center mb-16 relative z-10 bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent opacity-0 animate-slide-up animation-delay-100">
              Available Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <Card className="relative h-[400px] group hover:shadow-xl transition-all duration-300 opacity-0 animate-slide-up animation-delay-200 overflow-hidden">
                <img 
                  src="/src/components/images/food.webp" 
                  alt="Food Bank Services" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Food Banks</h4>
                  <p className="text-gray-200 text-lg mb-6 drop-shadow-lg">
                    Find local food banks and meal services for those in need.
                  </p>
                  <Link href="/assistance-finder?category=food" className="block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-rose-500 text-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Find Food Banks →
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="relative h-[400px] group hover:shadow-xl transition-all duration-300 opacity-0 animate-slide-up animation-delay-300 overflow-hidden">
                <img 
                  src="/src/components/images/blood donation.webp" 
                  alt="Blood Donation Centers" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Droplet className="h-6 w-6 text-rose-500" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Blood Donation</h4>
                  <p className="text-gray-200 text-lg mb-6 drop-shadow-lg">
                    Locate blood donation centers and upcoming blood drives.
                  </p>
                  <Link href="/assistance-finder?category=blood" className="block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-rose-500 text-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Find Donation Centers →
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="relative h-[400px] group hover:shadow-xl transition-all duration-300 opacity-0 animate-slide-up animation-delay-400 overflow-hidden">
                <img 
                  src="/src/components/images/emergency shelters.webp" 
                  alt="Emergency Shelter Services" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Home className="h-6 w-6 text-rose-500" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Emergency Shelters</h4>
                  <p className="text-gray-200 text-lg mb-6 drop-shadow-lg">
                    Access emergency shelter and housing assistance services.
                  </p>
                  <Link href="/assistance-finder?category=shelter" className="block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-rose-500 text-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Find Shelters →
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-rose-50 to-rose-100/30">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 opacity-0 animate-slide-up bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">Quick Actions</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <Link href="/opportunities" className="opacity-0 animate-slide-up animation-delay-100">
                <Card className="text-center p-8 hover:border-primary hover:shadow-lg cursor-pointer h-[280px] flex flex-col items-center justify-center group bg-white/80 backdrop-blur-sm">
                  <Users className="h-12 w-12 mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-semibold mb-4">Volunteer Opportunities</h4>
                  <p className="text-muted-foreground">
                    Find opportunities that match your skills
                  </p>
                </Card>
              </Link>

              <Link href="/assistance-finder" className="opacity-0 animate-slide-up animation-delay-200">
                <Card className="text-center p-8 hover:border-primary hover:shadow-lg cursor-pointer h-[280px] flex flex-col items-center justify-center group bg-white/80 backdrop-blur-sm">
                  <MapPin className="h-12 w-12 mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-semibold mb-4">Find Local Help</h4>
                  <p className="text-muted-foreground">
                    Locate nearby NGOs and assistance centers
                  </p>
                </Card>
              </Link>

              <Link href="/events" className="opacity-0 animate-slide-up animation-delay-300">
                <Card className="text-center p-8 hover:border-primary hover:shadow-lg cursor-pointer h-[280px] flex flex-col items-center justify-center group bg-white/80 backdrop-blur-sm">
                  <Calendar className="h-12 w-12 mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-semibold mb-4">Events</h4>
                  <p className="text-muted-foreground">
                    Join upcoming community events
                  </p>
                </Card>
              </Link>

              <Link href="/forum" className="opacity-0 animate-slide-up animation-delay-400">
                <Card className="text-center p-8 hover:border-primary hover:shadow-lg cursor-pointer h-[280px] flex flex-col items-center justify-center group bg-white/80 backdrop-blur-sm">
                  <MessageSquare className="h-12 w-12 mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-semibold mb-4">Community Forum</h4>
                  <p className="text-muted-foreground">
                    Connect with other volunteers
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div 
            className="absolute inset-0 z-0 animate-scale-in"
            style={{
              backgroundImage: 'url("/src/components/images/desc.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-up animation-delay-100">
                <p className="text-4xl font-bold text-white mb-2">1000+</p>
                <p className="text-lg text-gray-200">Active Volunteers</p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-up animation-delay-200">
                <p className="text-4xl font-bold text-white mb-2">500+</p>
                <p className="text-lg text-gray-200">NGO Partners</p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-up animation-delay-300">
                <p className="text-4xl font-bold text-white mb-2">2000+</p>
                <p className="text-lg text-gray-200">Opportunities</p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-up animation-delay-400">
                <p className="text-4xl font-bold text-white mb-2">100+</p>
                <p className="text-lg text-gray-200">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-black to-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-rose-500 animate-pulse" />
                <h4 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">About Us</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Volunteer Connect is a platform dedicated to connecting volunteers with meaningful opportunities and providing assistance to those in need. Together, we're building a stronger, more compassionate community.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <Users className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">Quick Links</h4>
              <ul className="space-y-3">
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/opportunities" className="text-gray-400 hover:text-rose-300">Browse Opportunities →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/events" className="text-gray-400 hover:text-rose-300">Upcoming Events →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/assistance-finder" className="text-gray-400 hover:text-rose-300">Find Help →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/forum" className="text-gray-400 hover:text-rose-300">Community Forum →</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">For Organizations</h4>
              <ul className="space-y-3">
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Post Opportunities →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Manage Volunteers →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Create Events →</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="h-5 w-5 text-rose-500" />
                  <span>123 Community Street, City</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <MessageSquare className="h-5 w-5 text-rose-500" />
                  <span>info@volunteerconnect.org</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <Users className="h-5 w-5 text-rose-500" />
                  <span>Support: 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}