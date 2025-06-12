'use client'
import React, { useEffect, useRef, useState } from 'react';
import { 
  Store, 
  Package, 
  Wallet, 
  MessageSquare, 
  BarChart3, 
  Bot,
  CheckCircle,
  Globe,
  Zap
} from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Store,
      title: "Free Online Store",
      description: "Get your custom subdomain (storename.tradeet.ng) and start selling online instantly",
      color: "bg-blue-500",
      delay: 0
    },
    {
      icon: Package,
      title: "Smart Inventory",
      description: "Track stock levels, get low-stock alerts, and never run out of popular items",
      color: "bg-green-500",
      delay: 100
    },
    {
      icon: Wallet,
      title: "Business Wallet",
      description: "Receive payments directly via virtual accounts powered by Paystack",
      color: "bg-purple-500",
      delay: 200
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description: "Sell directly through WhatsApp - no API needed, works with your existing number",
      color: "bg-green-600",
      delay: 300
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get insights on best-selling products, profit margins, and customer behavior",
      color: "bg-yellow-500",
      delay: 400
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Get marketing tips, auto-replies, and business recommendations tailored to you",
      color: "bg-indigo-500",
      delay: 500
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#fcdbb8]/20 rounded-full px-4 py-2 text-sm font-medium text-[#065637] mb-4">
            <Zap className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Run Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From selling to tracking, managing to growing - Tradeet has all the tools African entrepreneurs need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 transition-all duration-300 ${
                    hoveredFeature === index ? 'scale-110 rotate-6' : ''
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#065637] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-[#065637] transition-opacity duration-300 ${
                    hoveredFeature === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>

                  {/* Check mark for hover */}
                  <div className={`absolute top-4 right-4 transition-all duration-300 ${
                    hoveredFeature === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <CheckCircle className="w-6 h-6 text-[#065637]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#fcdbb8]/20 to-[#065637]/10 rounded-2xl p-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Globe className="w-6 h-6 text-[#065637]" />
              <span className="text-lg font-semibold text-[#065637]">Works Everywhere in Africa</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're in Lagos, Accra, Nairobi, or anywhere across the continent, 
              Tradeet adapts to your local market and payment methods.
            </p>
            <button className="bg-[#065637] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#065637]/90 transition-all transform hover:scale-105">
              Start Your Free Store Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;