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
        title: "MSH Cultural Group Website",
        description: "The Constraint: Our NGO client needed an elegant, highly accessible platform, but the total cost of ownership (TCO) for five years had to be under $100 USD. The Win: We engineered the entire solution to prioritize extreme budget management and digital sustainability using ultra-low-cost deployment (GitHub Pages/Google Sites). We successfully delivered long-term operational stability and proved that impactful design doesn't require a complex infrastructure.",
        tags: ["Github Pages","Design","Google Sites"],
        imageSrc: mshcgDugapuja,
        link: "https://www.mshculturalgroup.com/",
        color: 'pink',
    },
    {
        id: 2,
        title: "Verve Photography",
        description: "The Rush: We delivered this high-performance, visually focused website for a freelancer over a single, intense weekend. What was special: The goal was to maintain industry-standard visual quality and SEO optimization while integrating a secure client login leveraging external cloud storage. This project showcases our technical precision and speed in balancing aesthetic demands with real-world performance under pressure.",
        tags: ["Github Pages","React","Vibe Code"],
        imageSrc: vervePhotography,
        link: "https://verve.photography/",
        color: 'cyan',
    },
    {
        id: 3,
        title: "FlyInDucks: Mobile Grocery Store",
        description: "The Opportunity: This was a comprehensive New Venture plan to disrupt the retail grocery market, recognized for its social impact and innovative solution to food deserts. This project was a deep dive into market research and business plan development. It highlights the ability to identify and frame highly impactful business opportunities through sharp analysis and compelling pitch deck design.",
        tags: ["Startup","Retail - Grocery","Canva"],
        imageSrc:flyinducksCover,
        link: "https://www.canva.com/design/DAFBcKjrpXk/HNVKeto_6JuylwREr0rlbA/view?utm_content=DAFBcKjrpXk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha14ffc2ddb",
        color: 'green',
    },
    {
        id: 4,
        title: "PocketLend: Mini P2P Loans for SMBs",
        description: "The Focus: This project centered on translating complex financial concepts (mini P2P loans for SMBs) into a streamlined, user-centric product. We built a fully functional high-fidelity Figma prototype, which serves as a complete functional specification blueprint. We used modern UI/UX design methods to provide full product clarity and technical vetting before committing any engineering resources.",
        tags: ["Fintech","Prototype","Figma"],
        imageSrc: pocketlendCover,
        link: "https://www.figma.com/design/KIEKC9WRZDZiMyb1b28iIY/FINE-6280-PocketLend?node-id=0-1&t=W3lN836VWYOmOury-1",
        color: 'purple',
    },
    {
        id: 5,
        title: "KareGranola: Healthy SEO Strategy",
        description: "The Process: We used specialized tools to conduct a full SEO audit, turning analytics into a clear growth strategy for a health food startup. We really enjoyed tackling this challenge because it required both strategic thinking and technical execution: all optimizations were implemented via direct code commits to GitHub, demonstrating the ability to execute technical changes securely at the code level without risking the live website.",
        tags: ["Startup","Food & Beverage","Marketing SEO"],
        imageSrc:karegranolaCover,
        link: "https://karegranola.com/",
        color: 'yellow'
    }
]

// --- EXPORT the data array ---
export default data;