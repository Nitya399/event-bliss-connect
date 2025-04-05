
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import AIAssistant from '@/components/assistant/AIAssistant';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* AI Assistant floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsAssistantOpen(true)}
          size="lg"
          className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all bg-royal text-white"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>
      
      {/* AI Assistant Dialog */}
      <AIAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
    </div>
  );
};

export default Layout;
