
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, UserCheck, ChevronRight, Star, MapPin, Calendar, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useBusinesses } from '@/contexts/BusinessesContext';
import BusinessCard from '@/components/business/BusinessCard';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const { businesses, loading } = useBusinesses();
  
  // Show only featured businesses (first 3)
  const featuredBusinesses = businesses.slice(0, 3);
  
  // Animation hooks for scroll-triggered animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuredRef, featuredInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const eventTypes = [
    { name: 'Weddings', icon: <Users className="h-6 w-6" /> },
    { name: 'Corporate Events', icon: <Star className="h-6 w-6" /> },
    { name: 'Birthday Parties', icon: <Calendar className="h-6 w-6" /> },
    { name: 'Concerts', icon: <MapPin className="h-6 w-6" /> },
  ];

  const testimonials = [
    {
      name: "Jessica Thompson",
      role: "Event Planner",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150",
      message: "EventBliss Connect helped me find the perfect catering service for our corporate event. Highly recommended!"
    },
    {
      name: "Michael Rousseau",
      role: "Wedding Host",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
      message: "I found an amazing wedding photographer within minutes. The platform is so easy to use!"
    }
  ];

  return (
    <Layout>
      {/* Hero section with parallax effect */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-royal/90 to-royal-700/90"
      >
        {/* Background image with parallax */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-royal/90 to-royal-700/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2600&h=1548')] bg-cover bg-center bg-fixed opacity-40"></div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            >
              Connect with the <span className="text-gold">Perfect</span> Event Service Providers
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-10 text-white/90"
            >
              Find trusted professionals for your next event, all in one place
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                onClick={() => navigate('/businesses')} 
                className="bg-white text-royal hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" /> Find Services
              </Button>
              <Button 
                onClick={() => navigate('/register?type=business')} 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
                size="lg"
              >
                List Your Business
              </Button>
            </motion.div>
          </div>
          
          {/* Bouncing arrow */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/30 text-white"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ChevronRight className="h-6 w-6 rotate-90" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Event type categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-800">Popular Event Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.name}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/businesses?category=${type.name}`)}
              >
                <div className="h-12 w-12 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4 text-royal">
                  {type.icon}
                </div>
                <h3 className="font-medium">{type.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            ref={howItWorksRef}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">How It Works</motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-gold mx-auto"></motion.div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-10"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-16 w-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Find Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through our curated list of event service providers and filter by category, price, and location.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group md:mt-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-16 w-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Connect Directly</h3>
              <p className="text-gray-600 leading-relaxed">
                Message service providers directly through our platform to discuss your event needs and get quotes.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-16 w-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Make Your Choice</h3>
              <p className="text-gray-600 leading-relaxed">
                Select the perfect service provider for your event and finalize the details with confidence.
              </p>
            </motion.div>
          </motion.div>

          {/* Step indicator */}
          <div className="hidden md:flex justify-center items-center mt-12">
            <div className="w-16 h-1 bg-royal/20 rounded-full"></div>
            <div className="w-4 h-4 mx-2 rounded-full bg-royal"></div>
            <div className="w-16 h-1 bg-royal/20 rounded-full"></div>
            <div className="w-4 h-4 mx-2 rounded-full bg-royal"></div>
            <div className="w-16 h-1 bg-royal/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured services section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            ref={featuredRef}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex justify-between items-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold">Featured Services</h2>
              <div className="w-20 h-1 bg-gold mt-2"></div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/businesses')} 
                className="flex items-center text-royal hover:text-royal-700 hover:bg-royal/5 group"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal"></div>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {featuredBusinesses.map((business, index) => (
                <motion.div 
                  key={business.id} 
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="transform transition-all duration-300"
                >
                  <BusinessCard business={business} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute top-6 left-6 text-6xl text-gold/10 font-serif">"</div>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-gold/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-600 mb-4 relative z-10">{testimonial.message}</p>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics section */}
      <section className="py-16 bg-gradient-to-r from-royal to-royal-700 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4"
            >
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-white/80">Service Providers</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4"
            >
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-white/80">Happy Customers</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4"
            >
              <p className="text-4xl font-bold mb-2">25+</p>
              <p className="text-white/80">Service Categories</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4"
            >
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-white/80">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-gold/10 to-gold/30 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute right-0 top-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="currentColor" points="0,0 100,0 100,100" className="text-gold"></polygon>
          </svg>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Are You a Service Provider?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
          >
            Join EventBliss Connect and showcase your services to event hosts looking for professionals like you.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={() => navigate('/register?type=business')}
              className="bg-gold hover:bg-gold-600 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Register Your Business
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
