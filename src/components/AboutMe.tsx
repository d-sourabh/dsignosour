import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "lucide-react";

// ───────────────────────────────────────────────────────────
// Data
// ───────────────────────────────────────────────────────────

const SPECIALTY_ROW_1 = [
  "Product Marketing",
  "AI Engineer",
  "GTM",
  "Sales Enablement",
  "ABM",
  "Demand Generation",
  "Budget Planning & AOP",
  "Brand Strategy",
];

const SPECIALTY_ROW_2 = [
  "Content Writing",
  "Campaign Execution",
  "Competitive Intelligence",
  "Pipeline Attribution",
  "Event Marketing",
  "Market Research",
  "SEO, AEO & GEO",
  "Martech Automation",
];

const BRANDS = [
  "ITC",
  "Swiggy",
  "Marico",
  "Titan",
  "Sony Music",
  "OZiva",
  "Purplle",
  "Setu",
];

// Placeholder quotes — Sourabh will swap with his own picks.
// Mix of voices: behavioural econ, classic copy, management, modern marketing, advertising craft.
const PHILOSOPHY_QUOTES = [
  {
    quote:
      "Marketing is one part magic, four parts misunderstanding.",
    attribution: "Rory Sutherland",
  },
  {
    quote:
      "The consumer isn’t a moron. She is your wife.",
    attribution: "David Ogilvy",
  },
  {
    quote:
      "The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.",
    attribution: "Peter Drucker",
  },
  {
    quote:
      "People do not buy goods and services. They buy relations, stories, and magic.",
    attribution: "Seth Godin",
  },
  {
    quote:
      "Adapt your techniques to an idea, not an idea to your techniques.",
    attribution: "Bill Bernbach",
  },
];

// ───────────────────────────────────────────────────────────
// Small helpers
// ───────────────────────────────────────────────────────────

function EyebrowLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Sparkle className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <Sparkle className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Philosophy quote carousel (auto-advances, pause on hover)
// ───────────────────────────────────────────────────────────

function PhilosophyCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHILOSOPHY_QUOTES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <article
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <EyebrowLabel label="Philosophy" />

      <div className="relative flex-1 mt-8 mb-4 min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <p
              className="text-xl md:text-2xl leading-[1.3] tracking-[-0.5px] text-foreground/95 text-balance"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              “{PHILOSOPHY_QUOTES[index].quote}”
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80 mt-4">
              {PHILOSOPHY_QUOTES[index].attribution}
            </p>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="flex flex-row items-center gap-1.5 mt-auto pt-4">
        {PHILOSOPHY_QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show quote ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-white/70" : "w-1 bg-white/20"
            }`}
          />
        ))}
        <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          On approach
        </span>
      </div>
    </article>
  );
}

// ───────────────────────────────────────────────────────────
// Main About section
// ───────────────────────────────────────────────────────────

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-24 md:py-32 max-w-7xl mx-auto"
    >
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16"
      >
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            About
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-[-1.5px] font-normal mt-6 text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            An engineer turned product marketer, shaped by{" "}
            <em className="not-italic text-muted-foreground">systems</em>{" "}
            and{" "}
            <em className="not-italic text-muted-foreground">storytelling.</em>
          </h2>
          <div className="text-muted-foreground text-base sm:text-[15px] leading-[1.7] max-w-2xl mt-8 space-y-4">
            <p>
              I started in engineering, where I learned to think in systems.
              Over time, that curiosity evolved into storytelling, digital
              experiences, and the way people connect with ideas.
            </p>
            <p>
              Today, I&apos;m interested in the intersection of technology,
              culture, design, and human perception, exploring how thoughtful
              narratives shape modern brands.
            </p>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/dhavala-sourabh/"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 self-start lg:self-auto whitespace-nowrap"
        >
          Connect
        </a>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {/* Card 1: Full-bleed photo (tall, spans both rows on lg) */}
        <article className="relative lg:row-span-2 rounded-2xl overflow-hidden bg-black min-h-[480px] lg:min-h-0">
          <img
            src="/about-photo.jpg"
            alt="Dhavala Sourabh"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">
              Portrait
            </span>
            <p
              className="text-2xl md:text-3xl leading-tight text-white mt-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Dhavala Sourabh
            </p>
            <p className="text-xs text-white/70 mt-1">
              Bengaluru · India
            </p>
          </div>
        </article>

        {/* Card 2: The Journey */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]">
          <EyebrowLabel label="The Journey" />

          <div className="text-muted-foreground text-[14px] leading-[1.65] mt-6 space-y-3">
            <p>
              Engineering taught me how products work. Marketing taught me why
              they don&apos;t.
            </p>
            <p>I&apos;ve been working in that gap ever since.</p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.08] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 w-[78px] shrink-0">
                2022 – Now
              </span>
              <Sparkle
                className="h-2.5 w-2.5 text-muted-foreground/60 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[13px] text-foreground/90">
                Brand &amp; Product Marketing · FSS
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 w-[78px] shrink-0">
                2018 – 2020
              </span>
              <Sparkle
                className="h-2.5 w-2.5 text-muted-foreground/60 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[13px] text-foreground/90">
                Strategic Marketing · MICA, Ahmedabad
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 w-[78px] shrink-0">
                2014 – 2018
              </span>
              <Sparkle
                className="h-2.5 w-2.5 text-muted-foreground/60 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[13px] text-foreground/90">
                Engineering · Information Technology
              </span>
            </div>
          </div>
        </article>

        {/* Card 3: Multispeciality Marketer (marquee + video background) */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-black noise-overlay overflow-hidden flex flex-col min-h-[260px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/curiosities-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            aria-hidden="true"
          >
            <source src="/curiosities-bg.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="p-6 md:p-8 pb-0">
              <EyebrowLabel label="Multispeciality Marketer" />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3 my-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex gap-3 animate-marquee-left whitespace-nowrap">
                {[...SPECIALTY_ROW_1, ...SPECIALTY_ROW_1].map((tag, i) => (
                  <span
                    key={`r1-${i}`}
                    className="liquid-glass rounded-full px-4 py-2 text-xs sm:text-sm text-foreground/95 whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 animate-marquee-right whitespace-nowrap">
                {[...SPECIALTY_ROW_2, ...SPECIALTY_ROW_2].map((tag, i) => (
                  <span
                    key={`r2-${i}`}
                    className="liquid-glass rounded-full px-4 py-2 text-xs sm:text-sm text-foreground/95 whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 pt-0">
              <span className="text-[11px] uppercase tracking-wide text-white/70">
                Sixteen specialities, one focus
              </span>
            </div>
          </div>
        </article>

        {/* Card 4: Philosophy carousel */}
        <PhilosophyCarousel />

        {/* Card 5: Brands worked with */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]">
          <EyebrowLabel label="Brands Worked With" />

          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
            {BRANDS.map((brand, i) => (
              <span
                key={brand}
                className="text-xl md:text-2xl leading-[1.25] tracking-[-0.5px] text-foreground/95"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {brand}
                {i < BRANDS.length - 1 && (
                  <span className="text-muted-foreground/50 ml-3">·</span>
                )}
              </span>
            ))}
          </div>

          <p className="text-[13px] text-muted-foreground leading-[1.6] mt-4 max-w-[320px]">
            &amp; many more, across branding, digital marketing, and design
            projects.
          </p>

          <a
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-foreground/90 mt-6 group/link"
          >
            <span className="border-b border-white/30 group-hover/link:border-white/70 transition-colors">
              See Work
            </span>
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </a>

          <span className="text-[11px] uppercase tracking-wide text-muted-foreground/70 mt-auto pt-6">
            Selected client portfolio
          </span>
        </article>
      </motion.div>
    </section>
  );
}
