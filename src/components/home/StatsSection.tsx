
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
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
  );
};

export default StatsSection;
