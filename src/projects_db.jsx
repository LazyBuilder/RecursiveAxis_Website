// projects_db.jsx

// --- Import the images first to get the correct asset paths ---
import mshcgDugapuja from "./photos/mshcg-dugapuja.png";
import vervePhotography from "./photos/verve-photography.png";
import flyinducksCover from "./photos/flyinducks_cover.png";
import pocketlendCover from "./photos/pocketlend_cover.png";
import karegranolaCover from "./photos/karegranola_cover.png";
// -----------------------------------------------------------------

const data = [
    {
        id: 1,
        title: "MSH Cultural Group",
        description: "An elegant digital platform emphasizing **ultra-low-cost deployment** and simplified content management, specifically built for high accessibility and non-developer upkeep.",
        tags: ["Webpage","Design","Low Cost"],
        imageSrc: "./photos/mshcg-dugapuja.png",
        link: "https://www.mshculturalgroup.com/"
    },
    {
        id: 2,
        title: "Verve Photography",
        description: "High-performance website focusing on visual storytelling, SEO optimization, and a seamless client login experience for viewing and downloading private galleries.",
        tags: ["Webpage","React","Vibe Code"],
        imageSrc: "./photos/verve-photography.png",
        link: "https://www.vervephotography.com/"
    },
    {
        id: 3,
        title: "FlyInDucks: Mobile Grocery Store",
        description: "Mega plan to disrupt the retail grocery market with mobile grocery trucks to serve the inbetween grocery runs and fight food deserts.",
        tags: ["Startup","Retail - Grocery","Canva"],
        imageSrc: "./photos/flyinducks_cover.png",
        link: "https://www.canva.com/design/DAFBcKjrpXk/HNVKeto_6JuylwREr0rlbA/view?utm_content=DAFBcKjrpXk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha14ffc2ddb"
    },
    {
        id: 4,
        title: "PocketLend: Mini P2P Loans for SMBs",
        description: "Fully functional Figma prototype for a fintech startup idea focused on providing mini peer-to-peer loans to small and medium-sized businesses.",
        tags: ["Fintech","Prototype","Figma"],
        imageSrc: "./photos/pocketlend_cover.png",
        link: "https://www.figma.com/design/KIEKC9WRZDZiMyb1b28iIY/FINE-6280-PocketLend?node-id=0-1&t=W3lN836VWYOmOury-1"
    },
    {
        id: 5,
        title: "KareGranola: Healthy SEO Strategy",
        description: "Analysing and optimizing the SEO straregy for a health-focused granola startup to enhance online visibility and drive organic traffic.",
        tags: ["Startup","Food & Beverage","Marketing SEO"],
        imageSrc: "./photos/karegranola_cover.png",
        link: "https://karegranola.com/"
    }
]

// --- EXPORT the data array ---
export default data;