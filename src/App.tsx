
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { BusinessesProvider } from "@/contexts/BusinessesContext";
import { MessagingProvider } from "@/contexts/MessagingContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import BusinessListings from "./pages/business/BusinessListings";
import BusinessProfile from "./pages/business/BusinessProfile";
import BusinessRegistration from "./pages/business/BusinessRegistration";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BusinessesProvider>
        <MessagingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/businesses" element={<BusinessListings />} />
                <Route path="/businesses/:id" element={<BusinessProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<About />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/business-dashboard" element={<Dashboard />} />
                <Route path="/business-registration" element={<BusinessRegistration />} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </MessagingProvider>
      </BusinessesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
