'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const Faq = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(0);
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

  const faqs = [
    {
      question: "How do I sell on WhatsApp with Tradeet?",
      answer: "Tradeet integrates seamlessly with your existing WhatsApp number. When customers message you, you can quickly add their orders to your Tradeet system, track inventory, and send professional invoices. No WhatsApp API needed - it works with your regular WhatsApp account."
    },
    {
      question: "Do I need a registered business to use Tradeet?",
      answer: "Not at all! Tradeet is perfect for informal traders, small business owners, and anyone selling products or services. Whether you're a hairstylist, fashion designer, or selling from home, you can start using Tradeet immediately."
    },
    {
      question: "Can I receive payments through the app?",
      answer: "Yes! Tradeet provides you with virtual bank accounts powered by Paystack. Your customers can pay directly to these accounts, and the money goes straight to your Tradeet wallet. You can then transfer to your main bank account anytime."
    },
    {
      question: "What's included in the Free plan?",
      answer: "The Free plan includes your online store, up to 50 products, WhatsApp integration, basic inventory tracking, mobile app access, and community support. It's perfect for getting started and testing the platform."
    },
    {
      question: "How does the online store work?",
      answer: "You get a custom subdomain (like yourstore.tradeet.ng) where customers can browse and buy your products. The store is mobile-optimized and includes features like product galleries, customer reviews, and secure checkout."
    },
    {
      question: "Is my data secure with Tradeet?",
      answer: "Absolutely! We use bank-level security encryption, secure data centers, and follow international security standards. Your business data and customer information are completely protected."
    },
    {
      question: "Can I use Tradeet if I'm not tech-savvy?",
      answer: "Yes! Tradeet is designed for everyone, regardless of technical skills. The interface is simple and intuitive, with helpful guides and tutorials. Plus, our community support helps you get started quickly."
    },
    {
      question: "What happens if I want to cancel?",
      answer: "You can cancel your subscription anytime from your account settings. If you're on a paid plan, you'll continue to have access until the end of your billing period. Your data remains safe and you can reactivate anytime."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#fcdbb8]/20 rounded-full px-4 py-2 text-sm font-medium text-[#065637] mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about getting started with Tradeet Business.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="min-w-[24px]">
                    {openQuestion === index ? (
                      <ChevronUp className="w-6 h-6 text-[#065637]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  openQuestion === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#fcdbb8]/20 to-[#065637]/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team and community are here to help you succeed. Get answers, tips, and connect with other entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#065637] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#065637]/90 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-[#065637] text-[#065637] px-8 py-4 rounded-xl font-semibold hover:bg-[#065637] hover:text-white transition-all">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;