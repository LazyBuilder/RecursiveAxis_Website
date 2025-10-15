// src/components/Footer.jsx (CORRECTED)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './UIMain'; 

// --- START: SimpleModal Component Definition ---
const SimpleModal = ({ title, content, isOpen, onClose }) => {
    // Content animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full m-4 relative"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-2">{title}</h3>
                        
                        <div className="text-gray-700 space-y-3 text-base overflow-y-auto max-h-[60vh] py-2">
                            {/* Render content, respecting newlines as paragraphs */}
                            {content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className={`mt-6 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-80`}
                            style={{ backgroundColor: colors.primary, color: colors.dark }}
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- END: SimpleModal Component Definition ---


// --- START: Modal Content Definitions ---
const privacyContent = `
**Privacy Policy**

1. **Information We Collect:** We only collect the necessary information you provide directly through contact forms or scheduling tools (like Cal.com). This typically includes your name, email address, and details about your project.

2. **Use of Information:** Your information is used solely to respond to your inquiries, schedule calls, and communicate about potential or current projects. We do not sell or rent your personal data to third parties.

3. **Data Security:** We employ standard security measures to protect your information. Please note that no transmission over the internet is 100% secure.

4. **Cookies and Tracking:** We do not use third-party tracking cookies on this site. We rely on standard browser storage for necessary functional purposes only.
`;

const termsContent = `
**Terms of Service**

1. **Acceptance of Terms:** By accessing and using this website, you agree to be bound by these Terms of Service.

2. **Services Offered:** Recursive Axis offers technology consulting, design, and development services as outlined in the Services section. All engagements are subject to a separate, formal contract.

3. **Intellectual Property:** All content on this site, including text, graphics, logos, and code, is the property of Recursive Axis and protected by copyright law. Unauthorized use is prohibited.

4. **Limitation of Liability:** Recursive Axis is not liable for any damages arising from the use or inability to use the materials on this site.
`;
// --- END: Modal Content Definitions ---

// Tailwind class for the subtle background overlay at the footer
const OVERLAY_CLASS = `absolute inset-0 bg-[#0a0a0a] opacity-80 backdrop-blur-sm`;


const Footer = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    return (
        <>
            {/* The footer is a fixed height element inside ContactCTA, sitting at the bottom */}
            <footer className="w-full bg-[#0a0a0a] text-white text-center py-6 text-sm relative z-20 mt-auto">
                
                {/* Visual Overlay - Optional: for aesthetic consistency */}
                <div className={OVERLAY_CLASS}></div>
                
                <div className="relative z-10 w-full px-4"> 
                    <p>© {new Date().getFullYear()} Recursive Axis. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors underline">
                            Privacy Policy
                        </button>
                        <button onClick={() => openModal('terms')} className="hover:text-white transition-colors underline">
                            Terms of Service
                        </button>
                    </div>
                </div>
            </footer>

            {/* Modal Rendering */}
            <AnimatePresence>
                {activeModal === 'privacy' && (
                    <SimpleModal
                        title="Simple Privacy Policy"
                        content={privacyContent}
                        isOpen={true}
                        onClose={closeModal}
                    />
                )}
                {activeModal === 'terms' && (
                    <SimpleModal
                        title="Simple Terms of Service"
                        content={termsContent}
                        isOpen={true}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Footer;