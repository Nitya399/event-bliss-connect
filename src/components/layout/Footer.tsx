
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-royal">EventBliss</span>
              <span className="text-xl font-bold text-gold">Connect</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Connecting event hosts with the perfect service providers for memorable events.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Hosts</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/businesses" className="text-sm text-gray-600 hover:text-royal">
                  Find Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-royal">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/saved-businesses" className="text-sm text-gray-600 hover:text-royal">
                  Saved Businesses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Businesses</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/register?type=business" className="text-sm text-gray-600 hover:text-royal">
                  Join as a Business
                </Link>
              </li>
              <li>
                <Link to="/business-dashboard" className="text-sm text-gray-600 hover:text-royal">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/faq-business" className="text-sm text-gray-600 hover:text-royal">
                  Business FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-royal">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-royal">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-royal">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-royal">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} EventBliss Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
