
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinesses } from '@/contexts/BusinessesContext';
import BusinessCard from '@/components/business/BusinessCard';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { businesses, loading } = useBusinesses();
  const [featuredRef, featuredInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Show only featured businesses (first 3)
  const featuredBusinesses = businesses.slice(0, 3);

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

  return (
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
  );
};

export default FeaturedSection;
