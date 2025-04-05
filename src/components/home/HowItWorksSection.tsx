
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Search, MessageSquare, UserCheck } from 'lucide-react';

const HowItWorksSection = () => {
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
  );
};

export default HowItWorksSection;
