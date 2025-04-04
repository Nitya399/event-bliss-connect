
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">How EventBliss Connect Works</h1>
        
        <div className="max-w-3xl mx-auto space-y-12">
          {/* For Event Hosts */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Event Hosts</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
                  <p>Create an account as an Event Host to start browsing service providers</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
                  <p>Browse through our curated list of event service providers or use our AI assistant to find exactly what you need</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
                  <p>View detailed business profiles, compare pricing and services</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">4</span>
                  <p>Message businesses directly through our platform to discuss your requirements</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">5</span>
                  <p>Save your favorite businesses for future reference</p>
                </li>
              </ol>
            </div>
          </section>
          
          {/* For Service Providers */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Service Providers</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
                  <p>Register your business as a Service Provider to showcase your services</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
                  <p>Create a comprehensive profile with your services, pricing, and portfolio</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
                  <p>Receive inquiries from potential clients directly through our messaging system</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">4</span>
                  <p>Respond to client queries and build your client base</p>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">5</span>
                  <p>Track profile views and manage conversations from your business dashboard</p>
                </li>
              </ol>
            </div>
          </section>
          
          {/* AI Assistant */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our AI Assistant</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4">
                Our AI Assistant makes finding the right service provider easier than ever. Simply tell it what you need in natural language:
              </p>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <p className="italic">"I need a caterer in Ahmedabad under 50,000 rupees"</p>
                <p className="italic">"Find photographers in Mumbai for a wedding next month"</p>
                <p className="italic">"Show me decorators between 10,000 and 30,000 in Delhi"</p>
              </div>
              <p className="mb-4">
                The AI will understand your requirements and instantly show you matching businesses.
              </p>
              <p>
                Click the chat icon in the bottom-right corner of any page to start using the AI Assistant.
              </p>
            </div>
          </section>
          
          <div className="text-center pt-4">
            <Link to="/businesses">
              <Button size="lg">Start Exploring Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
