
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  const navigate = useNavigate();
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

  return (
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
            className="bg-royal hover:bg-royal-700 text-white text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 font-medium"
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
  );
};

export default CtaSection;
