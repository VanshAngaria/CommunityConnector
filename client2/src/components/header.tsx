import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Heart, Users, Calendar, HandHeart, MessageCircle, Gift } from "lucide-react";

export function Header() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="bg-gradient-to-r from-rose-50 via-rose-50/95 to-rose-50 border-b border-rose-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center space-x-2 group relative">
                <div className="absolute -inset-2 bg-rose-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <Heart className="h-7 w-7 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                <h1 className="text-2xl font-bold relative">
                  <span className="bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
                    Volunteer Connect
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-rose-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </h1>
              </div>
            </Link>
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm">
                <Link href="/events">
                  <div className="relative px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 group transition-colors duration-200">
                    <div className="absolute inset-0 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <div className="relative flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Events</span>
                    </div>
                  </div>
                </Link>
                <Link href="/opportunities">
                  <div className="relative px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 group transition-colors duration-200">
                    <div className="absolute inset-0 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <div className="relative flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Opportunities</span>
                    </div>
                  </div>
                </Link>
                <Link href="/assistance-finder">
                  <div className="relative px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 group transition-colors duration-200">
                    <div className="absolute inset-0 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <div className="relative flex items-center space-x-1">
                      <HandHeart className="w-4 h-4" />
                      <span>Find Help</span>
                    </div>
                  </div>
                </Link>
                <Link href="/forum">
                  <div className="relative px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 group transition-colors duration-200">
                    <div className="absolute inset-0 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <div className="relative flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Forum</span>
                    </div>
                  </div>
                </Link>
                <Link href="/donate">
                  <div className="relative px-4 py-2 rounded-full text-rose-500 hover:text-rose-600 font-medium group transition-colors duration-200">
                    <div className="absolute inset-0 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <div className="relative flex items-center space-x-1">
                      <Gift className="w-4 h-4" />
                      <span>Donate</span>
                    </div>
                  </div>
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="relative group overflow-hidden border-rose-200 hover:border-rose-300"
                  >
                    <div className="absolute inset-0 bg-rose-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative group-hover:text-rose-500 transition-colors duration-300">Dashboard</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => logoutMutation.mutate()}
                  className="relative group overflow-hidden border-rose-200 hover:border-rose-300"
                >
                  <div className="absolute inset-0 bg-rose-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative group-hover:text-rose-500 transition-colors duration-300">Logout</span>
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-rose-500 hover:bg-rose-600 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Login / Register</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
