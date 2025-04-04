
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Business } from '@/types/auth';

// Mock businesses data
const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    ownerId: '2',
    name: 'Elegant Events Planning',
    category: 'Event Management',
    description: 'We specialize in luxury wedding and corporate event planning with over 10 years of experience. Our team handles everything from venue selection to day-of coordination.',
    location: 'New York, NY',
    smallEventPrice: 1500,
    largeEventPrice: 5000,
    contactEmail: 'contact@elegantevents.com',
    contactPhone: '+1 (212) 555-1234',
    yearsOfExperience: 10,
    profileImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2023-05-15').toISOString(),
  },
  {
    id: '2',
    ownerId: '3',
    name: 'Divine Catering Co.',
    category: 'Catering',
    description: 'From intimate gatherings to grand celebrations, we offer exquisite cuisine tailored to your preferences. Our chefs use locally-sourced ingredients to create memorable dining experiences.',
    location: 'Los Angeles, CA',
    smallEventPrice: 800,
    largeEventPrice: 3500,
    contactEmail: 'info@divinecatering.com',
    contactPhone: '+1 (310) 555-6789',
    yearsOfExperience: 7,
    profileImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2023-07-22').toISOString(),
  },
  {
    id: '3',
    ownerId: '4',
    name: 'Capture Moments Photography',
    category: 'Photography',
    description: 'We capture the precious moments of your special day in a natural, candid style. Our team specializes in weddings, engagements, and special events photography.',
    location: 'Chicago, IL',
    smallEventPrice: 1200,
    largeEventPrice: 4000,
    contactEmail: 'hello@capturemoments.com',
    contactPhone: '+1 (312) 555-9012',
    yearsOfExperience: 8,
    profileImage: 'https://images.unsplash.com/photo-1581511734098-018d5644443f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2023-09-10').toISOString(),
  },
  {
    id: '4',
    ownerId: '5',
    name: 'Floral Fantasy Decorators',
    category: 'Decoration',
    description: 'We transform spaces with stunning floral arrangements and decorations. Specializing in weddings, corporate events, and parties, we bring your vision to life.',
    location: 'Miami, FL',
    smallEventPrice: 600,
    largeEventPrice: 2500,
    contactEmail: 'design@floralfantasy.com',
    contactPhone: '+1 (305) 555-3456',
    yearsOfExperience: 5,
    profileImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1520869578617-6211760e3ec3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: '5',
    ownerId: '6',
    name: 'Melody Makers Entertainment',
    category: 'Entertainment',
    description: 'From live bands to DJs, we provide top-tier entertainment for all types of events. Our performers are experienced professionals who know how to keep the energy high.',
    location: 'Nashville, TN',
    smallEventPrice: 1000,
    largeEventPrice: 3000,
    contactEmail: 'bookings@melodymakers.com',
    contactPhone: '+1 (615) 555-7890',
    yearsOfExperience: 12,
    profileImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2023-11-18').toISOString(),
  },
  {
    id: '6',
    ownerId: '7',
    name: 'Grand Venue Halls',
    category: 'Venue',
    description: 'Our elegant venues offer the perfect setting for any event. With customizable spaces and state-of-the-art facilities, we host weddings, corporate events, and more.',
    location: 'Dallas, TX',
    smallEventPrice: 3000,
    largeEventPrice: 12000,
    contactEmail: 'reservations@grandvenue.com',
    contactPhone: '+1 (214) 555-2345',
    yearsOfExperience: 15,
    profileImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    coverImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: new Date('2023-10-02').toISOString(),
  }
];

// Types
interface BusinessesContextType {
  businesses: Business[];
  loading: boolean;
  error: string | null;
  savedBusinesses: string[];
  saveBusiness: (businessId: string) => void;
  unsaveBusiness: (businessId: string) => void;
  isSaved: (businessId: string) => boolean;
}

// Create Context
const BusinessesContext = createContext<BusinessesContextType | undefined>(undefined);

// Provider Component
export const BusinessesProvider = ({ children }: { children: ReactNode }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>([]);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 800));
        setBusinesses(MOCK_BUSINESSES);
        
        // Load saved businesses from localStorage
        const saved = localStorage.getItem('savedBusinesses');
        if (saved) {
          setSavedBusinesses(JSON.parse(saved));
        }
      } catch (err) {
        setError('Failed to load businesses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  const saveBusiness = (businessId: string) => {
    setSavedBusinesses(prev => {
      const updated = [...prev, businessId];
      localStorage.setItem('savedBusinesses', JSON.stringify(updated));
      return updated;
    });
  };

  const unsaveBusiness = (businessId: string) => {
    setSavedBusinesses(prev => {
      const updated = prev.filter(id => id !== businessId);
      localStorage.setItem('savedBusinesses', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (businessId: string) => {
    return savedBusinesses.includes(businessId);
  };

  return (
    <BusinessesContext.Provider
      value={{
        businesses,
        loading,
        error,
        savedBusinesses,
        saveBusiness,
        unsaveBusiness,
        isSaved
      }}
    >
      {children}
    </BusinessesContext.Provider>
  );
};

// Custom Hook
export const useBusinesses = () => {
  const context = useContext(BusinessesContext);
  if (!context) {
    throw new Error('useBusinesses must be used within a BusinessesProvider');
  }
  return context;
};
