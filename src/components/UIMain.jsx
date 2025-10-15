// src/components/UIMain.jsx (FIXED: Includes Logo and necessary Service Icons)

import React from 'react';
// Import icons needed for the placeholder service cards
import { FaCode, FaBrush, FaDatabase } from 'react-icons/fa';

// Define the global color palette used throughout the application
const colors = {
    primary: '#00EAFF', // Bright Cyan/Aqua
    secondary: '#FF00EA', // Bright Magenta/Pink
    dark: '#1a1a1a', // Near-Black Text/Background
    light: '#f7f7f7', // Near-White Background
    gray: '#6b7280', // Tailwind Gray 500 equivalent for subtler text
};

// --- LOGO COMPONENT (Uses the PNG from public/assets) ---
const LogoSVG = () => {
    // Reference the image directly from the public/assets folder
    const logoPath = `${process.env.PUBLIC_URL}/assets/StorylineDS_Logo_NoBackground_AccentColor.png`; 

    return (
        <img 
            src={logoPath} 
            alt="Recursive Axis Digital Services Logo" 
            className="h-12 w-auto" // Tailwind classes for sizing
        />
    );
};

// --- SERVICE ICON COMPONENTS (Placeholder Fixes for Build Error) ---

// Component for "Code Excellence"
const CodeSVG = () => (
    <div className="p-4 rounded-xl shadow-lg flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
        <FaCode size={30} className="text-white" />
    </div>
);

// Component for "Intuitive Design"
const DesignSVG = () => (
    <div className="p-4 rounded-xl shadow-lg flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
        <FaBrush size={30} className="text-white" />
    </div>
);

// Component for "Data-Driven Insights"
const DataSVG = () => (
    <div className="p-4 rounded-xl shadow-lg flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
        <FaDatabase size={30} className="text-white" />
    </div>
);


// EXPORT all required components and constants
export { 
    colors, 
    LogoSVG,
    CodeSVG,      // Exported to fix the "Attempted import error"
    DesignSVG,    // Exported for the same reason
    DataSVG,      // Exported for the same reason
};