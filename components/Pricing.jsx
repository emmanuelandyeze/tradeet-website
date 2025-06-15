'use client'

import React, { useEffect, useRef, useState } from 'react';
import { 
  Check, 
  X, 
  Crown, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);
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

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      color: "border-gray-200",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      popular: false,
      features: [
        { name: "Basic online store", included: true },
        { name: "Up to 50 products", included: true },
        { name: "WhatsApp integration", included: true },
        { name: "Basic inventory tracking", included: true },
        { name: "Mobile app access", included: true },
        { name: "Community support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Marketing tools", included: false },
        { name: "AI assistant", included: false },
        { name: "Priority support", included: false }
      ]
    },
    {
      name: "Economy",
      price: "₦5,000",
      period: "per month",
      description: "For growing businesses",
      color: "border-[#065637] ring-2 ring-[#065637]",
      buttonColor: "bg-[#065637] hover:bg-[#065637]/90",
      popular: true,
      features: [
        { name: "Everything in Starter", included: true },
        { name: "Unlimited products", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Marketing tools", included: true },
        { name: "Bulk operations", included: true },
        { name: "Export reports", included: true },
        { name: "Email support", included: true },
        { name: "AI assistant", included: false },
        { name: "Custom branding", included: false },
        { name: "API access", included: false }
      ]
    },
    {
      name: "Pro",
      price: "₦12,000",
      period: "per month",
      description: "Full automation & AI",
      color: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      popular: false,
      features: [
        { name: "Everything in Economy", included: true },
        { name: "AI business assistant", included: true },
        { name: "Auto inventory alerts", included: true },
        { name: "Advanced automation", included: true },
        { name: "Custom branding", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced integrations", included: true },
        { name: "Multi-location support", included: true },
        { name: "Dedicated account manager", included: true }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#065637]/10 rounded-full px-4 py-2 text-sm font-medium text-[#065637] mb-4">
            <Star className="w-4 h-4" />
            <span>Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features to help you succeed.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[#065637] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 ${
                plan.color
              } ${
                hoveredPlan === index ? 'shadow-2xl scale-105' : 'shadow-lg'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period !== "Forever" && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  
                  {plan.period === "Forever" && (
                    <div className="text-green-600 font-medium">No credit card required</div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 min-w-[20px]" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 min-w-[20px]" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  plan.buttonColor
                } text-white`}>
                  <span>{plan.price === "Free" ? "Start Free" : "Upgrade Now"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Money back guarantee */}
                {plan.price !== "Free" && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    30-day money-back guarantee
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-[#065637]" />
              <span className="text-lg font-semibold text-[#065637]">Need Something Custom?</span>
            </div>
            <p className="text-gray-600 mb-6">
              Have specific requirements? We offer custom solutions for large businesses and enterprise clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border-2 border-[#065637] text-[#065637] px-6 py-3 rounded-lg font-medium hover:bg-[#065637] hover:text-white transition-all">
                Contact Sales
              </button>
              <button className="text-[#065637] font-medium hover:underline">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;