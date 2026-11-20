import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target, 
  Layers, 
  MessageSquare, 
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Zap,
  TrendingUp,
  Building2,
  Award
} from 'lucide-react';
import { companyInfo } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';
import styles from './BriefBlueprintSection.module.css';

/**
 * Pre-configured smart blueprint intelligence matching the screenshot examples
 * and dynamic brief generation for custom user prompts.
 */
const BLUEPRINT_TEMPLATES = {
  healthcare: {
    matchKeywords: ['hospital', 'clinic', 'ivf', 'doctor', 'patient', 'health', 'medical', 'nagpur', 'care'],
    industry: 'Healthcare & Specialized Clinical Marketing',
    headline: 'Patient Acquisition & Medical Authority Blueprint',
    diagnosis: 'IVF and elective healthcare depend entirely on verified clinical credibility, hyper-local patient trust, and friction-free direct consultation funnels.',
    recommendedServices: [
      { name: 'Patient Acquisition Funnels', tag: 'Performance & Growth' },
      { name: 'Doctor Authority Video Shoots', tag: 'Content & Production' },
      { name: 'Google Map & Local SEO Dominance', tag: 'Local Search' },
      { name: 'HIPAA/Ethical Meta & Search Ads', tag: 'Paid Advertising' },
      { name: 'WhatsApp Consultation Bot', tag: 'Digital Experience' },
    ],
    phases: [
      {
        phase: 'Phase 01',
        title: 'Foundation & Clinical Trust Engine',
        duration: 'Days 1 – 14',
        deliverables: [
          'High-trust landing page optimized for patient confidential inquiries',
          'Doctor video series addressing patient hesitation and success rates',
          'Local Google Business Profile optimization for Nagpur + 100km radius',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Targeted High-Intent Acquisition',
        duration: 'Days 15 – 45',
        deliverables: [
          'Geo-fenced Google Search campaigns for high-intent fertility queries',
          'Meta video campaigns featuring compassionate patient testimonial narratives',
          'Instant 1-click WhatsApp triage flow for direct clinic appointment booking',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Scale & Regional Referral Dominance',
        duration: 'Days 45 – 90',
        deliverables: [
          'Retargeting funnels across YouTube & Meta for prospective families',
          'Automated appointment reminder & pre-consultation guidance system',
          'Weekly performance dashboard tracking Cost Per Verified Consultation',
        ],
      },
    ],
    expectedOutcome: '45 – 70+ qualified patient inquiries/month with a 3.8x patient acquisition ROAS.',
  },
  fashion: {
    matchKeywords: ['sneaker', 'shoe', 'fashion', 'brand', 'clothing', 'd2c', 'apparel', 'retail', 'ecommerce', 'streetwear'],
    industry: 'D2C Footwear & Fashion Retail',
    headline: 'Nationwide Brand Launch & High-Retention Drop Blueprint',
    diagnosis: 'Modern D2C sneaker launches win through thumb-stopping 3D visual hooks, exclusive VIP drop anticipation, and aggressive pan-India Meta Advantage+ scaling.',
    recommendedServices: [
      { name: '3D Sneaker Motion & Visuals', tag: '3D & CGI' },
      { name: 'Commercial Video Production', tag: 'Content & Production' },
      { name: 'Shopify Conversion Architecture', tag: 'Web Experiences' },
      { name: 'Meta Advantage+ Ad Scaling', tag: 'Performance Marketing' },
      { name: 'Micro-Creator Seeding Strategy', tag: 'Social & Influence' },
    ],
    phases: [
      {
        phase: 'Phase 01',
        title: 'Pre-Launch Hype & Visual Identity',
        duration: 'Days 1 – 14',
        deliverables: [
          '3D exploded-view CGI renders & cinematic unboxing reels for Instagram',
          'VIP waitlist landing page with countdown timer and early-access discount lock',
          'Product seeding kit delivered to 25 verified street-culture creators',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'The Nationwide Drop Sprint',
        duration: 'Days 15 – 30',
        deliverables: [
          'High-velocity Meta & YouTube Shorts launch blitz targeting metro hubs',
          'Influencer content amplification via Spark Ads & creator whitelisting',
          'Automated abandon-cart & VIP SMS/WhatsApp push sequences',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'ROAS Optimization & Scale',
        duration: 'Days 31 – 60+',
        deliverables: [
          'Dynamic product catalog ads retargeting engaged viewers',
          'A/B testing ad hooks, unboxing angles, and price anchoring points',
          'Scaling daily ad spend to target ₹25L+ monthly gross merchandise value',
        ],
      },
    ],
    expectedOutcome: '4.2x launch ROAS with 12,000+ waitlist conversions and 2.5M+ organic impressions.',
  },
  political: {
    matchKeywords: ['mla', 'election', 'campaign', 'politics', 'raipur', 'vote', 'candidate', 'voter', 'constituency'],
    industry: 'Strategic Political & Public Affairs Communication',
    headline: 'Constituency Voter Sentiment & Digital War-Room Blueprint',
    diagnosis: 'Winning electoral sentiment requires daily high-velocity localized video narratives, ward-level WhatsApp broadcasting networks, and real-time public sentiment monitoring.',
    recommendedServices: [
      { name: 'Digital War-Room Setup', tag: 'Strategy & Brand' },
      { name: 'Daily Speech & Reel Production', tag: 'Commercial Video' },
      { name: 'Ward-by-Ward WhatsApp Broadcasts', tag: 'Grassroots Social' },
      { name: 'Sentiment Monitoring & Fact Check', tag: 'Reputation Management' },
      { name: 'Constituency Geo-Targeted Ads', tag: 'Performance Marketing' },
    ],
    phases: [
      {
        phase: 'Phase 01',
        title: 'Constituency Mapping & War-Room Architecture',
        duration: 'Days 1 – 10',
        deliverables: [
          'Ward-level demographic segmentation & local key pain-point mapping',
          'High-definition video production studio & rapid turnaround editing unit',
          'Official social presence revamp with verified badge authorization',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Voter Engagement & Narrative Dominance',
        duration: 'Days 11 – 35',
        deliverables: [
          '3 daily localized reels capturing community walk-throughs & development work',
          'Geo-fenced Meta & YouTube campaigns targeted strictly within constituency limits',
          'Encrypted WhatsApp volunteer broadcasting groups covering every voting booth',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Final Turnout & GOTV (Get-Out-The-Vote) Push',
        duration: 'Days 36 – Election Day',
        deliverables: [
          'Live interactive townhalls & digital pledge-to-vote mobilizations',
          'Counter-narrative rapid response unit squashing opposing disinformation in <15 mins',
          'Hyper-targeted election-eve turnout reminder blitz to registered voters',
        ],
      },
    ],
    expectedOutcome: '90%+ constituency digital reach with 3.5M+ verified local video views.',
  },
  realestate: {
    matchKeywords: ['real estate', 'property', 'bhilai', 'site visit', 'flat', 'apartment', 'builder', 'villa', 'commercial', 'plot', 'plots'],
    industry: 'Luxury & Commercial Real Estate Marketing',
    headline: 'High-Intent Buyer Funnel & Site-Visit Generation Blueprint',
    diagnosis: 'Real estate conversions happen on-site. The entire digital engine must be calibrated to filter out casual browsers and deliver pre-qualified, high-net-worth buyers directly to physical site tours.',
    recommendedServices: [
      { name: '3D Architectural & Drone Visuals', tag: '3D Motion & Video' },
      { name: 'Google High-Intent Search Ads', tag: 'Paid Search' },
      { name: 'Interactive Virtual Walkthrough Brochure', tag: 'Web Experiences' },
      { name: 'Meta Lead Gen with WhatsApp Qualification', tag: 'Performance Ads' },
      { name: 'CRM & Sales Team Dispatch Sync', tag: 'Lead Management' },
    ],
    phases: [
      {
        phase: 'Phase 01',
        title: 'Asset Creation & High-Converting Digital Brochure',
        duration: 'Days 1 – 14',
        deliverables: [
          'Cinematic 4K drone flythrough and 3D interior walkthrough video showcases',
          'Fast-loading interactive project brochure with floorplans & price breakups',
          'Lead qualification logic: budget filtering & location preference verification',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'High-Net-Worth Acquisition Engine',
        duration: 'Days 15 – 45',
        deliverables: [
          'Google Search campaigns bidding on high-intent terms ("Luxury 3BHK in Bhilai/Durg")',
          'Meta video campaigns showcasing construction speed, amenities, and RERA approval',
          'Instant WhatsApp bot booking weekend site visit slots directly with sales manager',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Site Visit Velocity & Deal Closure Nurture',
        duration: 'Days 45 – 90',
        deliverables: [
          'Automated SMS & WhatsApp directions, GPS pins, and welcome guide for visitors',
          'Re-engagement campaigns with limited-time festive pricing for past visitors',
          'Weekly lead audit reviewing cost per verified walk-in and booking ratio',
        ],
      },
    ],
    expectedOutcome: '85 – 120+ verified physical site visits/month with a 30%+ walk-in to booking rate.',
  },
};

/**
 * Intelligent helper to match user input to tailored template or generate custom
 */
function resolveBlueprint(briefText) {
  const normalized = briefText.toLowerCase();

  for (const [key, tpl] of Object.entries(BLUEPRINT_TEMPLATES)) {
    if (tpl.matchKeywords.some(kw => normalized.includes(kw))) {
      return { ...tpl, id: key };
    }
  }

  // Dynamic custom blueprint fallback if input is unique
  return {
    id: 'custom',
    industry: 'Omni-Channel Brand & Growth Engine',
    headline: 'Tailored 360° Market Acceleration Blueprint',
    diagnosis: `Based on your brief ("${briefText.slice(0, 60)}..."), we engineer a customized growth architecture combining high-retention video production, precision paid acquisition, and conversion-optimized digital touchpoints.`,
    recommendedServices: [
      { name: 'Full-Funnel Performance Marketing', tag: 'Paid Advertising' },
      { name: 'Commercial Video & 3D Motion Ads', tag: 'Content & Production' },
      { name: 'Conversion Rate Optimized (CRO) Flagship', tag: 'Web & Digital' },
      { name: 'Brand Strategy & Visual Guidelines', tag: 'Strategy & Brand' },
      { name: 'Direct Lead Generation Automation', tag: 'Growth Engineering' },
    ],
    phases: [
      {
        phase: 'Phase 01',
        title: 'Diagnostic Audit & Creative Foundation',
        duration: 'Days 1 – 14',
        deliverables: [
          'Comprehensive competitor gap analysis and audience profile targeting',
          'Production of core commercial video assets and high-converting ad hooks',
          'High-speed landing page or e-commerce storefront optimization',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Multi-Channel Acquisition Sprint',
        duration: 'Days 15 – 45',
        deliverables: [
          'Full deployment of Google Search & Meta paid acquisition campaigns',
          'Rigorous A/B testing across creative variations, audiences, and pricing models',
          'Direct customer inquiry triage via WhatsApp & automated CRM synchronization',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Scale, Lifetime Value & Market Dominance',
        duration: 'Days 45 – 90',
        deliverables: [
          'Aggressive scaling of winning ad creatives with optimal CAC efficiency',
          'Omni-channel retargeting funnels across YouTube, Meta, and Search networks',
          'Bi-weekly strategic executive reporting with actionable ROI metrics',
        ],
      },
    ],
    expectedOutcome: 'Accelerated pipeline velocity with estimated 3.5x – 5.0x return on campaign investment.',
  };
}

export default function BriefBlueprintSection() {
  const [briefInput, setBriefInput] = useState('');
  const [activeChipIndex, setActiveChipIndex] = useState(null);
  const [generatedBlueprint, setGeneratedBlueprint] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const blueprintOutputRef = useRef(null);

  const suggestionChips = [
    {
      id: 'hospital',
      text: '50-bed hospital in Nagpur, need more IVF patients',
    },
    {
      id: 'sneaker',
      text: 'Launching a new sneaker brand across India',
    },
    {
      id: 'mla',
      text: 'MLA campaign for upcoming elections in Raipur',
    },
    {
      id: 'realestate',
      text: 'Real estate project in Bhilai, need more site visits',
    },
  ];

  const handleChipClick = (index, text) => {
    setActiveChipIndex(index);
    setBriefInput(text);
    triggerBlueprintGeneration(text);
  };

  const handleInputChange = (e) => {
    setBriefInput(e.target.value);
    setActiveChipIndex(null);
  };

  const triggerBlueprintGeneration = (textToUse) => {
    const text = textToUse || briefInput;
    if (!text || !text.trim()) return;

    setIsBuilding(true);
    setTimeout(() => {
      const blueprint = resolveBlueprint(text);
      setGeneratedBlueprint(blueprint);
      setIsBuilding(false);

      // Smooth scroll to output on mobile/desktop
      setTimeout(() => {
        if (blueprintOutputRef.current) {
          blueprintOutputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }, 450);
  };

  const handleReset = () => {
    setBriefInput('');
    setActiveChipIndex(null);
    setGeneratedBlueprint(null);
  };

  // Launch Amplify AI 3D mascot chat with this brief
  const handleLaunchMascotChat = () => {
    const currentBrief = briefInput || 'Tell me about how Amplify can build my custom blueprint';
    window.dispatchEvent(
      new CustomEvent('amplify:open-chat', {
        detail: {
          query: `I'm interested in building a project blueprint for: "${currentBrief}". What services and roadmap do you recommend?`,
        },
      })
    );
  };

  // Pre-filled WhatsApp link
  const getWhatsAppLink = () => {
    const text = briefInput
      ? `🚀 *PROJECT BLUEPRINT ENQUIRY — AMPLIFY DIGITAL*\n──────────────────────────────\n💬 *Requirement:* ${briefInput}\n──────────────────────────────\nI generated this project blueprint on amplifydigitalservices.com. Let's discuss starting this project!`
      : `🚀 *PROJECT INQUIRY — AMPLIFY DIGITAL*\n──────────────────────────────\nHi Amplify Digital Team! I'd like to discuss a custom digital marketing & development roadmap for my brand.`;
    return `https://wa.me/917879964770?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="blueprint" className={styles.blueprintSection}>
      <div className={styles.container}>

        {/* ── Section Header (Centered Pill & Dual-Line Heading) ───────── */}
        <div className={styles.header}>
          <div className={styles.tagPill}>
            <span className={styles.tagPillText}>BRIEF &gt; BLUEPRINT</span>
          </div>

          <h2 className={styles.heading}>
            Or just tell us what you need. <br />
            <span className={styles.headingGradient}>
              Get your plan in seconds.
            </span>
          </h2>
        </div>

        {/* ── The Master Blueprint Input Chassis (Gradient Neon Frame) ──── */}
        <div className={styles.cardFrame}>
          <div className={styles.cardChassis}>
            {/* Top-Left Corner Accent Label */}
            <div className={styles.labelRow}>
              <span className={styles.briefLabel}>YOUR BRIEF</span>
            </div>

            {/* Large Interactive Input Field */}
            <div className={styles.inputWrapper}>
              <textarea
                value={briefInput}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    triggerBlueprintGeneration();
                  }
                }}
                placeholder="e.g. 50-bed hospital in Nagpur, need more IVF patients"
                rows={2}
                className={styles.briefTextarea}
                aria-label="Your Project Brief"
              />
            </div>

            {/* Quick Suggestion Chips */}
            <div className={styles.chipsRow}>
              {suggestionChips.map((chip, idx) => {
                const isActive = activeChipIndex === idx;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleChipClick(idx, chip.text)}
                    className={`${styles.suggestionChip} ${isActive ? styles.chipActive : ''}`}
                  >
                    <span>{chip.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar with Gradient Pill Button */}
            <div className={styles.actionsBar}>
              <button
                type="button"
                onClick={() => triggerBlueprintGeneration()}
                disabled={isBuilding || !briefInput.trim()}
                className={`${styles.buildBtn} ${!briefInput.trim() ? styles.buildBtnDisabled : ''}`}
              >
                <Sparkles className={styles.btnSparkleIcon} />
                <span>{isBuilding ? 'Synthesizing Plan...' : 'Build my blueprint'}</span>
                <ArrowRight className={styles.btnArrowIcon} />
              </button>

              {briefInput && (
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.resetBtn}
                  aria-label="Clear brief"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Optical Glass Specular Glare */}
            <RealisticGlassSurface accentGlow="rgba(255, 122, 0, 0.25)" />
          </div>
        </div>

        {/* Sub-Card Explanatory Hint */}
        <p className={styles.hintCaption}>
          Type your brief or tap an example — your service blueprint appears here.
        </p>

        {/* ── Generated Interactive Blueprint Output Card ─────────────── */}
        {generatedBlueprint && (
          <div ref={blueprintOutputRef} className={styles.blueprintResult}>
            <div className={styles.resultChassis}>
              
              {/* Result Card Top Banner */}
              <div className={styles.resultHeader}>
                <div className={styles.resultBadge}>
                  <Zap size={14} className={styles.zapIcon} />
                  <span>VERIFIED AMPLIFY BLUEPRINT</span>
                </div>
                <div className={styles.industryTag}>
                  <Building2 size={14} />
                  <span>{generatedBlueprint.industry}</span>
                </div>
              </div>

              {/* Title & Strategic Diagnosis */}
              <div className={styles.resultHeadlineBlock}>
                <h3 className={styles.resultTitle}>
                  {generatedBlueprint.headline}
                </h3>
                <p className={styles.resultDiagnosis}>
                  {generatedBlueprint.diagnosis}
                </p>
              </div>

              {/* Recommended Service Stack */}
              <div className={styles.serviceStackBlock}>
                <h4 className={styles.blockTitle}>
                  <Layers size={16} /> Recommended Service Architecture
                </h4>
                <div className={styles.servicesGrid}>
                  {generatedBlueprint.recommendedServices.map((svc, i) => (
                    <div key={i} className={styles.servicePill}>
                      <span className={styles.serviceTagCategory}>{svc.tag}</span>
                      <span className={styles.serviceName}>{svc.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Phase Execution Roadmap */}
              <div className={styles.roadmapBlock}>
                <h4 className={styles.blockTitle}>
                  <Target size={16} /> 3-Phase Execution Roadmap
                </h4>
                <div className={styles.phasesGrid}>
                  {generatedBlueprint.phases.map((ph, idx) => (
                    <div key={idx} className={styles.phaseCard}>
                      <div className={styles.phaseTop}>
                        <span className={styles.phaseNumber}>{ph.phase}</span>
                        <span className={styles.phaseDuration}>
                          <Clock size={12} /> {ph.duration}
                        </span>
                      </div>
                      <h5 className={styles.phaseHeading}>{ph.title}</h5>
                      <ul className={styles.deliverablesList}>
                        {ph.deliverables.map((d, dIdx) => (
                          <li key={dIdx} className={styles.deliverableItem}>
                            <CheckCircle2 size={13} className={styles.checkIcon} />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Outcome Metric */}
              <div className={styles.outcomeBanner}>
                <div className={styles.outcomeIconWrap}>
                  <TrendingUp size={20} />
                </div>
                <div className={styles.outcomeTextWrap}>
                  <span className={styles.outcomeLabel}>TARGET OUTCOME & IMPACT</span>
                  <p className={styles.outcomeDescription}>{generatedBlueprint.expectedOutcome}</p>
                </div>
              </div>

              {/* Action Call-to-Actions */}
              <div className={styles.resultActions}>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaWhatsAppBtn}
                >
                  <MessageSquare size={16} />
                  <span>Execute This Blueprint on WhatsApp</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={handleLaunchMascotChat}
                  className={styles.ctaMascotBtn}
                >
                  <Sparkles size={16} />
                  <span>Discuss With 3D AI Mascot</span>
                </button>
              </div>

              {/* Optical Glass Specular Layer */}
              <RealisticGlassSurface accentGlow="rgba(224, 38, 150, 0.3)" />
            </div>
          </div>
        )}

        {/* ── Bottom Proof Metrics Bar (Matching Screenshot Reference) ──── */}
        <div className={styles.metricsBar}>
          <div className={styles.metricItem}>
            <div className={styles.metricIconCircle}>
              <span className={styles.plusSymbol}>+</span>
              <span className={styles.metricNumber}>16</span>
            </div>
            <span className={styles.metricLabel}>Healthcare brands served</span>
          </div>

          <div className={styles.metricDivider} />

          <div className={styles.metricItem}>
            <div className={styles.metricIconCircle}>
              <Award size={15} />
            </div>
            <span className={styles.metricLabel}>
              <strong>[100]+</strong> Brands &amp; campaigns
            </span>
          </div>

          <div className={styles.metricDivider} />

          <div className={styles.metricItem}>
            <div className={styles.metricIconCircle}>
              <Zap size={15} />
            </div>
            <span className={styles.metricLabel}>
              <strong>[500]+</strong> Commercial videos &amp; reels
            </span>
          </div>

          <div className={styles.metricDivider} />

          <div className={styles.metricItem}>
            <div className={styles.metricIconCircle}>
              <ShieldCheck size={15} />
            </div>
            <span className={styles.metricLabel}>
              <strong>3+</strong> Years market leadership
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
