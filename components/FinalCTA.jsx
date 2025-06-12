'use client'
import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Users, 
  Smartphone,
  Star,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

const FinalCTA = () => {
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[#065637] to-[#065637]/90 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#fcdbb8]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-[#fcdbb8]/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>Ready to Transform Your Business?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Start Growing Smarter with 
                <span className="text-[#fcdbb8] block">Tradeet Business</span>
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Whether you sell products or services, Tradeet helps you manage, sell, and scale—right from your phone. 
                Join thousands of entrepreneurs already growing with us.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Free to start</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Setup in minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Loved by users</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Bank-level security</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-white text-[#065637] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-3">
                <Download className="w-6 h-6" />
                <span>Download App Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#065637] transition-all flex items-center justify-center space-x-3">
                <Users className="w-6 h-6" />
                <span>Join Community</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-5 h-5 text-[#fcdbb8]" />
                </div>
                <div className="text-sm text-white/70">Growing Community</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Shield className="w-5 h-5 text-[#fcdbb8]" />
                </div>
                <div className="text-sm text-white/70">Secure & Trusted</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-5 h-5 text-[#fcdbb8]" />
                </div>
                <div className="text-sm text-white/70">5-Star Rated</div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Phone */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mx-auto max-w-sm">
              {/* Main Phone */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* Screen Content */}
                  <div className="bg-gradient-to-br from-[#065637] to-[#065637]/80 p-6 text-white">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">Welcome to Tradeet!</h4>
                        <p className="text-sm opacity-90">Your business, simplified</p>
                      </div>
                      <button className="bg-white text-[#065637] px-6 py-2 rounded-lg font-semibold text-sm">
                        Get Started
                      </button>
                    </div>
                  </div>
                  
                  {/* App Preview */}
                  <div className="p-4 bg-gray-50">
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
                        <span className="font-bold">Today's Sales</span>
                        <span className="text-green-600 font-bold">₦25,400</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
                        <span className="text-sm font-medium">New Orders</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
                        <span className="text-sm font-medium">Products</span>
                        <span className="text-gray-600 text-sm">24 items</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Success Elements */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-bounce">
                <div className="text-sm font-bold">+₦15K</div>
                <div className="text-xs">New Sale!</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-pulse">
                <div className="text-sm font-bold">📱</div>
                <div className="text-xs">Order via WhatsApp</div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-purple-500 text-white p-2 rounded-lg shadow-lg animate-bounce delay-500">
                <div className="text-xs font-bold">Live!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Join thousands of African entrepreneurs who have transformed their businesses with Tradeet. 
            No setup fees, no long-term contracts, and cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;