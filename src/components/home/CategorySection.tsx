
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Star, Calendar, MapPin } from 'lucide-react';

const CategorySection = () => {
  const navigate = useNavigate();
  const [categoriesRef, categoriesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const eventTypes = [
    { name: 'Weddings', icon: <Users className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=400" },
    { name: 'Corporate Events', icon: <Star className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&h=400" },
    { name: 'Birthday Parties', icon: <Calendar className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&h=400" },
    { name: 'Concerts', icon: <MapPin className="h-6 w-6" />, image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=600&h=400" },
  ];

  return (
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
  );
};

export default CategorySection;
