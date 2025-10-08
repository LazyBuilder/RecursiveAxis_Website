// src/components/ContactCTA.jsx

import React, { useState } from 'react'; // 💡 IMPORTED useState
import { motion, AnimatePresence } from 'framer-motion'; // 💡 IMPORTED AnimatePresence
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
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-2">{title}</h3>
                        
                        {/* Legal Content */}
                        <div className="text-gray-700 space-y-3 text-base">
                            {content}
                        </div>
                        
                        {/* Close Button */}
                        <button
                            className={`mt-6 w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg transition hover:bg-gray-300`}
                            onClick={onClose}
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


// --- START: Footer Component Definition ---
const FOOTER_BG_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`; 

// Footer now accepts props to handle modal clicks
const Footer = ({ openModal }) => {
    const FOOTER_HEIGHT_CLASS = 'h-[20vh]'; 
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-25'; 

    return (
        <footer 
            className={`w-full relative text-white flex items-center justify-center text-center text-sm overflow-hidden ${FOOTER_HEIGHT_CLASS}`} 
            style={{ 
                backgroundImage: `url('${FOOTER_BG_IMAGE_URL}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={DARK_OVERLAY_CLASS}></div>
            
            <div className="relative z-10 p-4 w-full px-4"> 
                <p>© {new Date().getFullYear()} Recursive Axis. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    {/* 💡 CHANGE: Use buttons and click handlers instead of <a> tags */}
                    <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors">
                        Privacy Policy
                    </button>
                    <button onClick={() => openModal('terms')} className="hover:text-white transition-colors">
                        Terms of Service
                    </button>
                </div>
            </div>
        </footer>
    );
}
// --- END: Footer Component Definition ---


const ContactCTA = React.forwardRef((props, ref) => {
    // 💡 NEW STATE: Tracks which modal is open ('privacy', 'terms', or null)
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);
    
    // --- LEGAL TEXT CONTENT ---
    const privacyContent = (
        <>
            <p><strong>Data Collection:</strong> This is a simple, single-page service website and **does not collect, store, or process any personal user information, cookies, or tracking data.**</p>
            <p><strong>External Links:</strong> The only external links are to our scheduling service (Cal.com) and email, which are not covered by this policy.</p>
            <p>Your privacy is simple and protected because we don't handle your data.</p>
        </>
    );

    const termsContent = (
        <>
            <p><strong>Service Focus:</strong> This website serves as an informational page to describe and promote our digital development and consulting services.</p>
            <p><strong>Disclaimer:</strong> The information provided here is for general guidance only and does not constitute a contractual agreement. Formal service agreements are handled via direct communication.</p>
            <p>By using this site, you agree to these simple terms.</p>
        </>
    );

    // ... (CSS for glowing button, removed for brevity, assume it's in App.jsx) ...

    return (
        <section 
            id="contact" 
            ref={ref} 
            className="min-h-screen text-gray-800 flex flex-col justify-between" 
        >
            
            {/* Main content container for CTA */}
            <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-20"> 
                
                {/* Pulsing Background - Sits behind everything */}
                {/* 💡 IMPORTANT: Assumes you have created the pulsing background div as discussed */}
                <div className="absolute inset-0 bg-radiant-pulse" />

                {/* 1. Animated Title */}
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    SIGN-UP FOR DISCOVERY CALL, NOW.
                </motion.h2>

                {/* 2. Subtext (static) */}
                <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8`}>
                    Lets put some life to your vision and see the results.
                </p>

                {/* 3. Button and Urgency Text */}
                <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                    
                    <p className="text-sm font-bold tracking-widest uppercase text-red-500">
                        Limited Spots
                    </p>

                    <div 
                        className={`glowing-button p-[2px] rounded-full transition-all duration-300 hover:scale-[1.05]`}
                        style={{ background: colors.primary }}
                    >
                        <a
                          href="https://cal.com/asitdeva"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-12 py-5 bg-white text-black text-xl font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 transform-gpu`}
                        >
                          Reserve Your Slot Right Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer is completely separate and static. Pass openModal handler. */}
            <Footer openModal={openModal} />

            {/* 💡 NEW: Modal Rendering */}
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
        </section>
    );
});

export default ContactCTA;