
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { Conversation, Message, useMessaging } from '@/contexts/MessagingContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BusinessCard from '@/components/business/BusinessCard';
import ConversationList from '@/components/messaging/ConversationList';
import MessageList from '@/components/messaging/MessageList';
import MessageInput from '@/components/messaging/MessageInput';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { businesses, savedBusinesses } = useBusinesses();
  const { conversations, getConversationMessages, sendMessage, markAsRead } = useMessaging();
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // Get saved businesses
  const savedBusinessesList = businesses.filter(business => 
    savedBusinesses.includes(business.id)
  );
  
  // Get selected conversation
  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);
  const selectedMessages = selectedConversationId 
    ? getConversationMessages(selectedConversationId) 
    : [];
    
  // Find business for selected conversation
  const getConversationBusiness = (conversation: Conversation) => {
    if (!conversation.businessId) return null;
    return businesses.find(b => b.id === conversation.businessId);
  };
  
  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    markAsRead(conversationId);
  };
  
  // Handle send message
  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !user) return;
    
    // Find the other participant's ID
    const receiverId = selectedConversation.participantIds.find(id => id !== user.id);
    if (!receiverId) return;
    
    await sendMessage(
      receiverId, 
      selectedConversation.businessId, 
      content
    );
  };
  
  if (!user) return null;
  
  const selectedBusiness = selectedConversation 
    ? getConversationBusiness(selectedConversation) 
    : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
        
        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Saved Businesses
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Manage your conversations with service providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[600px] border rounded-lg overflow-hidden">
                  {/* Left side - Conversations list */}
                  <div className="w-1/3 border-r">
                    <ConversationList 
                      selectedConversationId={selectedConversationId}
                      onSelectConversation={handleSelectConversation}
                    />
                  </div>
                  
                  {/* Right side - Chat */}
                  <div className="w-2/3 flex flex-col">
                    {selectedConversationId ? (
                      <>
                        {/* Chat header */}
                        <div className="p-4 border-b bg-gray-50">
                          {selectedBusiness ? (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{selectedBusiness.name}</h3>
                                <p className="text-xs text-gray-500">{selectedBusiness.category}</p>
                              </div>
                              <Link to={`/businesses/${selectedBusiness.id}`}>
                                <Button variant="outline" size="sm">View Profile</Button>
                              </Link>
                            </div>
                          ) : (
                            <h3 className="font-medium">Chat</h3>
                          )}
                        </div>
                        
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4">
                          <MessageList messages={selectedMessages} />
                        </div>
                        
                        {/* Message input */}
                        <MessageInput onSendMessage={handleSendMessage} />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
                          <p>Select a conversation to start messaging</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Businesses</CardTitle>
                <CardDescription>
                  Businesses you've saved for future reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedBusinessesList.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <h3 className="font-medium mb-1">No saved businesses yet</h3>
                    <p className="text-gray-500 mb-4">
                      Save businesses you're interested in for easy access later
                    </p>
                    <Link to="/businesses">
                      <Button>Browse Businesses</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedBusinessesList.map(business => (
                      <BusinessCard key={business.id} business={business} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboard;
