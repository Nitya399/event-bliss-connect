
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-royal">EventBliss</span>
                <span className="text-2xl font-bold text-gold">Connect</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/businesses" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-royal">
              Find Services
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-royal">
              How It Works
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-royal"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/businesses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-100"
            >
              Find Services
            </Link>
            <Link 
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-100"
            >
              How It Works
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-2">
              <Link 
                to="/login"
                className="block w-full text-center px-4 py-2 border border-royal rounded-md shadow-sm text-sm font-medium text-royal bg-white hover:bg-gray-50"
              >
                Log In
              </Link>
              <Link 
                to="/register"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royal hover:bg-royal-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
