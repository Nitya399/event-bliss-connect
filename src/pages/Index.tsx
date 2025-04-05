
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, UserCheck, ChevronRight, Star, MapPin, Calendar, Users, ArrowDown } from 'lucide-react';
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
  const [categoriesRef, categoriesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
    { name: 'Weddings', icon: <Users className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=400" },
    { name: 'Corporate Events', icon: <Star className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&h=400" },
    { name: 'Birthday Parties', icon: <Calendar className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&h=400" },
    { name: 'Concerts', icon: <MapPin className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=600&h=400" },
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
      {/* Hero section with enhanced parallax effect */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-r from-royal/90 to-royal-700/95"
      >
        {/* Background image with parallax */}
        <div className="absolute inset-0 w-full h-full z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-r from-royal/90 to-royal-700/95 z-10"
          ></motion.div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2600&h=1548')] bg-cover bg-center bg-fixed opacity-40"></div>
          
          {/* Floating particles for visual interest */}
          <div className="absolute inset-0 z-5 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute rounded-full bg-white/10"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.1,
                  scale: Math.random() * 0.4 + 0.1
                }}
                animate={{ 
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: Math.random() * 10 + 10,
                  ease: "easeInOut" 
                }}
                style={{
                  width: Math.random() * 80 + 10 + "px",
                  height: Math.random() * 80 + 10 + "px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            >
              Create <span className="bg-gradient-to-r from-white to-gold text-transparent bg-clip-text">Unforgettable</span> Events with Perfect Partners
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-10 text-white/90 font-light"
            >
              Connect with trusted professionals for your next celebration, all in one seamless experience
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                onClick={() => navigate('/businesses')} 
                className="bg-white text-royal hover:bg-gray-100 hover:shadow-lg transform transition-all duration-300 text-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" /> Find Services
              </Button>
              <Button 
                onClick={() => navigate('/register?type=business')} 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 transform transition-all duration-300 text-lg"
                size="lg"
              >
                List Your Business
              </Button>
            </motion.div>
          </div>
          
          {/* Redesigned scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 1 },
              y: { duration: 1.5, repeat: Infinity }
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20 p-3"
              onClick={() => {
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Event type categories with enhanced design */}
      <section id="categories" className="py-24 bg-white" ref={categoriesRef}>
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Discover Event Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect professionals for every occasion, from intimate gatherings to grand celebrations</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                className="rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => navigate(`/businesses?category=${type.name}`)}
              >
                <div className="h-60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-royal/80 to-transparent z-10"></div>
                  <img 
                    src={type.image} 
                    alt={type.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-royal/70 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                        {type.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{type.name}</h3>
                    </div>
                    <div className="mt-2 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                      <p className="text-sm text-white/90">Find the best {type.name.toLowerCase()} services</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section with improved visuals */}
      <section id="how-it-works" className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-royal-100/30 to-royal-200/10 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-gold-100/30 to-gold-200/10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            ref={howItWorksRef}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span variants={itemVariants} className="text-gold font-medium inline-block mb-2">SIMPLE PROCESS</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">How EventBliss Connect Works</motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-gradient-to-r from-gold to-gold-600 rounded mx-auto"></motion.div>
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
              className="bg-white p-8 rounded-xl shadow-lg text-center relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="h-16 w-16 bg-gradient-to-br from-royal-100 to-royal-300 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-all duration-300">
                  <Search className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Find Services</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse our curated list of event service providers filtered by category, price, and location to match your exact needs.
                </p>
              </div>
              <div className="h-1.5 w-24 bg-gradient-to-r from-royal-300 to-royal-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center relative overflow-hidden group md:mt-10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="h-16 w-16 bg-gradient-to-br from-royal-100 to-royal-300 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-all duration-300">
                  <MessageSquare className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Connect Directly</h3>
                <p className="text-gray-600 leading-relaxed">
                  Message service providers directly through our secure platform to discuss your event needs and get customized quotes.
                </p>
              </div>
              <div className="h-1.5 w-24 bg-gradient-to-r from-royal-300 to-royal-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-royal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="h-16 w-16 bg-gradient-to-br from-royal-100 to-royal-300 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-all duration-300">
                  <UserCheck className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Make Your Choice</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select the perfect service provider with confidence using verified reviews, detailed profiles, and transparent pricing.
                </p>
              </div>
              <div className="h-1.5 w-24 bg-gradient-to-r from-royal-300 to-royal-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          </motion.div>

          {/* Enhanced step indicator */}
          <div className="hidden md:flex justify-center items-center mt-16">
            <motion.div 
              initial={{ width: 0 }}
              animate={howItWorksInView ? { width: "16rem" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-royal-100 to-royal-300 rounded-full"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={howItWorksInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="w-4 h-4 mx-2 rounded-full bg-royal"
            ></motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={howItWorksInView ? { width: "16rem" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-royal-300 to-royal-500 rounded-full"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={howItWorksInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="w-4 h-4 mx-2 rounded-full bg-royal"
            ></motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={howItWorksInView ? { width: "16rem" } : { width: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-gradient-to-r from-royal-500 to-royal-700 rounded-full"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Featured services section with improved cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            ref={featuredRef}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-center mb-14"
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-0 text-center md:text-left">
              <span className="text-gold font-medium inline-block mb-2">PREMIUM SELECTION</span>
              <h2 className="text-3xl font-bold">Featured Services</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-600 rounded mt-2 mx-auto md:mx-0"></div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/businesses')} 
                className="flex items-center text-royal hover:text-royal-700 hover:bg-royal/5 group"
              >
                View all services
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-royal border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
              </div>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="transform transition-all duration-300"
                >
                  <BusinessCard business={business} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Testimonials section with improved cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" ref={testimonialsRef}>
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#1a56db" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#1a56db" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="10%" cy="20%" r="20" fill="url(#circleGradient)" />
            <circle cx="80%" cy="60%" r="30" fill="url(#circleGradient)" />
            <circle cx="40%" cy="90%" r="15" fill="url(#circleGradient)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-gold font-medium inline-block mb-2">CLIENT EXPERIENCES</span>
            <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-600 rounded mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 h-1.5 w-24 bg-gradient-to-r from-royal to-royal-500 group-hover:w-full transition-all duration-500"></div>
                <div className="absolute top-6 right-6 text-7xl text-gold/10 font-serif leading-none">"</div>
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-gold/30 shadow-md">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-royal text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="pt-1">
                    <p className="text-gray-600 mb-4 relative z-10 italic">"{testimonial.message}"</p>
                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-royal">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics section with animated counters */}
      <section className="py-20 bg-gradient-to-r from-royal to-royal-700 text-white relative overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Service Providers", delay: 0 },
              { value: "10K+", label: "Happy Customers", delay: 0.1 },
              { value: "25+", label: "Service Categories", delay: 0.2 },
              { value: "99%", label: "Satisfaction Rate", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -5 }}
                className="p-4"
              >
                <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section with enhanced visuals */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-gradient-to-br from-gold/5 via-gold/10 to-gold/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <svg className="absolute right-0 top-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="currentColor" points="0,0 100,0 100,100" className="text-gold"></polygon>
          </svg>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.span 
            variants={itemVariants}
            className="text-gold font-medium inline-block mb-2"
          >
            START TODAY
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Are You a Premium Service Provider?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
          >
            Join EventBliss Connect and showcase your expertise to thousands of event hosts looking for professionals like you.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={() => navigate('/register?type=business')}
              className="bg-gradient-to-r from-gold to-gold-600 hover:from-gold-600 hover:to-gold text-white text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Register Your Business
            </Button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-sm text-gray-600"
          >
            Join 500+ successful businesses already growing with us
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
