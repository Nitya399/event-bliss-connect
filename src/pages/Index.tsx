
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search, MessageSquare, UserCheck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useBusinesses } from '@/contexts/BusinessesContext';
import BusinessCard from '@/components/business/BusinessCard';

const Index = () => {
  const navigate = useNavigate();
  const { businesses, loading } = useBusinesses();
  
  // Show only featured businesses (first 3)
  const featuredBusinesses = businesses.slice(0, 3);

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-royal to-royal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connect with the Perfect Event Service Providers
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Find trusted professionals for your next event, all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/businesses')} 
                className="bg-white text-royal hover:bg-gray-100 text-lg"
                size="lg"
              >
                Find Services
              </Button>
              <Button 
                onClick={() => navigate('/register?type=business')} 
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg"
                size="lg"
              >
                List Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-royal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Services</h3>
              <p className="text-gray-600">
                Browse through our curated list of event service providers and filter by category, price, and location.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-royal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Directly</h3>
              <p className="text-gray-600">
                Message service providers directly through our platform to discuss your event needs and get quotes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-14 w-14 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-6 w-6 text-royal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Make Your Choice</h3>
              <p className="text-gray-600">
                Select the perfect service provider for your event and finalize the details with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Services</h2>
            <Button variant="ghost" onClick={() => navigate('/businesses')} className="flex items-center">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading featured services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gold/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join EventBliss Connect and showcase your services to event hosts looking for professionals like you.
          </p>
          <Button 
            onClick={() => navigate('/register?type=business')}
            className="bg-gold hover:bg-gold-600 text-white text-lg"
            size="lg"
          >
            Register Your Business
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
