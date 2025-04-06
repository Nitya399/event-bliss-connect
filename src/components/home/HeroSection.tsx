
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
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
      initial="hidden"
      animate="visible"
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
              className="border-2 border-white text-white font-medium hover:bg-white/20 transform transition-all duration-300 text-lg"
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
  );
};

export default HeroSection;
