import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

// ── Accent colour ──────────────────────────────────────────────────────────

const R = "#C8102E";

// Shorthand labels for the sticky nav, matching CASES order
const SHORTS = ["AFR", "IN", "IN", "IN", "ME", "PH", "EU", "SEA", "AI"];

// ── Types ──────────────────────────────────────────────────────────────────

type Metric   = { value: string; label: string };
type Problem  = { heading: string; paras: string[] };
type ExecItem = { label: string; title: string; body: string };

type GTMCase = {
  id: string;
  num: string;
  region: string;
  geo: string;
  headline: string;
  tagline: string;
  tags: string[];
  heroValue: string;
  heroLabel: string;
  metricsTitle: string;
  metrics: Metric[];
  problems: Problem[];
  execTitle: string;
  exec: ExecItem[];
  quote?: string;
  quoteAttr?: string;
  results?: Metric[];
  insight: string;
  listings: string[];
};

// ── Data ───────────────────────────────────────────────────────────────────

const CASES: GTMCase[] = [
  // 01 ─ Africa
  {
    id: "01", num: "01", region: "Africa", geo: "South Africa \u00b7 Nigeria \u00b7 East Africa",
    headline: "When the CEO lands in Africa, the market already knows his name",
    tagline: "The Africa campaign ran for four weeks before the CEO\u2019s plane touched down. By the time he walked into Capitec Bank, every contact in the room had already seen his face.",
    tags: ["FSS BLAZE", "Pre-Visit Awareness", "LinkedIn + AR + Print + Experiential", "Africa GTM"],
    heroValue: "400+", heroLabel: "Gated downloads from named banks",
    metricsTitle: "Campaign Results",
    metrics: [
      { value: "400+", label: "Gated Brochure Downloads from Named Institutions" },
      { value: "6",    label: "Execution Layers Deployed Simultaneously" },
      { value: "15",   label: "Named Banks Engaged" },
    ],
    problems: [
      {
        heading: "The Problem Worth Solving",
        paras: [
          "African banks had more accounts than ever, and most were worthless. Cash-in, cash-out transactions dominated. Digital banking features went unused. The region was not struggling with account penetration: it was struggling with account activation. This distinction, surfaced directly through conversations with African banking delegates who visited FSS\u2019s Mumbai office, became the campaign\u2019s strategic foundation.",
          "The visiting CEO would be meeting executives at Capitec, Standard Bank, Ecobank, Absa, and Nedbank. Without pre-visit awareness, those conversations would begin with introductions. With the right campaign, they would begin with recognition, and move directly to intent.",
        ],
      },
      {
        heading: "The Positioning",
        paras: [
          "FSS BLAZE was positioned not as a core banking replacement, but as a digital adoption accelerator: the platform that moves bank accounts from dormant to active. The campaign\u2019s opening creative asked African banking professionals a direct question before naming any solution. The question was designed to be forwarded, shared, and discussed before FSS was ever mentioned.",
          "India\u2019s UPI transformation served as the proof model. The implicit argument: the country that solved mass digital adoption at 1.4 billion-user scale built its infrastructure on FSS. Here is what that looks like for Africa.",
        ],
      },
    ],
    execTitle: "How It Was Executed",
    exec: [
      { label: "01", title: "Hyper-targeted LinkedIn campaign", body: "CXO, Director, VP, and Manager-level targeting across named institutions, Standard Bank, Ecobank Nigeria, Capitec, Absa, FNB, Nedbank, went live four weeks before the CEO landed. The campaign created recall before the first handshake." },
      { label: "02", title: "AR-powered CEO address", body: "The most talked-about asset of the campaign: a printed card with a photograph of the FSS CEO. Delegates scanned it with their phones and he began speaking. The AR-embedded video transformed a brochure into a conversation starter that no one in the room had seen before." },
      { label: "03", title: "Experiential meeting design", body: "The Capitec Bank delegate meeting was designed as an experience, not a briefing. A Welcome Puja created cultural resonance before any product was discussed. FSS BLAZE standees, branded giveaway kits, and The India Story magazine provided layered brand exposure throughout the room." },
      { label: "04", title: "Print media at scale", body: "Two quarter-page advertorials placed in The Star and Business Day, combined circulation of 10,000+, anchored FSS\u2019s presence in South Africa\u2019s financial press in the week of the visit. The messaging aligned precisely with the digital campaign creative." },
      { label: "05", title: "Gated brochure download", body: "The LinkedIn campaign drove traffic to a gated BLAZE brochure download. 400+ downloads from named banking institutions created a qualified contact list for the sales team before any sales conversation had occurred." },
      { label: "06", title: "Post-visit pipeline activation", body: "Within 48 hours of the CEO\u2019s return, a personalised insight note was sent to every Capitec contact. Follow-up architecture workshop invitations were dispatched to the four other named banks whose LinkedIn engagement indicated intent." },
    ],
    quote: "Innovation cannot be built on fragmented foundations. The Africa market does not need more accounts. It needs accounts that work.",
    quoteAttr: "Campaign Strategy, FSS Africa GTM",
    insight: "Pre-visit awareness engineering changes the nature of the first meeting. When every contact in the room has already seen your message, your campaign, and your CEO\u2019s face before he walks in, the conversation does not begin with \u201Cwho are you.\u201D It begins with \u201Clet\u2019s talk about what we do next.\u201D The campaign was the product of the visit.",
    listings: ["G2 \u2014 Digital Banking Platforms", "Gartner Peer Insights \u2014 Digital Banking Engagement", "IBSi Sales League Tables \u2014 Africa & ME", "The Paypers \u2014 Africa Fintech", "Fintech Futures"],
  },

  // 02 ─ India BLAZE Launch
  {
    id: "02", num: "02", region: "India", geo: "India \u00b7 ME \u00b7 Africa",
    headline: "Launching a platform through people, not press releases",
    tagline: "In a market where every vendor promised transformation, FSS let three unscripted executives say what they actually thought, and watched a 54% click-to-open rate happen.",
    tags: ["Product: FSS BLAZE", "Platform Launch", "PR + Video + Email + Event", "India \u00b7 ME \u00b7 Africa"],
    heroValue: "54%", heroLabel: "Email CTOR, benchmark 15%",
    metricsTitle: "Campaign Results",
    metrics: [
      { value: "30+",     label: "Banks in Active Conversation" },
      { value: "25,000+", label: "Views with 6.2% Engagement" },
      { value: "54%",     label: "Newsletter CTOR (benchmark: 15%)" },
      { value: "10,000+", label: "Bank Contacts Reached by Email" },
    ],
    problems: [
      {
        heading: "The Market Challenge",
        paras: [
          "FSS had 35 years of presence in Indian banking infrastructure. That was both an asset and a liability. Banks knew FSS as a reliable payments partner. They did not know FSS as the company that had rebuilt its entire technology stack on a 12-core microservices architecture. Changing a deeply held perception required a different approach than a standard product launch.",
          "The transformation conversation was also not new. Indian bank CIOs had heard the modernisation pitch from every vendor for a decade and had developed a sophisticated resistance to it. Being heard required being different in form, not just in content.",
        ],
      },
      {
        heading: "The Strategic Call",
        paras: [
          "The campaign was built on a single insight: in a market saturated with polished vendor content, authenticity was the differentiator. Rather than producing a corporate product launch video, FSS filmed unscripted conversations with its CEO, Chief Architect, and VP of Strategy, three individuals that bank technology executives already knew personally from years of industry interactions.",
          "No scripts. No teleprompters. Shot in the office. The talking points were agreed in advance; the words were their own. The result was content that bankers forwarded to colleagues with a note saying \u201Cworth watching,\u201D which no brand-produced asset had ever achieved.",
        ],
      },
    ],
    execTitle: "The Execution Sequence",
    exec: [
      { label: "01", title: "Powered by BLAZE: the naming strategy", body: "Before launch day, every existing FSS product was relabelled \u201CPowered by BLAZE.\u201D This embedded the new platform identity into every active customer relationship simultaneously, ensuring the BLAZE narrative appeared across all existing commercial touchpoints from day one." },
      { label: "02", title: "Simultaneous press across three regions", body: "A coordinated press release across India, Middle East, and Africa financial media created category-level attention before any targeted outreach began. The simultaneity mattered: it prevented the story from feeling like a local announcement and positioned BLAZE as a global platform narrative." },
      { label: "03", title: "Weekly video release cadence", body: "One leadership video released per week over four weeks: business case, technology architecture, product benefits, and implementation experience, each angle targeting a different decision-maker. Videos promoted on YouTube, social media, and shared by the sales team in active account conversations." },
      { label: "04", title: "Six-week drip email to 10,000+ contacts", body: "Each email addressed one specific BLAZE capability and linked to the relevant video. The sequence was designed so that a CIO who opened every email received a complete education in BLAZE\u2019s differentiation without ever visiting the website." },
      { label: "05", title: "Simply Payments event", body: "The campaign\u2019s live culmination: an FSS-hosted event attended by top officials from every major Indian bank. Rather than a product showcase, it was structured as a dialogue, letting banks voice their actual modernisation concerns and shaping FSS\u2019s commercial response in real time." },
      { label: "06", title: "UPI as the commercial wedge", body: "Rather than leading with a full platform migration proposal, every sales conversation began with UPI scalability: a live operational need, measurable within weeks, and politically safe for the CIO to approve. BLAZE\u2019s demonstrated UPI performance created the trust required to expand the conversation." },
    ],
    insight: "The most effective B2B content in financial services is not the most produced. It is the most credible. A banker who has met your CEO in a conference room trusts a 4-minute unscripted video from him more than a 40-page professionally designed pitch deck. The campaign\u2019s 54% CTOR confirmed it.",
    listings: ["G2 \u2014 Payment Processing \u00b7 Core Banking \u00b7 Mobile Banking", "SoftwareSuggest \u2014 India Market", "Capterra \u2014 Banking Software", "Gartner Peer Insights \u2014 Digital Banking Platforms", "IDRBT Research Publications", "NASSCOM"],
  },

  // 03 ─ India Switch
  {
    id: "03", num: "03", region: "India", geo: "India \u00b7 Philippines",
    headline: "Selling permission to migrate before selling the product",
    tagline: "Indian banks knew their EFT switches needed replacing. The barrier was not budget. It was the fear of losing 20 years of undocumented custom logic. We made de-risking the product.",
    tags: ["Product: FSS Tango Switch", "Exclusive Lusis Tango India Partner", "Consulting-Led GTM", "Closed-Door CXO Events"],
    heroValue: "50%", heroLabel: "TCO reduction vs legacy operation",
    metricsTitle: "Pipeline Accounts",
    metrics: [
      { value: "SBI",        label: "State Bank of India" },
      { value: "Kotak \u00b7 PNB", label: "Private + Public Sector" },
      { value: "BancNet",    label: "Philippines \u00b7 International" },
      { value: "50%",        label: "TCO Reduction vs Legacy Operation" },
    ],
    problems: [
      {
        heading: "The Incumbency Paradox",
        paras: [
          "The EFT switch is the most operationally critical piece of infrastructure a bank runs. Over 40 years on ACI Base24, some institutions had accumulated 800+ change requests, each one a small customisation that embedded itself into the platform\u2019s logic. The result: NPCI certification cycles that took months, change request lead times of 6 to 9 months, and infrastructure too fragile to support the innovation velocity that UPI demanded.",
          "The Incumbency Paradox, the idea that 20 years of customisation debt had become the very thing preventing modernisation, gave the market a framework to understand its own problem. The campaign named the paradox before proposing the solution.",
        ],
      },
      {
        heading: "Phantom Logic and the Customization Audit",
        paras: [
          "The real barrier was what we called Phantom Logic: proprietary ISO8583 field mappings, hard-coded NPCI and RBI regulatory patches, multi-institution routing rules that existed in no manual. Bank CIOs were afraid, not of the new switch, but of losing this invisible institutional knowledge in the migration.",
          "The Customization Audit was designed as a response to that fear. A structured, paid consulting engagement that documented a bank\u2019s Phantom Logic in full before any migration decision was made. It converted fear into a first commercial step. The audit was the entry product. The switch was the eventual outcome.",
        ],
      },
    ],
    execTitle: "The 4-Phase Migration Architecture",
    exec: [
      { label: "Audit",   title: "Source-code-level discovery", body: "Phase one went beyond documentation. FSS reverse-engineered device handler flows, proprietary patch dependencies, and undocumented routing logic at source code level, the analysis that separates successful migrations from failed ones." },
      { label: "Shadow",  title: "Parallel processing for parity", body: "The new switch processed the same transaction stream as the legacy system simultaneously. Parity was verified before any traffic was diverted. No bank was asked to trust; they were invited to watch the proof." },
      { label: "Pilot",   title: "UPI and PG as the wedge entry", body: "High-velocity API traffic was migrated first: the channels easiest to test, fastest in performance improvement, and most visible to stakeholders. The pilot produced the internal champions required to approve full decommissioning." },
      { label: "Scale",   title: "Full legacy decommission", body: "ATM and core switch traffic migrated last, after stability was demonstrated across three prior phases. Change request lead times fell from 6 to 9 months down to 4 to 6 weeks. NPCI certification moved from slow monolith cycles to instant API-based deployment." },
      { label: "GTM",     title: "Closed-door Switch Seminar", body: "The primary demand generation vehicle was a closed-door roundtable with 20 bank CIOs. The agenda covered regulatory preparedness, cost of legacy, and peer migration experiences, not FSS product features. FSS was the convener. Product relevance emerged organically." },
      { label: "Outreach",title: "Personalised executive gift programme", body: "Named prospect banks received a curated physical package: migration whitepaper, account-specific TCO assessment pre-populated with publicly available transaction volume data, and a personal letter from the Global Business Head. Physical format was deliberate in a market saturated with digital outreach." },
    ],
    quote: "Innovation cannot be built on fragmented foundations. To secure the future, we must decode the past.",
    quoteAttr: "Strategic Migration Bridge, FSS Switch GTM Narrative",
    insight: "When a buyer\u2019s primary fear is losing what they\u2019ve built over 20 years, the most powerful commercial move is to offer to preserve it first. The Customization Audit converted the competitor\u2019s greatest weapon, proprietary lock-in, into FSS\u2019s entry point. We didn\u2019t compete with ACI. We decoded it.",
    listings: ["G2 \u2014 Payment Processing \u00b7 Banking Infrastructure", "IBSi Sales League Tables \u2014 EFT Switch", "Gartner Peer Insights \u2014 Retail Banking Platforms", "The Paypers", "Fintech Futures"],
  },

  // 04 ─ India PG
  {
    id: "04", num: "04", region: "India", geo: "India",
    headline: "Making payment failure sound like a business problem, not a tech one",
    tagline: "The FSS Payment Gateway campaign never used the words \u201Chigh availability\u201D or \u201Cfault-tolerant.\u201D It talked about lost customers and bleeding revenue, and the CTOs noticed.",
    tags: ["Products: FSS Payment Gateway + Paypath", "Intelligent Payment Routing", "Merchant Acquiring \u00b7 White-Label", "4-Week Organic + Paid Campaign"],
    heroValue: "+10%", heroLabel: "Payment success rate via Paypath",
    metricsTitle: "Product Proof Points",
    metrics: [
      { value: "20,000", label: "Transactions Per Second Capacity" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "+10%",   label: "Payment Success Rate via Paypath" },
      { value: "300+",   label: "Gateway Integrations" },
    ],
    problems: [
      {
        heading: "The Positioning Problem",
        paras: [
          "The words \u201Cbank-grade payment infrastructure\u201D had become a liability. Merchants associated bank payment systems with slow onboarding, friction-heavy UX, and legacy reliability. Fintech aggregators had reset the market\u2019s expectations: go live in minutes, not weeks; developer-first APIs; clean dashboards. FSS PG was technically superior on throughput, compliance, and institutional trust. But it was losing the perception battle.",
          "The campaign\u2019s strategic call: stop defending the \u201Cbank-grade\u201D label and start attacking the fintech narrative\u2019s weakness. Fintechs could not offer bank-level compliance, institutional trust, or white-label capability. FSS could. The positioning became: bank-grade, fintech-fast.",
        ],
      },
      {
        heading: "Converting Specs Into Stakes",
        paras: [
          "Every technical specification was rewritten as a consequence statement. 20,000 TPS became: \u201CThe moment your system slows, your customer leaves. At 20,000 TPS, ours never does.\u201D 99.99% uptime became: \u201COne failed transaction can erase months of trust.\u201D Paypath\u2019s routing intelligence became: \u201CTen percent more successful payments is millions in revenue you\u2019re currently leaving behind.\u201D",
          "The campaign spoke to the P&L, not the architecture. Bank executives who had ignored technical product sheets engaged immediately with revenue language.",
        ],
      },
    ],
    execTitle: "Campaign Execution",
    exec: [
      { label: "Week 1",    title: "Category establishment", body: "Two posts establishing FSS PG in the market, one from the brand angle and one from the merchant angle. Week one was about reach; weeks two through four were about conversion." },
      { label: "Week 2",    title: "Technical depth for CIOs", body: "Architecture and throughput posts targeting the developer and CIO audience: 20,000 TPS, seamless NPCI integration, AI-driven fraud prevention. The content was technical in proof point, commercial in framing." },
      { label: "Week 3",    title: "The Paypath story", body: "Two posts dedicated entirely to payment routing failure as a revenue problem. Post one: \u201CWhat happens when your payment fails?\u201D Post two: an explainer carousel showing how Paypath routes every transaction like a traffic controller, finding the optimal path in milliseconds." },
      { label: "Week 4",    title: "Proof and vision", body: "Data-led proof post (+10% success, 300+ gateways, 99.99% uptime) followed by a visionary close: \u201CPayments are not back-office plumbing. They are the lifeblood of growth.\u201D The four-week arc took the audience from introduction to conviction." },
      { label: "Always-on", title: "Employee video series", body: "Named FSS specialists each produced a direct-to-camera proof-point video from their domain. These circulated through the sales team\u2019s personal networks, reaching bank contacts that corporate content never touched." },
      { label: "Paypath",   title: "ProductHunt launch", body: "Paypath was launched independently on ProductHunt, framed for the fintech developer and startup audience: \u201CIntelligent payment routing that banks finally have.\u201D The ProductHunt audience influenced bank innovation team vendor shortlists, a channel no competitor was using." },
    ],
    insight: "In enterprise payments, every technology claim must be convertible to a P&L impact before it lands at the decision-making level. The team that reads your CTO blog post and the board that approves the budget are two different audiences, and the campaign must move both. Writing for the CFO\u2019s language while targeting the CTO\u2019s feed is not a contradiction. It is the whole strategy.",
    listings: ["G2 \u2014 Payment Gateway \u00b7 Payment Processing \u00b7 Fraud Detection", "SoftwareSuggest \u2014 India Market", "Capterra \u2014 Payment Gateway", "GetApp \u2014 Financial Technology", "ProductHunt \u2014 Paypath Launch", "RBI Payment Aggregator Registry"],
  },

  // 05 ─ Middle East
  {
    id: "05", num: "05", region: "Middle East", geo: "UAE \u00b7 KSA \u00b7 Qatar \u00b7 Oman \u00b7 Bahrain",
    headline: "16 leads. 65,417 people. 14 days.",
    tagline: "In a market where relationships govern everything, we built a LinkedIn campaign so frictionless that senior GCC bankers completed a lead form in a single tap. Emirates NBD. Alrajhi. FAB. ADCB.",
    tags: ["Product: FSS Smart Recon", "AI-Driven Reconciliation", "LinkedIn Lead Generation", "UAE \u00b7 KSA \u00b7 Qatar \u00b7 Oman \u00b7 Bahrain"],
    heroValue: "16", heroLabel: "Qualified director-level leads in 14 days",
    metricsTitle: "Campaign Results",
    metrics: [
      { value: "99,730", label: "Total Impressions" },
      { value: "65,417", label: "Unique Members Reached" },
      { value: "0.63%",  label: "CTR (Benchmark: 0.4 to 0.6%)" },
      { value: "2,783",  label: "Director-Level and Above Impressions" },
    ],
    problems: [
      {
        heading: "Why Reconciliation, Why Now",
        paras: [
          "GCC banks were caught between two compounding pressures. Digital transaction volumes were growing at double-digit rates across UAE, Saudi Arabia, and Qatar, driven by government digitisation mandates, open banking frameworks, and fintech adoption. But reconciliation infrastructure had not scaled with the volume. Exception queues were growing. Compliance reporting was falling behind. The gap between what the system could process and what the volume demanded was becoming an audit risk.",
          "The buying trigger was regulatory as much as operational: SAMA\u2019s Open Banking Framework, CBUAE\u2019s ISO 20022 transition, and CBQ\u2019s expanding compliance calendar were all increasing the reconciliation surface area simultaneously. Banks were forced to act, which meant the marketing task was interception, not persuasion.",
        ],
      },
      {
        heading: "The Friction Removal Strategy",
        paras: [
          "The GCC banking market is relationship-led. Every study of digital marketing in this geography confirms that conversion rates are lower than comparable Western markets at equivalent impression volumes, because decision-makers expect relationship initiation, not form completions. The campaign was designed around exactly this insight.",
          "LinkedIn\u2019s native lead generation form auto-populated from the prospect\u2019s professional profile. On clicking the ad, the contact saw their own name, email, title, and company already filled in. The act of converting required one tap to confirm. Removing that final point of friction produced a CTR of 0.63%, above the benchmark, and 16 qualified leads from Director level and above in 14 days.",
        ],
      },
    ],
    execTitle: "Campaign Architecture",
    exec: [
      { label: "Audience",  title: "Named + function targeting layered", body: "Tier 1 accounts (Emirates NBD, Alrajhi, ADCB, FAB, QNB, Riyad Bank) targeted by company name. Broader segment targeted by function (Finance and Operations), seniority (Director and above), and industry (Banking and Financial Services) across UAE, Bahrain, Saudi Arabia, Oman, Qatar, Yemen." },
      { label: "Creative",  title: "Two variants, one winner", body: "Two ad variants tested: one led with compliance deadline urgency, one led with operational cost reduction. The compliance creative outperformed by 22% CTR within five days. Budget was rebalanced accordingly. The insight: GCC bank executives respond to regulatory pressure faster than cost pressure." },
      { label: "Follow-up", title: "48-hour lead qualification", body: "Every form completion was assessed within 48 hours for institution type, seniority, and fit. Priority leads escalated immediately to the regional sales team. A three-email nurture sequence, product walkthrough, Middle East case study, virtual demo invitation, was deployed to all 16 within the week." },
      { label: "Reach",     title: "Combined ME + Africa programme", body: "The Smart Recon campaign ran simultaneously across Middle East and Africa, reaching 1,02,291 banking professionals across 150+ institutions, the first time FSS had executed a coordinated, contact-level digital programme across both geographies at once." },
      { label: "Press",     title: "Regional media placement", body: "Campaign supported by editorial coverage in The Paypers (MENA section) and IBSi\u2019s Middle East Banking Technology Review, both key reference publications for GCC bank procurement teams conducting vendor research before shortlisting." },
      { label: "Context",   title: "Oman dominance as credibility anchor", body: "FSS holds 100% market share for debit card transaction processing in Oman, Bahrain, and Kuwait. In the Oman-targeted segment, this fact was woven into the ad copy, converting the impression from cold outreach into a peer reference in markets where FSS was already the infrastructure." },
    ],
    results: [
      { value: "16",        label: "Qualified Leads Generated" },
      { value: "Emirates NBD", label: "Top Engaged Institution" },
      { value: "FAB",       label: "Contact to Sales Conversation in 30 Days" },
      { value: "1,02,291",  label: "Banking Professionals Reached, ME + Africa" },
    ],
    insight: "In markets where personal relationships dominate, digital channels are not a substitute for those relationships. They are the mechanism for creating the conditions under which those relationships begin. When digital removes all friction from the first act of engagement, even the most relationship-led buyers complete it. The relationship still has to close. But the campaign gets it started.",
    listings: ["G2 \u2014 Financial Reconciliation Software", "Gartner Peer Insights \u2014 Financial Close & Consolidation", "The Paypers \u2014 MENA", "IBSi \u2014 ME Banking Technology Review", "Fintech Galaxy \u2014 MENA Directory"],
  },

  // 06 ─ Philippines
  {
    id: "06", num: "06", region: "Philippines", geo: "Philippines \u00b7 APAC",
    headline: "123 institutions. 7 buyer profiles. One campaign.",
    tagline: "The Philippines banking system is one of the most fragmented in Asia. We turned that fragmentation into a targeting advantage, and posted a CTR twice the B2B benchmark.",
    tags: ["Product: FSS Smart Recon", "BLAZE \u00b7 PG \u00b7 Paypath", "Phase 1: Awareness \u00b7 Phase 2: Lead Gen", "BSP Regulatory Alignment"],
    heroValue: "1.23%", heroLabel: "CTR, 2x the B2B benchmark",
    metricsTitle: "Phase 1 Results",
    metrics: [
      { value: "162,968", label: "Total Impressions" },
      { value: "2,000",   label: "Clicks" },
      { value: "1.23%",   label: "CTR, 2x B2B Benchmark" },
      { value: "1,780",   label: "CXO-Level Impressions" },
    ],
    problems: [
      {
        heading: "Why the Philippines, and Why Now",
        paras: [
          "BSP had set a national mandate: 50% of retail payments digital, and a compliance calendar that was forcing every institution in the Philippine banking system, from BDO to the smallest rural cooperative, to upgrade their back-office infrastructure. The problem was universal. The solutions were scattered. And FSS already had a structural advantage that no other international vendor possessed: BancNet, the national ATM network and interbank payment switch, was already an FSS customer.",
          "That single relationship changed everything. Entering the Philippines was not a cold market entry. It was expanding from an existing anchor into a highly segmented ecosystem where different types of institutions had very different pain points and needed very different messages to hear the same story.",
        ],
      },
      {
        heading: "The Segment Science",
        paras: [
          "Rather than running one message across 123 institutions, the campaign built seven segment-specific communication frameworks. Each segment received its own pain point articulation, its own message theme, and its own creative hook. Universal and commercial banks heard \u201CReplace fragile cores with future-ready platforms.\u201D Rural banks heard \u201CReconcile like a Tier 1 bank. No coding required.\u201D Digital banks heard \u201CNo-lag. No backlog. Just real-time recon.\u201D The same product, seven different conversations.",
          "The India proof point anchored all seven. India had solved at 1.4 billion scale the exact fragmentation problem the Philippines was managing. FSS had powered that infrastructure. The credibility transfer was immediate.",
        ],
      },
    ],
    execTitle: "Two-Phase Market Entry",
    exec: [
      { label: "Phase 1",    title: "Smart Recon as the wedge", body: "Smart Recon was selected as the market entry product because reconciliation was the one operational problem universal to every segment, from BDO to the smallest cooperative bank. The first campaign created awareness with all 123 targeted institutions simultaneously through segmented LinkedIn audiences." },
      { label: "Phase 2",    title: "Portfolio expansion by segment", body: "After Smart Recon established FSS as a credible partner, Phase 2 overlaid product-specific campaigns: BLAZE modernisation for top-tier banks; QR and RTP messaging for all; Payment Gateway and Paypath for fintechs and tier-one commercial banks. Each segment\u2019s Phase 1 engagement data informed Phase 2 audience targeting." },
      { label: "Email",      title: "Three-stage outreach sequence", body: "A structured email sequence across 300 named contacts: introduction (India AI innovation narrative), product (Smart Recon 90% faster reconciliation cycles), and meeting request (Global Business Head visiting Manila). Each email referenced the previous one. The sequence produced a 10% open rate, strong for a cold audience in a new market." },
      { label: "InMail",     title: "LinkedIn InMail from sales team", body: "Personalised LinkedIn InMail deployed by the APAC sales team to named contacts at BDO, BPI, Metrobank, RCBC, and Union Bank, the five highest-engagement accounts from the Phase 1 impression data. The InMail referenced the campaign and requested a direct conversation with the visiting Business Head." },
      { label: "In-Person",  title: "Manila visit as campaign culmination", body: "The Global Business Head\u2019s visit to Manila was structured as the conversion mechanism for Phase 1 digital engagement. In-person meetings secured at BDO, BPI, Metrobank, and BancNet. The visit transformed 162,968 impressions into a set of qualified commercial conversations." },
      { label: "Association",title: "Fintech Philippines Association", body: "Formal engagement with the Fintech Philippines Association was initiated in Phase 2 as a channel for event co-hosting and local market credibility, positioning FSS as a market participant rather than a foreign vendor." },
    ],
    insight: "A fragmented market is not a distribution problem. It is a targeting opportunity. When you have the discipline to build seven segment-specific messages instead of one generic one, the click-through rates tell the story: 1.23% against a 0.5% benchmark. The Philippine banking system\u2019s heterogeneity was the campaign\u2019s advantage, not its obstacle.",
    listings: ["G2 \u2014 Financial Reconciliation \u00b7 Banking Operations", "SoftwareSuggest \u2014 BSP Compliance Context", "Capterra \u2014 Rural Bank and Cooperative Use Cases", "ProductHunt \u2014 Paypath Launch", "Fintech Philippines Association Directory", "BSP Fintech Registry"],
  },

  // 07 ─ Europe
  {
    id: "07", num: "07", region: "Europe", geo: "UK \u00b7 Germany \u00b7 Netherlands \u00b7 France",
    headline: "How one Tier 1 win became a continent-wide entry strategy",
    tagline: "The GTM for Europe started with a SWOT that honestly listed \u201CNo local presence, no marketing at events, perceived as non-European\u201D as real weaknesses, then built the entire strategy around neutralising each one.",
    tags: ["Products: ACS \u00b7 Card Issuing \u00b7 3DS MPI", "Anchor: NatWest UK, First Tier 1 Live", "Scheme Partnerships: Mastercard \u00b7 Discover", "Europe-India Cross-Border Solution"],
    heroValue: "NatWest", heroLabel: "First UK Tier 1 bank live on card issuing",
    metricsTitle: "Market Milestones",
    metrics: [
      { value: "NatWest", label: "First UK Tier 1 Bank Live, Issuing" },
      { value: "3 Live",  label: "EMP \u00b7 Vopy (Issuing) \u00b7 FairPlay (Acquiring)" },
      { value: "2 Saved", label: "FairPlay + EMP, Won Back from Churn Risk" },
      { value: "PSD3",    label: "Compliance Calendar Driving Demand" },
    ],
    problems: [
      {
        heading: "The Honest Starting Point",
        paras: [
          "The Europe GTM began with an internal SWOT that named its weaknesses directly: no local presence, no language capability beyond English, no marketing at European industry events, a perception as a distant Asian technology vendor. Most GTM strategies bury weaknesses in aspirational language. This one listed them as headlines and built the strategy around addressing each one specifically.",
          "The NatWest go-live changed the fundamental dynamic. When the UK\u2019s largest retail bank selects a vendor for card issuing infrastructure, the \u201Cnon-European\u201D objection loses its force. The strategy became: use NatWest as the proof shield for every subsequent conversation, and build the rest of the market entry on top of that single reference.",
        ],
      },
      {
        heading: "The Europe-India Wedge",
        paras: [
          "The most distinctive element of the European GTM was a wedge that no competitor was approaching: a payments solution specifically for Indian tourists and business travellers using European payment infrastructure, competing directly with Worldline\u2019s cross-border product.",
          "The logic was sound. London, Frankfurt, Amsterdam, and Paris were all top-five destinations for Indian outbound travel, a market exceeding 25 million annual trips. European processors handling India-origin card traffic had a specific operational need. FSS, with deep knowledge of RuPay, Indian bank card specifications, and NPCI integrations, could offer what no European vendor matched. It was a wedge that converted FSS\u2019s India strength into a European business case.",
        ],
      },
    ],
    execTitle: "The Six-Initiative Architecture",
    exec: [
      { label: "01",      title: "Leverage existing customers first", body: "Cross-sell and upsell plans developed for NatWest, EMP, Vopy, and FairPlay before any new prospect outreach. Existing relationships were the most cost-efficient pipeline available, and each additional product sold to a live customer strengthened the reference value of that account." },
      { label: "02",      title: "Scheme partnership as a channel", body: "Partnerships initiated with Mastercard and Discover/Diners, not for co-marketing, but as a customer referral channel. When scheme relationship managers recommend 3DS implementation partners to their issuer clients, FSS\u2019s position on that list is a direct pipeline mechanism." },
      { label: "03",      title: "PSD3 compliance as the demand signal", body: "Every European card issuer and acquirer had a PSD3 compliance timeline. The GTM content strategy was built entirely around that calendar: a PSD3 readiness guide positioned FSS as an authority on the transition, distributed at Sibos and Money20/20 Europe where the timing was most acute." },
      { label: "04",      title: "NatWest case study as the door-opener", body: "A detailed NatWest case study, covering implementation timeline, SCA compliance outcome, and technical team commentary, was developed as the single most important sales asset for Europe. Every prospect conversation opened with: \u201CLet me share what NatWest found when they evaluated this decision.\u201D" },
      { label: "05",      title: "Europe-India solution for processors", body: "Three UK processors with demonstrably high Indian card traffic volumes received a tailored two-page brief on the cross-border capability. The proposal positioned FSS not as a general-purpose payments vendor but as the one provider with deep technical knowledge of both the Indian and European payment ecosystems simultaneously." },
      { label: "06",      title: "Event presence, from zero to two", body: "Zero European event presence was a listed weakness in the SWOT. The FY24 plan corrected this with confirmed Sibos and Money20/20 Europe attendance, both with a structured meeting agenda targeting European bank technology contacts, not a booth, but a conversation programme." },
    ],
    insight: "Acknowledging a weakness and then neutralising it with undeniable proof creates more trust than claiming to have no weaknesses at all. NatWest was not just a customer. It was the answer to every objection the European market had about FSS. One reference, correctly leveraged, becomes the entire GTM strategy\u2019s credibility infrastructure.",
    listings: ["G2 \u2014 Authentication Software \u00b7 Fraud Detection", "Gartner Peer Insights \u2014 Digital Banking Platforms \u00b7 Card Management", "Finextra \u2014 NatWest Go-Live Coverage", "Payments Cards & Mobile (PCM)", "Mastercard Partner Directory \u2014 Certified 3DS Implementation Partner", "Capterra + GetApp \u2014 Banking Security"],
  },

  // 08 ─ South East Asia
  {
    id: "08", num: "08", region: "South East Asia", geo: "Vietnam \u00b7 Indonesia",
    headline: "The market brief was the first product we sold",
    tagline: "In Vietnam and Indonesia, FSS had no name recognition. So we walked into the first conversation not with a pitch deck, but with a 30-page research brief on the bank\u2019s own market. That changed everything.",
    tags: ["Markets: Vietnam \u00b7 Indonesia", "Products: Smart Recon \u00b7 Switch \u00b7 BLAZE \u00b7 PG", "Stage: Market Intelligence + Entry", "Regulatory Hook: SBV \u00b7 BI-FAST \u00b7 QRIS"],
    heroValue: "94%", heroLabel: "BI-FAST national participation, Indonesia",
    metricsTitle: "Market Opportunity",
    metrics: [
      { value: "8%",     label: "Vietnam GDP Growth Rate" },
      { value: "275M",   label: "Indonesia Population" },
      { value: "94%",    label: "BI-FAST National Participation (Indonesia)" },
      { value: "80-100%",label: "SBV Target: Annual Mobile Payment Value Growth" },
    ],
    problems: [
      {
        heading: "The Entry Condition",
        paras: [
          "Vietnam and Indonesia presented a payment technology opportunity defined by urgency on both sides. Vietnam\u2019s State Bank (SBV) had mandated that mobile payment transaction volume grow 50 to 80% by 2025 and transaction value 80 to 100% annually. Indonesia\u2019s BI-FAST instant payment system had achieved 94% national participation. In both markets, digital transaction volumes were growing faster than legacy back-office infrastructure could process them.",
          "The competitive landscape in both markets included global vendors (ACI Worldwide, Worldline, OpenWay, BPC, Hitachi Payments) and strong local players. FSS had no existing market presence. The entry challenge was not capability: it was credibility.",
        ],
      },
      {
        heading: "Intelligence Before Presence",
        paras: [
          "The strategy inverted the standard market entry sequence. Rather than entering with a campaign and following with research, FSS produced a comprehensive market intelligence brief for each geography before any commercial outreach began. The brief covered the competitive landscape with named vendors and their known accounts, the regulatory calendar and central bank mandates for the next 18 months, the five largest banks by transaction volume and their estimated technology stack, and the specific infrastructure gaps that existing solutions were failing to address.",
          "This document became the first product. When FSS walked into its first bank meeting in Vietnam or Indonesia, the opening was not \u201Clet us tell you what we do.\u201D It was \u201Clet us share what we found in your market.\u201D The credibility transfer was immediate, and it was one that no competitor had attempted.",
        ],
      },
    ],
    execTitle: "Regulatory-Led Entry Strategy",
    exec: [
      { label: "Vietnam",    title: "SBV alignment as the hook", body: "Every Vietnam conversation led with alignment to SBV\u2019s cashless economy mandate and NAPAS integration capability. FSS Smart Recon was positioned as the operational scaling layer that allowed banks to meet SBV\u2019s growing digital volume targets without expanding their reconciliation teams." },
      { label: "Indonesia",  title: "BI-FAST as the wedge", body: "Indonesia\u2019s BI-FAST instant payment mandate was creating immediate switch capacity requirements for participating banks. FSS Switch modernisation was positioned as the infrastructure response to BI-FAST\u2019s real-time settlement demands, not a future investment, but a present operational necessity." },
      { label: "Partners",   title: "Local partner identification first", body: "Both markets showed a clear pattern: global vendors won through local system integrator partnerships. FSS\u2019s Phase 1 GTM included a structured partner identification process in both Vietnam and Indonesia, targeting established integrators with existing top-bank relationships as the primary co-sell route." },
      { label: "Content",    title: "ASEAN Payments Modernisation Report", body: "A market-specific thought leadership report was produced covering SBV mandates, BI-FAST trajectory, and the infrastructure gaps that existing solutions failed to address. Distributed at Vietnam International Payment Exhibition and Jakarta Fintech Festival, establishing FSS as a market voice before establishing it as a market vendor." },
      { label: "Regulatory", title: "Central bank directory and sandbox", body: "Applications submitted to SBV\u2019s Regulatory Sandbox (Vietnam) and Bank Indonesia Fintech Office directory, the primary discovery mechanisms through which Vietnamese and Indonesian banks find and evaluate international payment technology vendors during procurement." },
      { label: "Language",   title: "Executive summaries in local language", body: "One-page summaries of FSS\u2019s core value proposition translated into Vietnamese and Bahasa Indonesia for use in meetings where senior executives did not default to English in technical procurement discussions, a common reality at the Deputy Director and CTO level in both markets." },
    ],
    insight: "In a market where you have no name recognition, the first sale is not the product. It is the proof that you understand the market better than your buyer expected you to. A 30-page market brief, personalised to a specific bank\u2019s context, does more GTM work in one meeting than six months of digital advertising. Intelligence is the highest-value cold outreach in new markets.",
    listings: ["G2 and Capterra \u2014 APAC Banking Software", "ASEAN Fintech Network Directory", "SBV Fintech Regulatory Sandbox, Vietnam", "Bank Indonesia Fintech Office Directory", "Singapore Fintech Festival \u2014 ASEAN Vendor Registry"],
  },

  // 09 ─ AI Portfolio
  {
    id: "09", num: "09", region: "AI Portfolio", geo: "India \u00b7 Middle East \u00b7 Europe",
    headline: "When every vendor claims AI, sovereignty becomes the differentiator",
    tagline: "FSS didn\u2019t launch AI products. It launched a governance architecture, a sovereignty model, and a new category: the AI-native payments operating system. The EU AI Act provided the deadline. The market provided the urgency.",
    tags: ["Blaze Cosmos AI \u00b7 Merlin Suite \u00b7 FAIRSPOT", "Sovereign AI \u00b7 AI-Native Enterprise \u00b7 Responsible AI", "EU AI Act Aligned \u00b7 ISO 27001 \u00b7 OECD AI Principles", "India \u00b7 Middle East \u00b7 Europe"],
    heroValue: "USD 5M+", heroLabel: "Pipeline target, 12 months",
    metricsTitle: "Campaign Targets",
    metrics: [
      { value: "3",       label: "Geographies Running Simultaneously" },
      { value: "15",      label: "CXO Targets per Geography per Quarter" },
      { value: "USD 5M+", label: "Pipeline Target, 12 Months" },
      { value: "30%",     label: "Target: Masterclass to Architecture Workshop Rate" },
    ],
    problems: [
      {
        heading: "The Credibility Problem in Enterprise AI",
        paras: [
          "By 2025, every enterprise software vendor had attached the word AI to every product regardless of actual capability. Bank CIOs had developed a sophisticated resistance to AI claims, and a specific, board-level concern that no vendor had addressed directly: data sovereignty. Deploying public LLMs in banking operations meant transaction data, customer records, and risk models potentially leaving the bank\u2019s control. That was not a theoretical concern. It was a CISO mandate.",
          "FSS\u2019s entire AI portfolio differentiation was built on one answer to that concern: sovereign deployment. Neysa GPU infrastructure, on-premise options, air-gap configurations. Data that never moved. Governance built into every model workflow. This was not a feature. In 2025\u2019s regulatory environment, it was the only credible entry point into a conversation with a bank\u2019s technology leadership.",
        ],
      },
      {
        heading: "Three Pillars, One Claim",
        paras: [
          "The campaign architecture was built around three interlocking pillars. Sovereign AI: FSS owns its infrastructure and your data stays in your control, backed by Neysa GPU and on-premise deployment. AI-Native Enterprise: AI is embedded across every layer of the platform, Blaze Cosmos as the operating system, Merlin Suite for internal productivity, Pluto for monitoring, AI Chargeback for revenue protection. Responsible AI: every model is governed, explainable, and auditable, aligned to OECD AI Principles, the EU AI Act, STIA, and ISO 27001.",
          "The master narrative that unified the three pillars: FSS is building the AI-native future of payments with sovereign infrastructure, governed intelligence, and real-world scale. This was a category claim, not a product claim. It positioned FSS as the infrastructure layer on which AI-native banking would be built, not as one of many AI tools competing for budget.",
        ],
      },
    ],
    execTitle: "Campaign Execution",
    exec: [
      { label: "Flagship",  title: "The AI Masterclass programme", body: "A closed-door CXO education programme targeting C-suite executives at banks across all three geographies. The agenda covered AI-native banking infrastructure in practice, data sovereignty solutions, and EU AI Act compliance, not product features. FSS convened; product relevance emerged from the conversation. Follow-up within 48 hours: personalised insight note, architecture workshop invitation, pilot proposal." },
      { label: "Research",  title: "AI Adoption Readiness Report", body: "A commissioned research report on AI adoption readiness in banking, published under FSS sponsorship with independent analyst commentary. Distributed through banking media, event handouts, and gated LinkedIn download. The report seeded FSS\u2019s framing of the AI readiness problem before any product conversation began." },
      { label: "FAIRSPOT",  title: "Governance as a content series", body: "A four-part content series, article, infographic, video, case study, unpacking FAIRSPOT\u2019s 4-layer AI governance framework. Positioned not as an FSS product feature but as practical guidance for bank AI governance committees navigating EU AI Act compliance. Distributed through banking compliance media channels." },
      { label: "Europe",    title: "EU AI Act as the forcing function", body: "The European campaign was timed precisely to the EU AI Act implementation news cycle. Every content asset included a compliance mapping: how FSS AI products aligned to specific articles, audit trail requirements, and explainability mandates. The EU AI Act compliance checklist was distributed at Money20/20 Europe." },
      { label: "Launch",    title: "Merlin Quill on ProductHunt", body: "Merlin Quill, FSS\u2019s secure enterprise AI co-pilot, was launched on ProductHunt targeting the fintech developer and startup community. The narrative: \u201Cno data leakage, no public LLM risk, built for the compliance requirements of financial services.\u201D ProductHunt\u2019s AI Tools audience influenced bank innovation team shortlists, a high-quality channel no financial services competitor was using." },
      { label: "Gartner",   title: "Analyst seeding for Magic Quadrant positioning", body: "Briefings given to Gartner, IDC, and Forrester before the campaign launch. The objective: ensure FSS\u2019s Sovereign AI framing shaped the evaluation criteria appearing in analyst reports and Magic Quadrant assessments, because those criteria directly influenced how bank procurement committees wrote their RFPs for AI platform evaluation in 2026." },
    ],
    quote: "Banks don\u2019t need more AI tools. They need an operating system that makes every payment workflow AI-native, with sovereignty, governance, and scale built in from the start.",
    quoteAttr: "Blaze Cosmos AI Campaign, Master Narrative",
    results: [
      { value: "3",        label: "Geographies Running in Parallel: India, ME, Europe" },
      { value: "EU AI Act",label: "Compliance Architecture Built Into Every Product" },
      { value: "Top 5",    label: "ProductHunt AI Tools Target, Merlin Quill Launch" },
      { value: "2026",     label: "Gartner Magic Quadrant Long-List Submission" },
    ],
    insight: "In a market where every vendor claims AI capability, the differentiator is not the AI itself. It is the governance architecture around it. FAIRSPOT, sovereign deployment, and EU AI Act alignment are not compliance features: they are the commercial argument that converts a sceptical bank CTO into an early adopter. The category claim is more durable than any product claim.",
    listings: ["G2 \u2014 AI Platforms \u00b7 MLOps \u00b7 AI Governance", "ProductHunt \u2014 Merlin Quill (AI Tools)", "Capterra \u2014 AI Platform \u00b7 Data Management", "SoftwareSuggest \u2014 Enterprise AI Tools \u00b7 Banking", "Gartner Peer Insights \u2014 AI Platforms", "IBSi \u2014 AI in Banking Annual Report", "The Paypers \u2014 AI in Payments", "Hugging Face Model Hub"],
  },
];

