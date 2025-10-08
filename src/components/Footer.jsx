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
                        
                        <div className="text-gray-700 space-y-3 text-base overflow-y-auto max-h-[60vh]">
                            {content}
                        </div>
                        
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

const privacyContent = (
    <>
        <p><strong>Data Collection:</strong> This website **does not collect, store, or process any personal user information, cookies, or tracking data.**</p>
        <p><strong>External Links:</strong> The only external links are to our scheduling service and email, which are not covered by this policy.</p>
        <p>Your privacy is simple and protected because we don't handle your data.</p>
    </>
);

const termsContent = (
    <>
        <p><strong>Service Focus:</strong> This website serves as an informational page to describe and promote our services.</p>
        <p><strong>Disclaimer:</strong> The information provided here is for general guidance only and does not constitute a contractual agreement. Formal service agreements are handled via direct communication.</p>
        <p>By using this site, you agree to these simple terms.</p>
    </>
);

const Footer = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);
    
    // 💡 FIX 1: REMOVED the fixed height class h-[20vh] md:h-[15vh].
    const FOOTER_HEIGHT_CLASS = 'py-6'; 
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-45'; 

    return (
        <>
            <footer 
                // 💡 FIX 2: Use natural padding (py-6) instead of fixed height
                className={`w-full relative text-white flex items-center justify-center text-center text-sm overflow-hidden ${FOOTER_HEIGHT_CLASS}`} 
                style={{ 
                    backgroundImage: `url('${FOOTER_BG_IMAGE_URL}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat', 
                    backgroundAttachment: 'fixed', 
                }}
            >
                <div className={DARK_OVERLAY_CLASS}></div>
                
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