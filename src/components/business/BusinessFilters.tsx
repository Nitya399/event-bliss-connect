
import { useState, useEffect } from 'react';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

// Business categories
const BUSINESS_CATEGORIES = [
  'All',
  'Event Management',
  'Catering',
  'Photography',
  'Decoration',
  'Entertainment',
  'Venue',
  'Transportation',
  'Makeup and Hair',
  'Florist',
  'Other'
];

export interface BusinessFiltersState {
  search: string;
  category: string;
  location: string;
  priceRange: [number, number];
  experienceYears: number;
}

interface BusinessFiltersProps {
  filters: BusinessFiltersState;
  onFilterChange: (filters: BusinessFiltersState) => void;
}

const BusinessFilters = ({ filters, onFilterChange }: BusinessFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<BusinessFiltersState>(filters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Sync local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  // Handle changes to individual filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onFilterChange({ ...filters, search: value });
  };
  
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalFilters({ ...localFilters, location: value });
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      priceRange: [value[0], value[1]] as [number, number]
    });
  };
  
  const handleExperienceChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      experienceYears: value[0]
    });
  };
  
  // Apply filters from mobile view
  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsMobileFilterOpen(false);
  };
  
  // Reset all filters
  const resetFilters = () => {
    const reset: BusinessFiltersState = {
      search: '',
      category: 'All',
      location: '',
      priceRange: [0, 10000],
      experienceYears: 0
    };
    
    setLocalFilters(reset);
    onFilterChange(reset);
  };
  
  // Check if any filters are applied
  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.location !== '' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 10000 || 
    filters.experienceYears > 0;

  return (
    <div className="mb-6">
      {/* Search and filter button row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search businesses..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {filters.search && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => onFilterChange({ ...filters, search: '' })}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Mobile filter button */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  <Check className="h-3 w-3" />
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4 flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <Input
                  placeholder="Enter city or region"
                  value={localFilters.location}
                  onChange={handleLocationChange}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[localFilters.priceRange[0], localFilters.priceRange[1]]}
                    value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
                    max={10000}
                    step={100}
                    onValueChange={handlePriceRangeChange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${localFilters.priceRange[0]}</span>
                    <span>${localFilters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Experience (years)</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[localFilters.experienceYears]}
                    value={[localFilters.experienceYears]}
                    max={20}
                    step={1}
                    onValueChange={handleExperienceChange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{localFilters.experienceYears}+ years</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="flex-1" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        {BUSINESS_CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={filters.category === category ? "default" : "outline"}
            className={`text-sm ${
              filters.category === category ? 'bg-royal hover:bg-royal-700' : ''
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="text-sm text-gray-500"
            onClick={resetFilters}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BusinessFilters;