// ── Sticky Nav ─────────────────────────────────────────────────────────────

function StickyNav({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[200] hidden xl:flex flex-col gap-0.5 p-2.5 rounded-2xl opacity-20 hover:opacity-100 transition-opacity duration-300"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {CASES.map((c, i) => (
        <button
          key={c.id}
          onClick={() => onSelect(i)}
          title={c.headline}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 text-left w-full ${
            i === active ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <span
            className={`font-mono text-[10px] tabular-nums w-5 shrink-0 ${
              i === active ? "text-white" : "text-white/40"
            }`}
          >
            {c.num}
          </span>
          <span
            className={`font-mono text-[10px] tracking-wider uppercase leading-none ${
              i === active ? "text-white" : "text-white/35"
            }`}
          >
            {SHORTS[i]}
          </span>
          <span
            className="ml-auto shrink-0 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 6 : 4,
              height: i === active ? 6 : 4,
              background: i === active ? R : "rgba(255,255,255,0.18)",
            }}
          />
        </button>
      ))}
    </nav>
  );
}

// ── Case Block ─────────────────────────────────────────────────────────────

function CaseBlock({ c, index }: { c: GTMCase; index: number }) {
  return (
    <motion.section
      id={`case-${c.id}`}
      className="mx-3 sm:mx-5 mb-6"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "#fff",
          boxShadow: "0 -20px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        <div className="px-8 sm:px-12 lg:px-16 pt-12 pb-16">

          {/* Region header */}
          <div className="flex items-baseline gap-6 mb-10 border-b border-gray-100 pb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gray-300 tabular-nums">{c.num}</span>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-none flex-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {c.region}
            </h2>
            <span className="text-[10px] font-mono tracking-[0.12em] text-gray-300 hidden sm:block">{c.geo}</span>
          </div>

          {/* Headline + metrics card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 mb-12">
            <div>
              <h3
                className="text-2xl sm:text-3xl text-gray-900 leading-snug mb-5"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {c.headline}
              </h3>
              <p
                className="text-base text-gray-500 leading-relaxed mb-6 pl-4 border-l-2"
                style={{ borderColor: R }}
              >
                {c.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono tracking-[0.08em] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-sm border border-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics card: dark on white */}
            <div className="rounded-xl p-6 self-start" style={{ background: "#111" }}>
              <span
                className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-4"
                style={{ color: R }}
              >
                {c.metricsTitle}
              </span>
              {c.metrics.map((m) => (
                <div key={m.label} className="py-3 border-b border-white/[0.07] last:border-0 last:pb-0">
                  <div
                    className="text-xl text-white leading-none mb-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-white/45">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {c.problems.map((p) => (
              <div key={p.heading}>
                <h4
                  className="text-[10px] font-mono tracking-[0.18em] uppercase mb-4 pb-3 border-b border-gray-200"
                  style={{ color: R }}
                >
                  {p.heading}
                </h4>
                {p.paras.map((para, i) => (
                  <p key={i} className="text-[15px] text-gray-600 leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Execution grid */}
          <div className="mb-10">
            <h4
              className="text-[10px] font-mono tracking-[0.18em] uppercase mb-4 pb-3 border-b border-gray-200"
              style={{ color: R }}
            >
              {c.execTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {c.exec.map((item) => (
                <div key={item.label} className="bg-gray-50 p-6">
                  <span
                    className="block text-[10px] font-mono tracking-[0.15em] uppercase mb-2"
                    style={{ color: R }}
                  >
                    {item.label}
                  </span>
                  <strong className="block text-sm font-semibold text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </strong>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pull quote */}
          {c.quote && (
            <div
              className="relative px-10 py-8 mb-10 rounded-sm"
              style={{ backgroundColor: R }}
            >
              <span
                className="absolute left-5 top-2 text-white/15 leading-none select-none"
                style={{ fontFamily: "'Instrument Serif', serif", fontSize: 72 }}
              >
                &ldquo;
              </span>
              <p
                className="text-white text-xl leading-relaxed relative z-10"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
              >
                {c.quote}
              </p>
              {c.quoteAttr && (
                <span className="block text-white/50 text-[10px] font-mono tracking-[0.15em] uppercase mt-4">
                  {c.quoteAttr}
                </span>
              )}
            </div>
          )}

          {/* Results strip */}
          {c.results && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mb-10">
              {c.results.map((r) => (
                <div key={r.label} className="bg-white px-6 py-5">
                  <div
                    className="text-2xl text-gray-900 mb-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {r.value}
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-gray-400">{r.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Strategic insight */}
          <div className="border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: R }}>
                Strategic Insight
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">{c.insight}</p>
          </div>

          {/* Listings */}
          <div className="flex items-start gap-4">
            <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-gray-300 whitespace-nowrap pt-1.5">
              Listed On
            </span>
            <div className="flex flex-wrap gap-2">
              {c.listings.map((l) => (
                <span
                  key={l}
                  className="text-[9px] font-mono tracking-[0.06em] px-2 py-1 bg-gray-100 border border-gray-200 text-gray-400 rounded-sm"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function RegionalGTM() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = CASES.map((c, i) => {
      const el = document.getElementById(`case-${c.id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-35% 0px -35% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (i: number) => {
    document.getElementById(`case-${CASES[i].id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-background"
    >
      {/* Navigation */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Navigation />
      </div>

      <StickyNav active={active} onSelect={scrollTo} />

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-10"
        >
          GTM Playbooks · FY24 to FY27
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl leading-none max-w-5xl mb-8"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Nine campaigns.<br />Six markets.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
        >
          How FSS took the same payments platform to Africa, India, the Middle East,
          the Philippines, Europe, South East Asia, and the AI frontier, with a
          completely different strategy each time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {["Africa", "India ×3", "Middle East", "Philippines", "Europe", "South East Asia", "AI Portfolio"].map(
            (r) => (
              <span
                key={r}
                className="text-[10px] font-mono tracking-[0.14em] px-3 py-1.5 border border-white/[0.12] text-muted-foreground rounded-sm"
              >
                {r}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Index Grid */}
      <div className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/50">
            Jump to a campaign
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CASES.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => scrollTo(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group text-left border border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 p-6 rounded-xl relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono tracking-[0.18em] text-muted-foreground/40 tabular-nums">
                  {c.num}
                </span>
                <span className="text-[10px] font-mono tracking-[0.1em] text-muted-foreground/30 text-right leading-tight max-w-[140px]">
                  {c.geo}
                </span>
              </div>
              <span
                className="block text-xs font-mono tracking-[0.18em] uppercase mb-3 font-semibold"
                style={{ color: R }}
              >
                {c.region}
              </span>
              <p
                className="text-lg text-foreground leading-snug mb-8 line-clamp-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {c.headline}
              </p>
              <div>
                <div
                  className="text-5xl text-foreground leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {c.heroValue}
                </div>
                <div className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground/55 mt-2">
                  {c.heroLabel}
                </div>
              </div>
              {/* hover accent */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: R }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* All case studies: scroll-triggered white cards */}
      <div className="pb-6">
        {CASES.map((c, i) => (
          <CaseBlock key={c.id} c={c} index={i} />
        ))}
      </div>

      {/* Next Case Study */}
      <div className="bg-background px-6 py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/40 mb-8">
            Next Case Study
          </span>
          <Link
            to="/work/gtm-narratives"
            className="group flex items-start justify-between gap-6"
          >
            <div>
              <span className="text-[11px] font-mono tracking-[0.1em] text-muted-foreground/40">04 / 09</span>
              <h3
                className="text-4xl sm:text-5xl text-foreground mt-3 max-w-2xl leading-tight group-hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Building GTM Narratives Across a Payments Ecosystem
              </h3>
            </div>
            <span className="text-2xl text-muted-foreground group-hover:translate-x-2 transition-transform mt-4 shrink-0">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
