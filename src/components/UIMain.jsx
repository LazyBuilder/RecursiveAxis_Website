// src/components/UIMain.jsx

import React from 'react';

// Define the global color palette used throughout the application
const colors = {
    primary: '#00EAFF', // Bright Cyan/Aqua
    secondary: '#FF00EA', // Bright Magenta/Pink
    dark: '#1a1a1a', // Near-Black Text/Background
    light: '#f7f7f7', // Near-White Background
    gray: '#6b7280', // Tailwind Gray 500 equivalent for subtler text
};

// --- MODIFIED LogoSVG to use the PNG image ---
// This component now renders an <img> tag pointing to the public/assets folder.
const LogoSVG = () => {
    // Reference the image directly from the public/assets folder
    const logoPath = "/assets/StorylineDS_Logo_NoBackground_AccentColor.png"; 

    return (
        <img 
            src={logoPath} 
            alt="Storyline Digital Services Logo" 
            className="h-8 w-auto" // Tailwind classes for sizing (adjust 'h-8' as needed)
        />
    );
};

export { colors, LogoSVG };