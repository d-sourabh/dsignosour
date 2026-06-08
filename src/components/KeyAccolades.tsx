import { motion } from "framer-motion";

type Category = "Award" | "Recognition" | "Milestone" | "Innovation";

interface Achievement {
  title: string;
  detail: string;
  category: Category;
}

interface YearGroup {
  year: string;
  items: Achievement[];
}

const TIMELINE: YearGroup[] = [
  {
    year: "2021",
    items: [
      {
        title: "Built the FSS Corporate Website from Zero",
        detail:
          "Created the company's entire digital presence from scratch: 30+ SEO-optimised pages, full martech stack for lead capture to email workflow, and an AI chatbot. Achieved 100%+ organic traffic growth, 32 keywords at the number one position on Google, 40%+ Answer Engine Optimization, and 15,000+ monthly views.",
        category: "Milestone",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "Simply Payments: First Edition, 27 Attendees",
        detail:
          "Conceived and launched FSS's flagship CXO event series from scratch in Mumbai. The first edition brought together 27 senior banking leaders and established the format that would grow into a recognised industry event.",
        category: "Milestone",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Runner-Up, NPCI NCMC Ideathon",
        detail:
          "National-level competition organised by the National Payments Corporation of India. Recognised for the NCMC Karmanya Card concept: One Nation, One Workforce, integrating public transit, workplace access, and everyday transactions into a single card for India's working population.",
        category: "Award",
      },
      {
        title: "E4M Indian Marketing Awards",
        detail:
          "Best Campaign recognition for the FSS BLAZE go-to-market: a platform launch spanning India, the Middle East, and Africa, built around unscripted leadership video and a six-week email drip to 10,000+ bank contacts. The campaign achieved a 54% click-to-open rate against the 15% industry benchmark.",
        category: "Award",
      },
      {
        title: "Built Merlin: FSS's First AI Chatbot",
        detail:
          "First person in the organisation to build AI into the product stack. Merlin recorded 400+ interactions across three continents in its first deployment cycle, establishing the template for AI-powered customer engagement at FSS.",
        category: "Innovation",
      },
      {
        title: "Member, CBDC Centre of Excellence",
        detail:
          "Selected as a founding member, contributing to strategy, communications, and market positioning for India's central bank digital currency initiatives alongside the broader payments policy ecosystem.",
        category: "Recognition",
      },
      {
        title: "Introduced Augmented Reality in Event Marketing",
        detail:
          "Pioneered AR at FSS events with the AR CEO business card: a printed card that when scanned played a personalised video address from the FSS CEO. The most talked-about activation at the Africa banking delegate visit.",
        category: "Innovation",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Digital Dragons Award: Best B2B Marketing Campaign",
        detail:
          "Recognised for a six-market digital performance programme targeting senior banking decision-makers across India, the Middle East, Africa, Europe, and the Philippines, achieving a 0.96% CTR against the 0.4% B2B industry benchmark.",
        category: "Award",
      },
      {
        title: "Simply Payments: 175+ Attendees, Dubai Edition",
        detail:
          "Scaled the flagship event from 27 attendees in 2023 to over 175 in 2025, with 40+ banking CXOs, 60,000+ live viewers on Moneycontrol, CNBC TV-18 telecast, and Forbes India coverage. Launched the Dubai edition at Grosvenor House with 70+ senior attendees and Khaleej Times coverage.",
        category: "Milestone",
      },
      {
        title: "LinkedIn: 24,000 to 75,000+ Followers",
        detail:
          "Grew the FSS LinkedIn community from 24,000 to over 75,000 followers over four years, with 60% from the banking industry and a shift in Media Share of Voice from fifth to first in India among payments competitors.",
        category: "Milestone",
      },
      {
        title: "AI Champion",
        detail:
          "Recognised as AI Champion at FSS. Pioneered AI for content production at scale, introduced AR in event marketing, designed the company's first AI-powered account observability dashboard, and completed a three-month professional AI training programme as a member of the AI Centre of Excellence.",
        category: "Recognition",
      },
    ],
  },
  {
    year: "2026",
    items: [
      {
        title: "Best Event Marketing Campaign, World Fintech Awards",
        detail:
          "FSS Simply Payments recognised as the best event marketing campaign in the global fintech industry, across the Mumbai and Dubai editions.",
        category: "Award",
      },
    ],
  },
  {
    year: "Ongoing",
    items: [
      {
        title: "5x Winner, Team of the Quarter",
        detail:
          "Recognised five times across different quarters at FSS for work spanning brand repositioning, product marketing, campaign execution, and event production.",
        category: "Recognition",
      },
    ],
  },
];

const CAT: Record<Category, string> = {
  Award:       "text-[#C8102E] border-[#C8102E]/30 bg-[#C8102E]/[0.07]",
  Recognition: "text-amber-400/80 border-amber-400/20 bg-amber-400/[0.06]",
  Milestone:   "text-white/50 border-white/[0.10] bg-white/[0.04]",
  Innovation:  "text-sky-400/80 border-sky-400/20 bg-sky-400/[0.06]",
};

export default function KeyAccolades() {
  return (
    <section
      id="accolades"
      className="relative z-10 px-6 py-20 sm:py-28 max-w-7xl mx-auto"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-sm uppercase tracking-[0.3em] text-muted-foreground block"
      >
        Key Accolades
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl leading-tight max-w-4xl mt-6 mb-16 text-balance"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Recognition across category creation, campaigns, events, and emerging
        payments.
      </motion.h2>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical rule */}
        <div className="absolute left-[88px] sm:left-[112px] top-2 bottom-0 w-px bg-white/[0.07]" />

        {TIMELINE.map((group) => (
          <div key={group.year} className="mb-14 last:mb-0">

            {/* Year label */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center mb-6"
            >
              <span className="w-[88px] sm:w-[112px] shrink-0 text-right pr-5 text-[11px] font-mono tracking-[0.18em] text-muted-foreground/40 uppercase">
                {group.year}
              </span>
              <span className="w-2 h-2 rounded-full border border-white/25 bg-background shrink-0 relative z-10" />
            </motion.div>

            {/* Entries */}
            <div className="pl-[104px] sm:pl-[128px] space-y-4">
              {group.items.map((item, ii) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: ii * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Connector */}
                  <span className="absolute -left-[22px] top-[11px] w-4 h-px bg-white/[0.08]" />
                  <span className="absolute -left-[10px] top-[7.5px] w-1.5 h-1.5 rounded-full bg-white/[0.15] border border-white/[0.12]" />

                  <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-5 py-5 hover:border-white/[0.10] hover:bg-white/[0.03] transition-colors duration-300">
                    <div className="flex items-start justify-between gap-4 mb-2.5">
                      <h3
                        className="text-base sm:text-lg text-foreground leading-snug"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {item.title}
                      </h3>
                      <span className={`text-[9px] font-mono tracking-[0.14em] uppercase px-2 py-1 border rounded-sm shrink-0 ${CAT[item.category]}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
