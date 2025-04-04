
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { Business } from '@/types/auth';
import BusinessCard from '@/components/business/BusinessCard';
import BusinessFilters, { BusinessFiltersState } from '@/components/business/BusinessFilters';
import Layout from '@/components/layout/Layout';

const BusinessListings = () => {
  const [searchParams] = useSearchParams();
  const { businesses, loading } = useBusinesses();
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  
  // Initialize filters state from search parameters (if provided from AI assistant)
  const initialFilters: BusinessFiltersState = {
    search: '',
    category: searchParams.get('category') || 'All',
    location: searchParams.get('location') || '',
    priceRange: [
      searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') as string) : 0,
      searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') as string) : 10000
    ],
    experienceYears: 0
  };
  
  const [filters, setFilters] = useState<BusinessFiltersState>(initialFilters);

  // Apply filters when businesses load or filters change
  useEffect(() => {
    if (loading) return;
    
    const applyFilters = () => {
      let result = [...businesses];
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(
          business =>
            business.name.toLowerCase().includes(searchTerm) ||
            business.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply category filter
      if (filters.category !== 'All') {
        result = result.filter(business => business.category === filters.category);
      }
      
      // Apply location filter
      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        result = result.filter(business =>
          business.location.toLowerCase().includes(locationTerm)
        );
      }
      
      // Apply price filter
      result = result.filter(
        business =>
          business.smallEventPrice >= filters.priceRange[0] &&
          business.largeEventPrice <= filters.priceRange[1]
      );
      
      // Apply experience filter
      if (filters.experienceYears > 0) {
        result = result.filter(
          business => business.yearsOfExperience >= filters.experienceYears
        );
      }
      
      setFilteredBusinesses(result);
    };
    
    applyFilters();
  }, [businesses, filters, loading]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Find Event Services</h1>
        <p className="text-gray-600 mb-6">
          Browse and connect with the best event service providers
        </p>
        
        <BusinessFilters filters={filters} onFilterChange={setFilters} />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading businesses...</p>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No businesses found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to find more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BusinessListings;
