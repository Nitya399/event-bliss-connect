
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BusinessRegisterData } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const BUSINESS_CATEGORIES = [
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

const BusinessRegistration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<BusinessRegisterData>({
    name: '',
    category: '',
    description: '',
    location: '',
    smallEventPrice: 0,
    largeEventPrice: 0,
    contactEmail: user?.email || '',
    contactPhone: '',
    yearsOfExperience: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name === 'yearsOfExperience' 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would send data to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Registration Complete',
        description: 'Your business has been successfully registered!'
      });
      
      navigate('/business-dashboard');
    } catch (error) {
      console.error('Business registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'There was an error registering your business. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Business Registration</CardTitle>
            <CardDescription className="text-center">
              Complete your business profile to start connecting with event hosts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Business Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Business Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell event hosts about your business and services..."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Business Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smallEventPrice">Small Event Price (starting from)</Label>
                    <Input
                      id="smallEventPrice"
                      name="smallEventPrice"
                      type="number"
                      min="0"
                      placeholder="500"
                      value={formData.smallEventPrice || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="largeEventPrice">Large Event Price (starting from)</Label>
                    <Input
                      id="largeEventPrice"
                      name="largeEventPrice"
                      type="number"
                      min="0"
                      placeholder="2000"
                      value={formData.largeEventPrice || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="contact@yourbusiness.com"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.yearsOfExperience || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Complete Registration'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default BusinessRegistration;
