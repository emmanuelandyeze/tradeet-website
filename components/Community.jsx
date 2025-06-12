'use client'

import React, { useEffect, useRef, useState } from 'react';
import { 
  Users, 
  Star, 
  Quote,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Heart,
  Award,
  TrendingUp
} from 'lucide-react';

const Community = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  const testimonials = [
    {
      name: "Adunni Okafor",
      business: "Beauty Supply Store",
      location: "Lagos, Nigeria",
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      text: "Before Tradeet, I was losing track of orders on WhatsApp and couldn't tell if I was making profit. Now I see everything clearly and my sales have doubled!",
      impact: "Sales doubled"
    },
    {
      name: "Kemi Adebayo",
      business: "Fashion Designer",
      location: "Abuja, Nigeria",
      image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      text: "The online store feature changed everything for me. I can now reach customers beyond my local market and the payment system works perfectly.",
      impact: "Expanded reach"
    },
    {
      name: "Samuel Nkomo",
      business: "Phone Accessories",
      location: "Port Harcourt, Nigeria",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      text: "Tradeet's inventory management saved my business. I never run out of popular items anymore and the AI suggestions help me stock better.",
      impact: "Better inventory"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="community" className="py-20 bg-gradient-to-br from-[#fcdbb8]/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#065637]/10 rounded-full px-4 py-2 text-sm font-medium text-[#065637] mb-4">
            <Heart className="w-4 h-4" />
            <span>Loved by Entrepreneurs</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Entrepreneurs Across Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a thriving community of business owners who are growing their income with Tradeet.
          </p>
        </div>

        {/* Trust Indicators Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-[#065637]" />
            </div>
            <div className="text-lg font-bold text-[#065637] mb-1">Growing Fast</div>
            <div className="text-gray-600 text-sm">Active Community</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-[#065637]" />
            </div>
            <div className="text-lg font-bold text-[#065637] mb-1">Success Stories</div>
            <div className="text-gray-600 text-sm">Real Results</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Award className="w-8 h-8 text-[#065637]" />
            </div>
            <div className="text-lg font-bold text-[#065637] mb-1">Nationwide</div>
            <div className="text-gray-600 text-sm">All States Covered</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Star className="w-8 h-8 text-[#065637]" />
            </div>
            <div className="text-lg font-bold text-[#065637] mb-1">Highly Rated</div>
            <div className="text-gray-600 text-sm">5-Star Reviews</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-[#065637] rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-8">
                {/* Stars */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#fcdbb8]"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-[#065637] font-medium">{testimonials[currentTestimonial].business}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
                    <div className="text-sm font-bold text-green-600">{testimonials[currentTestimonial].impact}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-[#065637] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-[#065637]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-[#065637] hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#065637] text-white rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">Join Our WhatsApp Community</span>
            </div>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Connect with fellow entrepreneurs, get business tips, and receive exclusive updates about new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#065637] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Join WhatsApp Group
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#065637] transition-all">
                Follow on Instagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;