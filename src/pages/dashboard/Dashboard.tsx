
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserDashboard from '@/pages/user/UserDashboard';
import BusinessDashboard from '@/pages/business/BusinessDashboard';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  // Show appropriate dashboard based on user role
  return user.role === 'business' ? <BusinessDashboard /> : <UserDashboard />;
};

export default Dashboard;
