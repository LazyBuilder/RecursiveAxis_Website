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
        { name: "PMF Acceleration Strategy", question: "How do we accelerate product-market fit?" },
        { name: "Interim CPO/CTO Advisory", question: "Who can provide battle-tested leadership without permanent risk?" },
        { name: "Actionable Tech Roadmaps", question: "What is the most efficient path to our technical goals?" },
        { name: "Technical Debt Reduction", question: "How do we stabilize our platform for investment?" },
        { name: "Due-Diligence Preparation", question: "Are our tech assets ready for auditor scrutiny?" },
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
        { name: "Technical Due Diligence (AI & Software)", question: "Is the technology viable and execution capability real?" },
        { name: "Portfolio De-Risking Analysis", question: "What is our real value and defensive strategy?" },
        { name: "AI Strategy Consulting & Training", question: "How do we make data-backed investment decisions in AI?" },
        { name: "Valuation Strategy & Risk Mitigation", question: "How do we mitigate critical technical risks post-acquisition?" },
        { name: "Exit Readiness Audits", question: "Is the tech stack optimized for maximum valuation?" },
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
        { name: "Innovation Program Design", question: "How can we move with startup speed inside a corporate structure?" },
        { name: "Tech Maturity Evaluation", question: "What is our team's current capability and how do we advance?" },
        { name: "Acquisition Technical Vetting", question: "Is this target acquisition technically sound and strategic?" },
        { name: "Strategic Roadmap Consulting", question: "How do we navigate digital transformation?" },
        { name: "Internal Venture Structuring", question: "How do we validate and spin out new internal ventures?" },
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
