/**
 * AMPLIFY AI — KNOWLEDGE RETRIEVAL SERVICE (RAG-Lite)
 * Sourced directly from structured business data.
 * Adheres strictly to grounding rules: no fabricated pricing, dates, or false guarantees.
 */

import brandData from '../knowledge/brand.json';
import servicesData from '../knowledge/services.json';
import healthcareData from '../knowledge/healthcare.json';
import academyData from '../knowledge/academy.json';
import portfolioData from '../knowledge/portfolio.json';
import faqData from '../knowledge/faq.json';
import developerData from '../knowledge/developer.json';

class KnowledgeService {
  constructor() {
    this.brand = brandData;
    this.services = servicesData;
    this.healthcare = healthcareData;
    this.academy = academyData;
    this.portfolio = portfolioData;
    this.faqs = faqData.faqs;
    this.developer = developerData;
  }

  /**
   * Search knowledge base for direct intent, services overview, FAQ, developer profile, or fuzzy keyword hits.
   */
  findAnswer(query, conversationHistory = []) {
    if (!query || typeof query !== 'string') return null;
    const lower = query.toLowerCase().trim();
    // Normalize punctuation
    const clean = lower.replace(/[?!.,;:()'"]/g, ' ').replace(/\s+/g, ' ').trim();

    // ─────────────────────────────────────────────────────────────
    // 0. DEVELOPER ATTRIBUTION & PROFILE (UMXIE / Muhammed Umair)
    // ─────────────────────────────────────────────────────────────
    // 0a. Who built this website?
    if (
      /\b(who (built|made|created|developed|designed|coded) (this|the) (website|site|web|page)|who (is the|built the|developed the) website developer)\b/i.test(clean)
    ) {
      return {
        source: 'developer_website',
        answer: this.getWebsiteCreatorAnswer(),
        quickActions: ['About UMXIE', 'Projects by UMXIE', 'Hire the Developer', 'Explore Services']
      };
    }

    // 0b. Who built this AI? / Who created Amplify AI?
    if (
      /\b(who (built|made|created|developed|designed|coded|engineered) (this |the )?(ai|assistant|amplify ai|3d mascot|mascot|chatbot)|ai creator|ai developer)\b/i.test(clean)
    ) {
      return {
        source: 'developer_ai',
        answer: this.getAICreatorAnswer(),
        quickActions: ['About UMXIE', 'Developer Portfolio', 'Hire the Developer', 'Explore Services']
      };
    }

    // 0c. Can I hire the developer? / Hire UMXIE
    if (
      /\b(can i hire (the )?developer|hire (the )?developer|hire umxie|hire muhammed umair|work with (the )?developer|developer freelance|freelance developer)\b/i.test(clean)
    ) {
      return {
        source: 'developer_hire',
        answer: this.getDeveloperHireAnswer(),
        quickActions: ['Developer Portfolio', 'Developer LinkedIn', 'Email UMXIE', 'Explore Services']
      };
    }

    // 0d. Developer projects / What has UMXIE built?
    if (
      /\b((what )?projects (has |did )?(umxie|muhammed umair|developer) (built|made|done|build)|developer projects|projects by umxie|umxie projects)\b/i.test(clean)
    ) {
      return {
        source: 'developer_projects',
        answer: this.getDeveloperProjectsAnswer(),
        quickActions: ['About UMXIE', 'Developer Portfolio', 'Hire the Developer']
      };
    }

    // 0e. General UMXIE / Muhammed Umair / About the Developer query
    if (
      /\b(umxie|muhammed umair|who is umxie|who is muhammed umair|about (the )?developer|developer profile|developer bio|meet the developer|the developer|developer philosophy|developer contact|developer linkedin|developer github|developer portfolio|developer info)\b/i.test(clean)
    ) {
      return {
        source: 'developer_profile',
        answer: this.getDeveloperBio(),
        quickActions: ['Projects by UMXIE', 'Hire the Developer', 'Developer Portfolio', 'Explore Services']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 1. HEALTHCARE INTENT (Checked early so "Doctor branding" routes to healthcare)
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(healthcare|hospital|doctor|clinic|patient|medical|doctor personal branding|doctor branding|multispeciality|hospital marketing|appointment booking)\b/i.test(clean)
    ) {
      return {
        source: 'healthcare',
        data: this.healthcare,
        answer: this.getHealthcareSummary(),
        quickActions: ['Doctor Personal Branding', 'Hospital Branding', 'Connect on WhatsApp']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 2. GENERAL SERVICES & ABOUT OVERVIEW ("Explore Services", "Services", "What do you do", etc.)
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(services|service|capabilities|what do you do|what we do|how can you help|what can you do|what are your services|about amplify|what is amplify digital|who are you|about us|explore services|all services|our services)\b/i.test(clean)
    ) {
      return {
        source: 'services_overview',
        answer: this.getServicesOverview(),
        quickActions: ['Brand Strategy', 'Performance Ads', 'Healthcare Marketing', 'About the Developer']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 3. CONTACT / WHATSAPP / TALK TO TEAM / HIRE AGENCY
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(contact|talk to (our|the)? team|talk to team|speak to (our|the)? team|connect on whatsapp|message on whatsapp|whatsapp|reach out|phone|call|email|support|location|office|raipur|book call|strategy call|consultation|share project brief|talk to the team|how to contact|can i hire you|hire you|hire|work with you)\b/i.test(clean)
    ) {
      return {
        source: 'contact',
        answer: `You can connect directly with our leadership and strategy team:\n\n• **WhatsApp Direct**: [+91 7879964770](${this.brand.contact.whatsappUrl})\n• **Direct Phone**: ${this.brand.contact.phoneFormatted}\n• **Email**: [${this.brand.contact.email}](mailto:${this.brand.contact.email})\n• **Office**: ${this.brand.contact.location}\n\nWould you like to share a quick project brief right now, or message us on WhatsApp?`,
        quickActions: ['Message on WhatsApp', 'Explore Services', 'View Our Work'],
        showLeadPrompt: true
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 4. PRICING / PACKAGES / QUOTES / COSTS
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(pricing|price|cost|how much|charges|fees|budget|rates|package|packages|quote|monthly cost|retainer)\b/i.test(clean)
    ) {
      return {
        source: 'pricing',
        answer: `Because every brand has distinct goals, creative needs, and execution scales, we don't believe in one-size-fits-all generic pricing.\n\nWe scope each partnership based on your required deliverables, timelines, and growth targets. We would be delighted to put together a tailored scope for your brand.\n\nWould you like to share a quick project brief or schedule a scoping call with our team?`,
        quickActions: ['Connect on WhatsApp', 'Talk to Our Team', 'Explore Services'],
        showLeadPrompt: true
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 5. GUARANTEES / FALSE CLAIMS / 1,000 LEADS
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(guarantee|guaranteed leads|1000 leads|promise results|guarantee 1000 leads)\b/i.test(clean)
    ) {
      return {
        source: 'guarantee',
        answer: `We maintain strict professional integrity: we do not make exaggerated, unverified promises or artificial 'guaranteed lead' claims.\n\nReal, lasting business growth depends on product-market fit, audience targeting, creative resonance, and market dynamics. What we do guarantee is transparent reporting, disciplined A/B creative testing, high-converting execution, and relentless optimization to maximize your return on ad spend (ROAS).`,
        quickActions: ['Performance Ads', 'View Case Studies', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 6. BRAND STRATEGY / BUILD MY BRAND / GROW MY BRAND
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(build my brand|grow my brand|brand strategy|brand identity|branding|rebrand|rebranding|logo design|logo|visual identity|packaging|brand guidelines|brand book)\b/i.test(clean)
    ) {
      const cat = this.services.categories.find(c => c.id === 'brand-strategy');
      return {
        source: 'services',
        service: cat,
        answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Key Deliverables:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}\n\nWould you like to explore a custom brand identity strategy for your company?`,
        quickActions: ['View Case Studies', 'Performance Ads', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 7. PERFORMANCE MARKETING / GROW MY BUSINESS / ADS
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(grow my business|performance marketing|digital advertising|performance ads|meta ads|facebook ads|instagram ads|google ads|ad spend|lead gen|lead generation|roas|ppc|paid ads|customer acquisition)\b/i.test(clean)
    ) {
      const cat = this.services.categories.find(c => c.id === 'performance-marketing');
      return {
        source: 'services',
        service: cat,
        answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Our Performance Engine:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}\n\n*(For brands like The SaleKart, our performance marketing driven 300%+ increase in verified order volume.)*\n\nWould you like us to review your current advertising funnels?`,
        quickActions: ['View Case Studies', 'Connect on WhatsApp', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 8. CONTENT & VIDEO PRODUCTION / COMMERCIALS / REELS
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(content|video production|video editing|commercial video|commercials|film|reels|3d motion|photography|shoots|brand films)\b/i.test(clean)
    ) {
      const cat = this.services.categories.find(c => c.id === 'content-production');
      return {
        source: 'services',
        service: cat,
        answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Capabilities:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}\n\nFrom high-energy Instagram reels to high-budget 3D commercial films, we handle everything from scriptwriting to final post-production!`,
        quickActions: ['View Case Studies', 'Brand Strategy', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 9. WEB & DIGITAL EXPERIENCES / REACT / UI/UX / SEO
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(website|web design|web development|react|ui\/ux|landing page|e-commerce store|storefront|digital experiences|3d web|seo|search engine)\b/i.test(clean)
    ) {
      const cat = this.services.categories.find(c => c.id === 'web-digital-experiences');
      return {
        source: 'services',
        service: cat,
        answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Capabilities:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}\n\nEvery site we build is engineered for high conversion, lightning-fast Core Web Vitals, and responsive perfection across all devices!`,
        quickActions: ['View Portfolio Projects', 'Discuss a Website', 'About the Developer']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 10. ACADEMY / LEARNING INTENT
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(academy|explore amplify academy|course|courses|learn|student|syllabus|internship|training|digital marketing course|learn ai|admissions|curriculum details)\b/i.test(clean)
    ) {
      return {
        source: 'academy',
        data: this.academy,
        answer: this.getAcademySummary(),
        quickActions: ['Curriculum Details', 'Admissions WhatsApp', 'Explore Services']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 11. PORTFOLIO / WORK / CASE STUDIES / CLIENTS
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(portfolio|view our work|our work|view portfolio|work|project|projects|case study|case studies|client|clients|titan|tata|myntra|helios|us polo|swiggy|revolt|salekart|aadona|firstcry|croma|amazon|retail & fashion work|e-commerce case study|e-commerce scaling|view case studies)\b/i.test(clean)
    ) {
      return {
        source: 'portfolio',
        data: this.portfolio,
        answer: this.getPortfolioSummary(clean),
        quickActions: ['Retail & Fashion Work', 'E-Commerce Scaling', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 12. "TELL ME MORE" / EXPANSION INTENT
    // ─────────────────────────────────────────────────────────────
    if (
      /\b(tell me more|more details|elaborate|explain more|continue)\b/i.test(clean)
    ) {
      return {
        source: 'expansion',
        answer: `Amplify Digital operates at the intersection of **Strategy, Creative Media, and Performance Technology**.\n\n• **For Brands**: We take emerging and established businesses from initial brand identity to full-funnel customer acquisition.\n• **For Healthcare**: We help hospitals and specialists build patient trust with ethical, compliant campaigns.\n• **For Learners**: Amplify Academy bridges the gap between academic theory and high-level digital marketing execution.\n\nWhich of these three areas would you like to explore for your specific needs?`,
        quickActions: ['Grow My Brand', 'Amplify Healthcare', 'Amplify Academy', 'Talk to Our Team']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 13. DIRECT FAQ MATCH
    // ─────────────────────────────────────────────────────────────
    for (const faq of this.faqs) {
      if (faq.keywords.some(kw => clean.includes(kw.toLowerCase()))) {
        return {
          source: 'faq',
          answer: faq.answer,
          matchedQuestion: faq.question,
          quickActions: ['Explore Services', 'Talk to Our Team', 'View Our Work']
        };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 14. SPECIFIC SERVICE CATEGORY MATCH (from services.json)
    // ─────────────────────────────────────────────────────────────
    for (const cat of this.services.categories) {
      if (
        clean.includes(cat.name.toLowerCase()) ||
        clean.includes(cat.id.replace('-', ' ')) ||
        cat.capabilities.some(cap => clean.includes(cap.toLowerCase()))
      ) {
        return {
          source: 'services',
          service: cat,
          answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Key Capabilities:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}\n\nWould you like to explore a custom strategy for this service or view our recent work?`,
          quickActions: ['Explore Services', 'View Case Studies', 'Talk to Our Team']
        };
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 15. INTELLIGENT CONSULTATION SCENARIO MATCH
    // ─────────────────────────────────────────────────────────────
    const recommendation = this.recommendServices(clean);
    if (recommendation) {
      return {
        source: 'recommendation',
        answer: recommendation,
        quickActions: ['Talk to Our Team', 'View Portfolio Projects', 'Explore Services']
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 16. TOKENIZED FUZZY SAFETY NET
    // ─────────────────────────────────────────────────────────────
    const fuzzyMatch = this.fuzzyFallbackMatch(clean);
    if (fuzzyMatch) {
      return fuzzyMatch;
    }

    return null;
  }

  /**
   * Complete 360° Services Overview Breakdown
   */
  getServicesOverview() {
    return `**Amplify Digital** is a 360° creative, digital, marketing and growth studio. We scale ambitious brands across **three primary verticals**:\n\n### 1. Amplify Digital — For Brands\n• **Brand Strategy & Identity**: Distinctive logos, brand books, typography, and positioning.\n• **Social Media Marketing**: Viral reels, content calendars, and active community growth.\n• **Content & Creative Production**: High-end commercial films, photography, and 3D motion.\n• **Digital Advertising & Performance**: High-ROAS Meta & Google conversion ad funnels.\n• **Website & Digital Experiences**: Modern React.js web flags, UI/UX architecture, and interactive 3D.\n• **Influencer & Regional Marketing**: Authentic creator collaborations and multilingual campaigns.\n• **Events & Experiences**: Immersive brand activations and exhibition media.\n\n### 2. Amplify Healthcare\n• Specialized hospital institutional branding, doctor personal authority building, and automated WhatsApp patient routing.\n\n### 3. Amplify Academy\n• Practical, industry-standard training in digital marketing, Meta/Google Ads, SEO, and AI workflows.\n\nWhich of these would you like to explore for your brand?`;
  }

  // ─────────────────────────────────────────────────────────────
  // DEVELOPER ATTRIBUTION & PROFILE METHODS
  // ─────────────────────────────────────────────────────────────

  getWebsiteCreatorAnswer() {
    const dev = this.developer;
    return `This website was engineered and built by **${dev.name}**, professionally known as **${dev.identity}**.\n\n**Profile:**\n• **Role**: ${dev.profession}\n• **Location**: ${dev.location}\n• **Focus**: ${dev.primaryFocus}\n• **Philosophy**: *"${dev.philosophy}"*\n\nHe architected the entire Amplify Digital web platform with modern React.js, the single-page continuous canvas, seamless visual transitions, and the interactive 3D WebGL mascot.\n\n**Connect with UMXIE:**\n• 🌐 **Portfolio**: [${dev.contact.portfolio}](${dev.contact.portfolio})\n• 💼 **LinkedIn**: [Muhammed Umair](${dev.contact.linkedin})\n• 💻 **GitHub**: [github.com/developerumxie-dotcom](${dev.contact.github})\n• 📸 **Instagram**: [@dev.umxie](${dev.contact.instagram})\n• ✉️ **Email**: [${dev.contact.email}](mailto:${dev.contact.email})`;
  }

  getAICreatorAnswer() {
    const dev = this.developer;
    return `**Amplify AI** was conceptualized, built, and engineered by **${dev.name} (${dev.identity})**!\n\nAs a Software Engineer & Creative Technologist, he engineered:\n• The **3D WebGL Interactive Mascot** featuring slow turntable showcase rotation and physical 360° drag.\n• The **IndexedDB Caching Layer** enabling instant 0.02s model loads on return visits.\n• The **Grounded RAG-Lite Knowledge Engine** that retrieves verified facts with zero secret API keys exposed.\n\n*"${dev.philosophy}"*\n\nExplore his projects or collaborate with him:\n• **Portfolio**: [${dev.contact.portfolio}](${dev.contact.portfolio})\n• **GitHub**: [${dev.contact.github}](${dev.contact.github})`;
  }

  getDeveloperBio() {
    const dev = this.developer;
    const completedList = dev.projects.completed.map(p => `• **${p.name}** (${p.status})`).join('\n');
    const ongoingList = dev.projects.ongoing.map(p => `• **${p.name}** (${p.status})`).join('\n');
    const expList = dev.experience.map(e => `• **${e.role}** — ${e.company} (${e.type})`).join('\n');

    return `**${dev.name} (${dev.identity})**\n*${dev.profession} • ${dev.location}*\n\n${dev.about}\n\n**Core Focus**: ${dev.primaryFocus}\n**Philosophy**: *"${dev.philosophy}"*\n\n**Professional Roles:**\n${expList}\n\n**Key Projects:**\n${completedList}\n${ongoingList}\n\n**Connect with UMXIE:**\n• 🌐 **Portfolio**: [${dev.contact.portfolio}](${dev.contact.portfolio})\n• 💼 **LinkedIn**: [Muhammed Umair](${dev.contact.linkedin})\n• 💻 **GitHub**: [${dev.contact.github}](${dev.contact.github})\n• 📸 **Instagram**: [@dev.umxie](${dev.contact.instagram})\n• ✉️ **Email**: [${dev.contact.email}](mailto:${dev.contact.email})`;
  }

  getDeveloperHireAnswer() {
    const dev = this.developer;
    return `Yes! **${dev.name} (${dev.identity})** is open to select freelance opportunities, full-stack web engineering, scalable backend architecture, and custom AI / 3D web experiences.\n\n**What UMXIE Builds:**\n• Modern, high-performance web applications & digital flagships\n• Scalable Node.js / Express backend systems & database architecture\n• Custom conversational AI assistants & RAG-lite knowledge engines\n• Interactive 3D Three.js / WebGL web experiences\n\n**How to Reach Out to UMXIE:**\n• ✉️ **Direct Email**: [${dev.contact.email}](mailto:${dev.contact.email})\n• 🌐 **Personal Portfolio**: [${dev.contact.portfolio}](${dev.contact.portfolio})\n• 💼 **LinkedIn**: [Muhammed Umair](${dev.contact.linkedin})\n• 📸 **Instagram**: [@dev.umxie](${dev.contact.instagram})`;
  }

  getDeveloperProjectsAnswer() {
    const dev = this.developer;
    const completedList = dev.projects.completed.map(p => `• **${p.name}** (${p.status}): ${p.description}`).join('\n');
    const ongoingList = dev.projects.ongoing.map(p => `• **${p.name}** (${p.status}): ${p.description}`).join('\n');
    const expList = dev.experience.map(e => `• **${e.role}** — ${e.company} (${e.type})`).join('\n');

    return `Here are the key projects and engineering achievements by **${dev.name} (${dev.identity})**:\n\n**Completed Projects:**\n${completedList}\n\n**Ongoing Projects:**\n${ongoingList}\n\n**Professional Experience:**\n${expList}\n\nCheck out his code repositories on [GitHub](${dev.contact.github}) or visit his [Live Portfolio](${dev.contact.portfolio})!`;
  }

  /**
   * Intelligent Consultation Engine
   */
  recommendServices(scenario) {
    const s = scenario.toLowerCase();

    // Fashion / Clothing Brand
    if (s.includes('clothing') || s.includes('fashion') || s.includes('apparel') || s.includes('garment')) {
      return `That's exciting! For a growing clothing or lifestyle brand, we typically recommend a high-impact three-pillar approach:\n\n1. **Brand Strategy & Visual Direction**: Distinctive lookbooks, packaging, and brand aesthetics.\n2. **Creative Content & Short-Form Video**: Engaging Instagram reels, lifestyle shoots, and influencer collaborations.\n3. **Performance Marketing (Meta & Google Shopping)**: Targeted conversion funnels bringing high-intent buyers directly to your storefront.\n\nAre you currently selling primarily through Instagram, your own website, or marketplaces like Myntra and Amazon?`;
    }

    // New Startup / Launch
    if (s.includes('startup') || s.includes('new business') || s.includes('launching') || s.includes('new product')) {
      return `Congratulations on launching! For new ventures, establishing credibility and market traction from Day 1 is key. We suggest starting with:\n\n• **Core Brand Identity**: Signature logo, brand guide, typography, and clear positioning.\n• **High-Conversion React Website**: A sleek digital flagship that builds instant investor and consumer trust.\n• **Launch Campaign & Social Presence**: Targeted awareness campaigns that spark initial buzz.\n\nWhat stage is your launch currently in—ideation, pre-launch, or ready to scale?`;
    }

    // E-Commerce Store
    if (s.includes('ecommerce') || s.includes('e-commerce') || s.includes('online store') || s.includes('shopify') || s.includes('sales')) {
      return `For e-commerce scaling, the bottleneck is almost always ad fatigue and checkout conversion. Our proven framework combines:\n\n• **Performance PPC (Meta & Google Shopping Ads)**: Full-funnel customer acquisition with rigorous A/B creative testing.\n• **Creative Video Ads**: High-retention product demo films and social hooks.\n• **Conversion Rate Optimization (CRO)**: Eliminating friction on your product and checkout pages.\n\n*(In our work with brands like The SaleKart, this approach drove a 300%+ increase in verified order volume.)*\n\nWould you like to analyze your current advertising or website conversion rate?`;
    }

    // Hospital / Clinic
    if (s.includes('hospital') || s.includes('clinic') || s.includes('doctor') || s.includes('healthcare') || s.includes('patient')) {
      return `Through **Amplify Healthcare**, we specialize in ethical, high-trust medical growth:\n\n• **Doctor Authority & Introduction Films**: Highlighting specialist expertise and building patient confidence.\n• **Local SEO & Google Business Profile**: Dominating local searches for critical departments (e.g., 'Best orthopedic near me').\n• **WhatsApp Appointment Routing**: Enabling frictionless patient consultation booking and automated follow-ups.\n\n*Note: We strictly adhere to medical compliance—no guaranteed patient counts or clinical diagnoses.*\n\nAre you looking to enhance awareness for a specific department, hospital facility, or doctor practice?`;
    }

    // Corporate Videos / Production
    if (s.includes('video') || s.includes('shoot') || s.includes('film') || s.includes('commercial') || s.includes('production')) {
      return `Video is in our DNA! Amplify's media production team produces:\n\n• **Cinematic Brand Films & Commercials**\n• **Corporate Walkthroughs & Leadership Interviews**\n• **E-Commerce Product Showcases**\n• **High-Impact Social Media Reels & 3D Motion Graphics**\n\nWe manage everything from scriptwriting, storyboarding, and studio shoots to color grading and sound design. What type of video are you envisioning?`;
    }

    // Website / App Development
    if (s.includes('website') || s.includes('web development') || s.includes('ui/ux') || s.includes('app') || s.includes('landing page')) {
      return `Our digital experience team crafts modern, lightning-fast web flagships built on **React.js, Three.js 3D interactions, and conversion-optimized UI/UX**.\n\nWhether you need an enterprise corporate portal, a high-converting landing page, or an interactive digital brand showcase, we engineer with technical SEO and responsive perfection. Would you like to review some of our live web builds?`;
    }

    return null;
  }

  getHealthcareSummary() {
    return `**Amplify Healthcare** is our dedicated healthcare marketing division for multispeciality hospitals, clinics, and medical practitioners.\n\n**Our Core Healthcare Capabilities:**\n• **Hospital Branding**: Institutional trust, compassionate messaging, and patient collateral.\n• **Doctor Personal Branding**: Clinical specialty films, doctor introduction videos, and professional authority profiles.\n• **Healthcare Social Media**: Empathetic patient education and observance campaigns.\n• **Local SEO**: Ranking clinics and hospitals for high-intent medical queries.\n• **WhatsApp Patient Routing**: Automated OPD consultation inquiries and reminders.\n\n*Compliance Note: We strictly comply with healthcare advertising norms—we do not offer medical diagnoses or guarantee patient recovery counts.*`;
  }

  getAcademySummary() {
    return `**Amplify Academy** empowers ambitious learners with practical, industry-standard digital skills.\n\n**Key Curriculum Areas:**\n• Digital Marketing Strategy & Performance Ad Funnels (Meta & Google)\n• Search Engine Optimization (SEO) & Technical Visibility\n• Social Media Growth, Viral Reels & Creative Storytelling\n• Modern AI Tools for Creatives & Workflow Automation\n• Website Development & UI/UX Design Fundamentals\n\n*Note: Every cohort is designed for practical agency workflows. To check upcoming batch schedules or consult with an admissions mentor, feel free to connect with our Academy team!*`;
  }

  getPortfolioSummary(query) {
    const q = query.toLowerCase();
    let relevant = this.portfolio.projects;

    if (q.includes('fashion') || q.includes('clothing') || q.includes('retail')) {
      relevant = this.portfolio.projects.filter(p => p.industry.toLowerCase().includes('fashion') || p.industry.toLowerCase().includes('retail'));
    } else if (q.includes('web') || q.includes('portal')) {
      relevant = this.portfolio.projects.filter(p => p.industry.toLowerCase().includes('hospitality') || p.category.toLowerCase().includes('web'));
    } else if (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('sales')) {
      relevant = this.portfolio.projects.filter(p => p.industry.toLowerCase().includes('e-commerce'));
    }

    const cards = relevant.slice(0, 3).map(p => 
      `• **${p.title}** (${p.client})\n  *Industry*: ${p.industry} | *Services*: ${p.services.join(', ')}\n  ${p.description} [View on page](#portfolio)`
    ).join('\n\n');

    return `Here are some of our verified client case studies:\n\n${cards}\n\nOur client footprint also includes collaborations with **Titan World, Helios, U.S. Polo Assn., Myntra, TATA, Swiggy, and Revolt Motors**. Would you like to discuss a project in one of these categories?`;
  }

  /**
   * Tokenized Fuzzy Safety Net
   */
  fuzzyFallbackMatch(clean) {
    const tokens = clean.split(/\s+/).filter(w => w.length > 2);
    const stopWords = new Set(['the', 'is', 'are', 'was', 'were', 'what', 'where', 'when', 'how', 'why', 'who', 'and', 'with', 'for', 'about', 'tell', 'me', 'can', 'you', 'please', 'want', 'need']);
    const meaningful = tokens.filter(w => !stopWords.has(w));

    for (const w of meaningful) {
      if (w.includes('umxie') || w.includes('umair') || w.includes('develop')) {
        return {
          source: 'developer_profile',
          answer: this.getDeveloperBio(),
          quickActions: ['Projects by UMXIE', 'Hire the Developer', 'Developer Portfolio', 'Explore Services']
        };
      }
      if (w.includes('servic') || w.includes('capab') || w.includes('offer')) {
        return {
          source: 'services_overview',
          answer: this.getServicesOverview(),
          quickActions: ['Brand Strategy', 'Performance Ads', 'Healthcare Marketing', 'Talk to the Team']
        };
      }
      if (w.includes('brand') || w.includes('logo')) {
        const cat = this.services.categories.find(c => c.id === 'brand-strategy');
        return {
          source: 'services',
          service: cat,
          answer: `**${cat.name}**\n*${cat.tagline}*\n\n${cat.summary}\n\n**Key Deliverables:**\n${cat.capabilities.map(c => `• ${c}`).join('\n')}`,
          quickActions: ['View Case Studies', 'Performance Ads', 'Talk to Our Team']
        };
      }
      if (w.includes('medic') || w.includes('doct') || w.includes('hospit')) {
        return {
          source: 'healthcare',
          answer: this.getHealthcareSummary(),
          quickActions: ['Doctor Personal Branding', 'Hospital Branding', 'Connect on WhatsApp']
        };
      }
      if (w.includes('acad') || w.includes('cours') || w.includes('learn')) {
        return {
          source: 'academy',
          answer: this.getAcademySummary(),
          quickActions: ['Curriculum Details', 'Admissions WhatsApp', 'Explore Services']
        };
      }
      if (w.includes('client') || w.includes('work') || w.includes('portfol')) {
        return {
          source: 'portfolio',
          answer: this.getPortfolioSummary(''),
          quickActions: ['Retail & Fashion Work', 'E-Commerce Scaling', 'Talk to Our Team']
        };
      }
    }

    return null;
  }

  /**
   * System Grounding Prompt Context for LLMs
   */
  getSystemContext() {
    return `
You are AMPLIFY AI, the official intelligent virtual assistant for Amplify Digital.
Brand: Amplify Digital Services
Tagline: STRATEGIZE. INNOVATE. AMPLIFY.
Positioning: A 360° creative, digital, marketing and growth studio for ambitious brands and businesses.
Hero Claim: "We Turn Ideas Into Impact."
Contact: aditya@amplifydigitalservices.com, +91 7879964770, Raipur, Chhattisgarh, India.

DEVELOPER & CREATOR ATTRIBUTION:
Website Developer: Muhammed Umair (UMXIE)
AI Creator & Developer: Muhammed Umair (UMXIE)
Profession: Software Engineer & Creative Technologist (Kerala, India)
Primary Focus: Backend Engineering & Full-Stack Development
Philosophy: "Build with curiosity. Engineer with logic. Create with purpose."
Portfolio: https://develoerumxie.vercel.app
GitHub: https://github.com/developerumxie-dotcom
LinkedIn: https://www.linkedin.com/in/muhammed-umair-23540939b/
Instagram: https://www.instagram.com/dev.umxie
Email: developerumxie@gmail.com

STRICT ATTRIBUTION RULES FOR UMXIE:
- If anyone asks who developed the website or created Amplify AI, ALWAYS credit Muhammed Umair (UMXIE).
- Always provide accurate information about UMXIE.
- Never invent personal details, achievements, experience, or project information.
- Distinguish between completed projects (Amplify Digital Website, Amplify Digital AI Assistant, Vidya Hospital Website, Novox EdTech Full Stack & Backend Developer) and ongoing projects (Newcomer City Platform focused on Kozhikode, Kerala).
- Never claim unverified technical expertise.
- Keep answers friendly, natural, concise, and professional.

THREE BUSINESS VERTICALS:
1. Amplify Digital — For Brands: Brand strategy, creative content production (films, reels, commercials), social media marketing, performance marketing (Meta/Google Ads), modern React.js web experiences, influencer marketing, events, and CRM automation.
2. Amplify Healthcare — For Hospitals and Doctors: Hospital institutional branding, doctor personal branding videos, ethical patient education social content, local SEO for clinics, and WhatsApp patient inquiry routing. (COMPLIANCE: NEVER guarantee patient counts or medical outcomes, never diagnose or give medical advice).
3. Amplify Academy — For Learners: Practical training in digital marketing, Meta/Google Ads, SEO, creative content, and AI marketing workflows. (RULE: NEVER invent prices, start dates, or placement guarantees).

VERIFIED CLIENT FOOTPRINT:
Titan World, Titan Eye+, Helios, U.S. Polo Assn., Myntra, Taneira, TATA, Swiggy, Philips, Nestlé, Shoppers Stop, Tata CLiQ, FirstCry, Croma, V-Mart, BIBA, Skechers, Powerlook, Revolt Motors, Amazon, Aadona Networks, The SaleKart.

BEHAVIORAL RULES:
- Communicate in a confident, intelligent, warm, creative, and professional tone.
- Avoid robotic corporate clichés, unverified numbers, and exaggerated claims.
- Never invent pricing or discounts; explain that projects are uniquely scoped and offer to connect with the team.
- Guide interested visitors to submit a project brief or connect via WhatsApp (+91 7879964770).
`;
  }
}

export const knowledgeService = new KnowledgeService();
export default knowledgeService;
