'use client'
import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, FileText, DollarSign, Smartphone } from 'lucide-react';

const ProblemSolution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tired of juggling WhatsApp, notebooks, and cash flow?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tradeet replaces all that chaos with one powerful app designed specifically for African entrepreneurs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Before - The Chaos */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-600 mb-4">The Old Way: Scattered & Stressful</h3>
            </div>
            
            <div className="relative">
              {/* Chaotic Elements */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 transform -rotate-2">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium">WhatsApp Chats</div>
                      <div className="text-sm text-gray-600">Orders mixed with personal messages</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 transform rotate-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-medium">Paper Notebooks</div>
                      <div className="text-sm text-gray-600">Easy to lose, hard to search</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 transform -rotate-1">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-medium">Cash Confusion</div>
                      <div className="text-sm text-gray-600">No clear profit tracking</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stress indicators */}
              <div className="absolute -top-2 -right-2 text-red-500">
                <div className="animate-ping text-2xl">😫</div>
              </div>
            </div>
          </div>

          {/* After - The Solution */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#065637] mb-4">The Tradeet Way: Organized & Profitable</h3>
            </div>

            <div className="relative">
              {/* Clean Phone Interface */}
              <div className="bg-[#065637] p-6 rounded-2xl shadow-2xl max-w-sm mx-auto">
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">Tradeet Dashboard</h4>
                    <Smartphone className="w-5 h-5 text-[#065637]" />
                  </div>

                  {/* Organized Features */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium">Online Store</span>
                      <span className="text-xs text-green-600 font-bold">ACTIVE</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm font-medium">Inventory</span>
                      <span className="text-xs text-blue-600 font-bold">24 items</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">Wallet</span>
                      <span className="text-xs text-yellow-600 font-bold">₦125,400</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm font-medium">Analytics</span>
                      <span className="text-xs text-purple-600 font-bold">📈 +15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success indicators */}
              <div className="absolute -top-2 -right-2 text-green-500">
                <div className="animate-bounce text-2xl">🎉</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-[#065637] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#065637]/90 transition-all transform hover:scale-105">
            Experience the Difference - Try Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;