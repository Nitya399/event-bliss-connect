
import { Link } from 'react-router-dom';
import { Business } from '@/types/auth';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { saveBusiness, unsaveBusiness, isSaved } = useBusinesses();
  
  const saved = isSaved(business.id);
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (saved) {
      unsaveBusiness(business.id);
    } else {
      saveBusiness(business.id);
    }
  };

  return (
    <Link to={`/businesses/${business.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="relative h-44 overflow-hidden">
          {business.profileImage ? (
            <img 
              src={business.profileImage} 
              alt={business.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-white text-gray-700 hover:text-royal hover:bg-white ${
              saved ? 'text-red-500 hover:text-red-500' : ''
            }`}
            onClick={handleSaveToggle}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg truncate">{business.name}</h3>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <span>{business.location}</span>
            <span className="mx-2">•</span>
            <Badge variant="outline" className="text-royal">
              {business.category}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {business.description}
          </p>
        </CardContent>
        
        <CardFooter className="border-t pt-4 pb-4 flex justify-between">
          <div>
            <p className="text-sm font-medium">
              Small Events from <span className="text-royal">${business.smallEventPrice}</span>
            </p>
            <p className="text-xs text-gray-500">{business.yearsOfExperience} years experience</p>
          </div>
          <Button size="sm">View Profile</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BusinessCard;
