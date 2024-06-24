import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

interface TestimonialProps {
  name: string;
  company: string;
  children: React.ReactNode;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, company, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <p className="italic mb-4">"{children}"</p>
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-400">{company}</p>
  </div>
);

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img src="/ufo.png" alt="MotherShip Logo" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Custom GPT Assistants on Telegram</h1>
          <p className="text-xl mb-8">Create and share personalized AI assistants with ease. No coding required.</p>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg inline-block transition-colors">
            Start 7-Day Free Trial
          </Link>
          <p className="mt-4 text-gray-400">No credit card required</p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card title="Easy Setup">
            <p>Launch your custom GPT in minutes with our no-code platform.</p>
          </Card>
          <Card title="Share with Friends">
            <p>Invite others to use your AI assistant on Telegram.</p>
          </Card>
          <Card title="Affordable Plans">
            <p>$10/month per bot with included OpenAI credits after your trial.</p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Sign up for a MotherShip account",
              "Create your custom GPT assistant",
              "Connect it to Telegram",
              "Share with friends and start chatting!"
            ].map((step, index) => (
              <div key={index}>
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial name="Alex Johnson" company="TechStart Inc.">
              MotherShip made it incredibly easy to deploy our custom AI assistant. Our team productivity skyrocketed!
            </Testimonial>
            <Testimonial name="Sarah Lee" company="Creative Solutions">
              The ability to share our AI with clients on Telegram has been a game-changer for our business.
            </Testimonial>
            <Testimonial name="Mike Brown" company="Data Insights Co.">
              Affordable, powerful, and user-friendly. MotherShip is everything we needed in an AI platform.
            </Testimonial>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Simple, Transparent Pricing</h2>
          <p className="text-xl mb-4">$10/month per bot after your 7-day free trial</p>
          <p className="mb-8">Includes 100 OpenAI API credits monthly. Additional credits available at cost.</p>
          <Link to="/pricing" className="text-blue-400 hover:underline">View detailed pricing</Link>
        </div>

        {/* FAQ Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card title="What is MotherShip?">
              <p>MotherShip is a platform that allows you to create and deploy custom GPT assistants on Telegram without any coding knowledge.</p>
            </Card>
            <Card title="How does the free trial work?">
              <p>You get full access to all features for 7 days. No credit card required. Cancel anytime.</p>
            </Card>
            <Card title="Can I customize my AI assistant?">
              <p>Yes! You can train your AI on custom data and set specific behaviors and responses.</p>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-blue-400 hover:underline">View all FAQs</Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your AI Assistant?</h2>
          <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg inline-block transition-colors">
            Get Started Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;