// src/data/services.js
import { HardHat, ShieldCheck, Building } from 'lucide-react';

export const SERVICE_DATA = [
  {
    segment: "Founders & Startups",
    slug: "founder",
    icon: HardHat,
    headline: "BUILD DISCIPLINED VENTURES",
    body: "Stop fighting the odds of startup failure. We solve the problem of uncertainty by taking projects from idea to market (0 to 1) with disciplined focus. We replace guesswork with a conclusive path forward to accelerate your Product-Market Fit.",
    tagline: "CONTROLLED CHAOS",
    modalTitle: "Product Strategy & Tech Advisory",
    serviceItems: [
        {
          name: "PMF Acceleration Strategy",
          question: "How do we accelerate product-market fit?",
          description: "A disciplined approach to finding the shortest path to a viable, scalable business model.",
          details: [
            "Market hypothesis mapping to identify high-leverage opportunities.",
            "Design and execution of rapid, low-cost experimentation cycles.",
            "Implementation of rigorous user feedback loops and data analytics.",
            "Definition of core North Star metrics to track real growth."
          ]
        },
        {
          name: "Interim CPO/CTO Advisory",
          question: "Who can provide battle-tested leadership without permanent risk?",
          description: "World-class strategic leadership to steer your product and engineering teams during critical growth phases.",
          details: [
            "Development of a high-level product vision and actionable execution strategy.",
            "Direct leadership of engineering teams to ensure quality and velocity.",
            "Technical architecture design for scalability and future-proofing.",
            "Selection and management of critical technology vendors and partners."
          ]
        },
        {
          name: "Actionable Tech Roadmaps",
          question: "What is the most efficient path to our technical goals?",
          description: "Turning vague visions into a concrete, phased engineering plan that maximizes ROI.",
          details: [
            "Detailed infrastructure scaling plans to handle growth without crashes.",
            "Rigorous feature prioritization based on business value vs. effort.",
            "Definition of security and compliance standards from day one.",
            "Establishment of predictable release cycles and deployment pipelines."
          ]
        },
        {
          name: "Technical Debt Reduction",
          question: "How do we stabilize our platform for investment?",
          description: "Cleaning up the 'quick and dirty' early-stage code to create a robust, investable asset.",
          details: [
            "Comprehensive codebase audit to identify critical stability bottlenecks.",
            "Phased refactoring plan to eliminate fragile architectural patterns.",
            "Implementation of automated testing and CI/CD to prevent regressions.",
            "Detailed technical documentation to reduce key-person risk."
          ]
        },
        {
          name: "Due-Diligence Preparation",
          question: "Are our tech assets ready for auditor scrutiny?",
          description: "Ensuring your technology stands up to the most rigorous investor scrutiny.",
          details: [
            "Complete inventory and audit of all technical assets and IP.",
            "Identification and remediation of high-risk technical vulnerabilities.",
            "Creation of a 'Technical Data Room' for investor transparency.",
            "Security posture review and implementation of industry-standard controls."
          ]
        },
    ],
    modalBulletPoints: [
      "PMF Acceleration Strategy: Strategic planning powered by logical experimentation and data-driven decision-making.",
      "Interim CPO/CTO Advisory: World-class, battle-tested leadership without the permanent hiring risk.",
      "Actionable Tech Roadmaps: Scalable system design, deployment architecture, and maintenance strategies.",
      "Technical Debt Reduction: Audits and remediation plans to stabilize platforms and prepare for investment.",
      "Due-Diligence Preparation: Prepare tech assets for investor/auditor scrutiny."
    ],
    modalCta: "Book a Strategy Session",
    ctaLink: "https://cal.com/asitdeva/founders"
  },
  {
    segment: "Investors & Private Equity",
    slug: "investor",
    icon: ShieldCheck,
    headline: "DE-RISK YOUR TECH INVESTMENTS",
    body: "Eliminate the risk of investing in the wrong technology. We solve the problem of market uncertainty by providing deep technical certainty for emerging tech. We transform complex technical details into clear, trustworthy signals for confident investment decisions.",
    tagline: "CLEAR & CONFIDENT DECISIONS",
    modalTitle: "Technical Due Diligence & Portfolio Design",
    serviceItems: [
        {
          name: "Technical Due Diligence (AI & Software)",
          question: "Is the technology viable and execution capability real?",
          description: "An unbiased, deep-dive review of the software and AI assets of a target company.",
          details: [
            "Deep-dive code review to verify claims of proprietary technology.",
            "Architecture scalability check to ensure the system can grow with the business.",
            "Security vulnerability scanning and risk assessment of the stack.",
            "Assessment of the engineering team's capability and execution history."
          ]
        },
        {
          name: "Portfolio De-Risking Analysis",
          question: "What is our real value and defensive strategy?",
          description: "Analyzing the technical synergy and risk profile across multiple portfolio companies.",
          details: [
            "Technical stack diversification audit to avoid systemic platform risks.",
            "Mapping of critical dependencies across the portfolio for risk mitigation.",
            "Comparative performance benchmarking against industry leaders.",
            "Development of a consolidated technical risk-mitigation roadmap."
          ]
        },
        {
          name: "AI Strategy Consulting & Training",
          question: "How do we make data-backed investment decisions in AI?",
          description: "Empowering investors with the technical know-how to evaluate emerging AI technologies.",
          details: [
            "Assessment of AI capability: distinguishing 'wrapper' apps from core IP.",
            "Recommendation of a modern AI tooling and infrastructure stack.",
            "Design of an AI governance framework for responsible deployment.",
            "Implementation of a technical vetting process for AI-driven startups."
          ]
        },
        {
          name: "Valuation Strategy & Risk Mitigation",
          question: "How do we mitigate critical technical risks post-acquisition?",
          description: "Aligning technical reality with financial valuation to prevent overpayment.",
          details: [
            "Quantitative technical asset valuation based on maintainability and scale.",
            "Estimation of future-state costs for necessary technical overhauls.",
            "Identification of 'hidden' liabilities in the codebase or infrastructure.",
            "Creation of a post-acquisition technical integration strategy."
          ]
        },
        {
          name: "Exit Readiness Audits",
          question: "Is the tech stack optimized for maximum valuation?",
          description: "Preparing a portfolio company for a high-value exit through technical optimization.",
          details: [
            "Comprehensive technical audit to identify valuation-reducing flaws.",
            "Optimization of the tech stack for maximum buyer appeal.",
            "Cleanup of technical documentation and IP ownership records.",
            "Verification of the technical value proposition through independent testing."
          ]
        },
    ],
    modalBulletPoints: [
      "Technical Due Diligence (AI & Software): Deep, unbiased review of AI assets, software viability, and execution capability across the portfolio.",
      "Portfolio De-Risking Analysis: Deep analysis for technology diversification—your real value and defensive strategy.",
      "AI Strategy Consulting & Training: Upskilling and tech know-how for new technologies to make better, data-backed investment decisions.",
      "Valuation Strategy & Risk Mitigation: Identify and mitigate critical technical risks post-acquisition.",
      "Exit Readiness Audits: Ensuring tech stack is optimized for maximum valuation."
    ],
    modalCta: "Request Due Diligence Scope",
    ctaLink: "https://cal.com/asitdeva/investors"
  },
  {
    segment: "Corporates & Enterprise",
    slug: "innovation",
    icon: Building,
    headline: "INNOVATE LIKE A STARTUP",
    body: "Stop letting corporate bureaucracy kill innovation. We solve the problem of slow execution by designing programs that allow enterprises to move with startup speed. We help your teams handle uncertainty and achieve reliable, scalable outcomes.",
    tagline: "EFFECTIVE INNOVATION",
    modalTitle: "Innovation Programs & Acquisition Vetting",
    serviceItems: [
        {
          name: "Innovation Program Design",
          question: "How can we move with startup speed inside a corporate structure?",
          description: "Designing internal ecosystems that foster rapid experimentation and scalable growth.",
          details: [
            "Design of a 'Venture Studio' model to incubate internal high-impact ideas.",
            "Establishment of an ideation framework to filter for high-leverage problems.",
            "Creation of rapid prototyping pipelines for fast failure and learning.",
            "Implementation of governance models that balance agility with corporate risk."
          ]
        },
        {
          name: "Tech Maturity Evaluation",
          question: "What is our team's current capability and how do we advance?",
          description: "A detailed analysis of technical capabilities and a phased roadmap for advancement.",
          details: [
            "Skill gap analysis of the current engineering and product teams.",
            "Audit of existing tooling and infrastructure for innovation bottlenecks.",
            "Benchmarking of technical maturity against industry-leading enterprises.",
            "Creation of customized learning paths and capability development plans."
          ]
        },
        {
          name: "Acquisition Technical Vetting",
          question: "Is this target acquisition technically sound and strategic?",
          description: "Exhaustive technical analysis of potential strategic acquisitions to avoid 'buyer's remorse'.",
          details: [
            "Deep technical audit of the target's core IP and system architecture.",
            "Cultural-technical fit analysis to assess integration ease.",
            "Complexity study of the proposed technical integration roadmap.",
            "Verification of asset viability and technical sustainability."
          ]
        },
        {
          name: "Strategic Roadmap Consulting",
          question: "How do we navigate digital transformation?",
          description: "Guidance through large-scale organizational shifts and technology migrations.",
          details: [
            "Development of a phased digital transformation roadmap.",
            "Strategic planning for the migration of legacy systems to modern stacks.",
            "Direct C-suite advisory on CPO/CTO organizational structure.",
            "Scaling of technical capabilities to support global expansion."
          ]
        },
        {
          name: "Internal Venture Structuring",
          question: "How do we validate and spin out new internal ventures?",
          description: "Frameworks to transform successful internal experiments into standalone businesses.",
          details: [
            "Design of a formal validation pipeline for internal venture candidates.",
            "Creation of a corporate 'spin-out' framework for legal and tech separation.",
            "Resource allocation models for funding internal seed-stage projects.",
            "Establishment of success metrics for internal innovation projects."
          ]
        },
    ],
    modalBulletPoints: [
      "Innovation Program Design: Design effective, repeatable programs to successfully enable your teams to leverage emerging Technologies.",
      "Tech Maturity Evaluation: Detailed analysis of your teams' maturity levels and phased roadmaps for capability advancement.",
      "Acquisition Technical Vetting: Exhaustive search and technical analysis for your next significant strategic acquisition.",
      "Strategic Roadmap Consulting: Guidance through organizational shifts and CPO/CTO advisory for digital transformation.",
      "Internal Venture Structuring: Frameworks to validate and spin out new internal ventures."
    ],
    modalCta: "Explore Program Options",
    ctaLink: "https://cal.com/asitdeva/corporates"
  }
];
