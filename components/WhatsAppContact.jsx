// components/WhatsAppContact.jsx
'use client'; // This directive marks it as a Client Component

import React, { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link'; // Not strictly needed here, but good practice if you ever link internally

const WhatsAppContact = ({ storeData }) => {
    const [isExpanded, setIsExpanded] = useState(false); // useState is now correctly used in a client component

    if (!storeData?.phone) {
        return null; // Don't render if there's no phone number
    }

    const whatsappLink = `https://wa.me/${storeData.phone.replace(/\+/g, '')}`; // Ensure + is handled for WhatsApp

    return (
        <div className="fixed bottom-28 md:bottom-20 right-7 md:right-10 z-50">
            <div
                className={`relative transition-all duration-300 ease-in-out
                            ${isExpanded ? 'w-auto' : 'w-14 h-14'}`} // Dynamic sizing based on expansion
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Collapsed icon */}
                {!isExpanded && (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-full shadow-lg text-white transition-all duration-300 transform scale-100 hover:scale-105"
                        style={{ backgroundColor: storeData?.themeColor || '#25D366' }} // Use store theme or WhatsApp green
                        aria-label="Chat on WhatsApp"
                    >
                        <BsWhatsapp size={28} />
                    </a>
                )}

                {/* Expanded content */}
                {isExpanded && (
                    <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center gap-3 animate-fade-in-up">
                        <p className="text-sm text-gray-600 mb-2 text-center max-w-xs">
                            Got any enquiries or questions? Chat with us!
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white flex items-center justify-center gap-2 p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 w-full"
                        >
                            <BsWhatsapp size={20} />
                            <span className="font-semibold text-sm">Chat Now</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsAppContact;