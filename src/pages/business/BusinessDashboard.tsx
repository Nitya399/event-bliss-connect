
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { Conversation, useMessaging } from '@/contexts/MessagingContext';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, User, BarChart3, Clock, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ConversationList from '@/components/messaging/ConversationList';
import MessageList from '@/components/messaging/MessageList';
import MessageInput from '@/components/messaging/MessageInput';

// Mock analytics data
const MOCK_ANALYTICS = {
  profileViews: [
    { name: '1 Apr', views: 15 },
    { name: '2 Apr', views: 20 },
    { name: '3 Apr', views: 35 },
    { name: '4 Apr', views: 25 },
    { name: '5 Apr', views: 30 },
    { name: '6 Apr', views: 40 },
    { name: '7 Apr', views: 35 },
  ],
  metrics: {
    totalViews: 200,
    newInquiries: 6,
    responseRate: 95,
    avgResponseTime: 1.5,
  },
};

const BusinessDashboard = () => {
  const { user, logout } = useAuth();
  const { businesses } = useBusinesses();
  const { conversations, getConversationMessages, sendMessage, markAsRead } = useMessaging();
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // Get business for current user
  const userBusiness = businesses.find(business => business.ownerId === user?.id);
  
  // Get selected conversation
  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);
  const selectedMessages = selectedConversationId 
    ? getConversationMessages(selectedConversationId) 
    : [];
  
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Business Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {userBusiness ? userBusiness.name : user.name}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">{MOCK_ANALYTICS.metrics.totalViews}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-royal/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-royal" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Inquiries</p>
                <p className="text-2xl font-bold">{MOCK_ANALYTICS.metrics.newInquiries}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-gold" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Response Rate</p>
                <p className="text-2xl font-bold">{MOCK_ANALYTICS.metrics.responseRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <User className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold">{MOCK_ANALYTICS.metrics.avgResponseTime}h</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visits</CardTitle>
                <CardDescription>
                  Number of times your profile was viewed last week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={MOCK_ANALYTICS.profileViews}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#1a56db"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Manage your conversations with potential clients
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
                          <h3 className="font-medium">
                            {selectedConversation?.businessId === userBusiness?.id 
                              ? "Client Chat" 
                              : "Chat"
                            }
                          </h3>
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default BusinessDashboard;
