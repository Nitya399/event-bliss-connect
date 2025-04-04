
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useMessaging } from '@/contexts/MessagingContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Calendar, MapPin, Phone, Mail, DollarSign, Clock, MessageSquare } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import MessageInput from '@/components/messaging/MessageInput';

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { businesses, saveBusiness, unsaveBusiness, isSaved } = useBusinesses();
  const { user, isAuthenticated } = useAuth();
  const { getOrCreateConversation, sendMessage } = useMessaging();
  const { toast } = useToast();
  
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  
  const business = businesses.find(b => b.id === id);
  const isSavedBusiness = business ? isSaved(business.id) : false;

  const handleSaveToggle = () => {
    if (!business) return;
    
    if (isSavedBusiness) {
      unsaveBusiness(business.id);
      toast({
        title: 'Business removed from saved list',
        description: `${business.name} has been removed from your saved businesses`
      });
    } else {
      saveBusiness(business.id);
      toast({
        title: 'Business saved',
        description: `${business.name} has been added to your saved businesses`
      });
    }
  };
  
  const handleSendMessage = async (message: string) => {
    if (!business || !isAuthenticated || !user) return;
    
    try {
      // In a real app, we'd use the actual business owner's ID
      const receiverId = business.ownerId;
      const businessId = business.id;
      
      const success = await sendMessage(receiverId, businessId, message);
      
      if (success) {
        toast({
          title: 'Message sent',
          description: `Your message has been sent to ${business.name}`
        });
        setMessageDialogOpen(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (!business) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Business not found</h1>
          <p className="mb-8">The business you're looking for doesn't exist or has been removed.</p>
          <Link to="/businesses">
            <Button>Browse Other Businesses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
          {business.coverImage ? (
            <img
              src={business.coverImage}
              alt={`${business.name} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No cover image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">{business.category}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {business.name}
                </h1>
                <div className="flex items-center text-white mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{business.location}</span>
                </div>
              </div>
              
              {(user?.role === 'user' || !isAuthenticated) && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-800 hover:bg-white/90"
                    onClick={handleSaveToggle}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${isSavedBusiness ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    {isSavedBusiness ? 'Saved' : 'Save'}
                  </Button>
                  
                  {isAuthenticated && user?.role === 'user' ? (
                    <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <div className="space-y-4">
                          <div className="text-center pb-2 border-b">
                            <h3 className="text-lg font-medium">
                              Send message to {business.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Introduce yourself and ask about their services
                            </p>
                          </div>
                          
                          <MessageInput
                            onSendMessage={handleSendMessage}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : !isAuthenticated ? (
                    <Link to="/login">
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Login to Message
                      </Button>
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content - business details */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">About This Business</h2>
              <p className="text-gray-700">{business.description}</p>
            </section>
            
            {business.gallery && business.gallery.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {business.gallery.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <div className="aspect-square rounded-md overflow-hidden">
                            <img
                              src={image}
                              alt={`${business.name} gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </section>
            )}
          </div>
          
          {/* Right sidebar - business info card */}
          <div>
            <div className="bg-white rounded-lg border p-6 shadow-sm sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Business Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Pricing</p>
                    <p className="text-sm text-gray-600">
                      Small events: ${business.smallEventPrice}+<br />
                      Large events: ${business.largeEventPrice}+
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-gray-600">
                      {business.yearsOfExperience} years in business
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-gray-600">
                      {new Date(business.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3">Contact Information</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <a href={`mailto:${business.contactEmail}`} className="text-sm text-royal hover:underline">
                        {business.contactEmail}
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <a href={`tel:${business.contactPhone}`} className="text-sm text-royal hover:underline">
                        {business.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
                
                {user?.role === 'user' && (
                  <div className="pt-4">
                    <Button className="w-full" onClick={() => setMessageDialogOpen(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Business
                    </Button>
                  </div>
                )}
                
                {!isAuthenticated && (
                  <div className="pt-4">
                    <Link to="/login">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Login to Contact
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessProfile;
