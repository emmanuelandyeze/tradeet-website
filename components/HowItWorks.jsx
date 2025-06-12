'use client'

import React, { useEffect, useRef, useState } from 'react';
import { 
  UserPlus, 
  Plus, 
  ShoppingCart, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up Free",
      description: "Create your account in under 2 minutes. No credit card required.",
      color: "bg-blue-500",
      details: ["Phone number verification", "Basic business info", "Choose your store name"]
    },
    {
      icon: Plus,
      title: "Add Products",
      description: "Upload photos, set prices, and organize your inventory easily.",
      color: "bg-green-500",
      details: ["Photo upload", "Price setting", "Category organization"]
    },
    {
      icon: ShoppingCart,
      title: "Start Selling",
      description: "Share your store link or sell directly through WhatsApp.",
      color: "bg-purple-500",
      details: ["Share store link", "WhatsApp integration", "Take orders instantly"]
    },
    {
      icon: TrendingUp,
      title: "Track & Grow",
      description: "Monitor sales, manage finances, and scale your business.",
      color: "bg-orange-500",
      details: ["Real-time analytics", "Financial tracking", "Growth insights"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From signup to your first sale in minutes. No technical skills required.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-[#065637] transition-all duration-1000 ease-out"
              style={{ width: isVisible ? `${((activeStep + 1) / 4) * 100}%` : '0%' }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isCompleted = activeStep > index;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Step Card */}
                  <div className={`relative bg-white p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-[#065637] shadow-2xl transform scale-105' 
                      : isCompleted
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-[#065637]/30'
                  }`}>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500'
                          : isActive
                          ? step.color
                          : 'bg-gray-200'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        )}
                      </div>
                      <div className={`text-2xl font-bold transition-colors ${
                        isActive ? 'text-[#065637]' : 'text-gray-300'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${
                      isActive ? 'text-[#065637]' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>

                    {/* Details (shown when active) */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#065637] rounded-full"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow for desktop */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className={`w-6 h-6 transition-colors ${
                          isCompleted ? 'text-green-500' : isActive ? 'text-[#065637]' : 'text-gray-300'
                        }`} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <button className="group bg-[#065637] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#065637]/90 transition-all transform hover:scale-105 flex items-center space-x-3">
              <span>Start Your Journey Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-500 mt-2">Free forever • No setup fees • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;