
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserDashboard from '@/pages/user/UserDashboard';
import BusinessDashboard from '@/pages/business/BusinessDashboard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Show loading state with enhanced animation
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg border border-gray-100"
        >
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-royal mx-auto mb-4" />
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="h-16 w-16 rounded-full border-2 border-royal/20 border-t-royal/40 mx-auto"></div>
            </motion.div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 mt-1">Just a moment please</p>
        </motion.div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  // Show appropriate dashboard based on user role with enhanced animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {user.role === 'business' ? <BusinessDashboard /> : <UserDashboard />}
    </motion.div>
  );
};

export default Dashboard;
