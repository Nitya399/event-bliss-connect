
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
  );
};

export default TestimonialsSection;
