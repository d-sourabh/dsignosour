import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

const CURIOSITY_ROW_1 = [
  "Product Marketing",
  "Systems Thinking",
  "Storytelling",
  "Internet Culture",
  "AI & Creativity",
];

const CURIOSITY_ROW_2 = [
  "Tech Innovation",
  "Brand Psychology",
  "Digital Aesthetics",
  "Future Web",
  "Pop Cult",
];

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
          href="https://wa.link/tf9g4j"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-6 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 self-start lg:self-end whitespace-nowrap"
        >
          Connect
        </a>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-5 lg:auto-rows-fr"
      >
        {/* Card 1: Full-bleed photo (tall, spans both rows on lg) */}
        <article className="relative lg:row-span-2 rounded-2xl overflow-hidden bg-black min-h-[480px] lg:min-h-0">
          <img
            src="/about-photo.jpg"
            alt="Dhavala Sourabh"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Subtle gradient at top for label legibility */}
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Subtle gradient at bottom for caption legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Top-left label */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <EyebrowLabel label="Portrait" />
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10">
            <h3
              className="text-2xl md:text-3xl tracking-tight leading-none text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Dhavala Sourabh
            </h3>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 mt-2">
              Bengaluru, 2026
            </p>
          </div>
        </article>

        {/* Card 2: The Journey (timeline) */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]">
          <EyebrowLabel label="The Journey" />

          <p className="text-muted-foreground text-[14px] leading-[1.65] mt-6">
            Engineering introduced me to systems thinking. MICA introduced me
            to strategy and communication. Somewhere between the two, I found
            a fascination for storytelling, technology, and digital
            experiences.
          </p>

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

        {/* Card 3: Curiosities (marquee + video background) */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-black noise-overlay overflow-hidden flex flex-col min-h-[260px]">
          {/* Ambient fluted glass video background */}
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

          {/* Darkening overlay so the marquee tags read cleanly on top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Content sits above video */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="p-6 md:p-8 pb-0">
              <EyebrowLabel label="Curiosities" />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3 my-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex gap-3 animate-marquee-left whitespace-nowrap">
                {[...CURIOSITY_ROW_1, ...CURIOSITY_ROW_1].map((tag, i) => (
                  <span
                    key={`r1-${i}`}
                    className="liquid-glass rounded-full px-4 py-2 text-xs sm:text-sm text-foreground/95 whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 animate-marquee-right whitespace-nowrap">
                {[...CURIOSITY_ROW_2, ...CURIOSITY_ROW_2].map((tag, i) => (
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
                Always exploring
              </span>
            </div>
          </div>
        </article>

        {/* Card 4: Philosophy */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]">
          <EyebrowLabel label="Philosophy" />

          <p
            className="text-2xl md:text-[28px] leading-[1.25] tracking-[-0.5px] text-foreground/90 mt-8 text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Quiet, thoughtful marketing. Brands that earn attention{" "}
            <em className="not-italic text-muted-foreground">naturally</em>{" "}
            rather than demand it.
          </p>

          <span className="text-[11px] uppercase tracking-wide text-muted-foreground/70 mt-auto pt-6">
            On approach
          </span>
        </article>

        {/* Card 5: Identity (with logo) + This Space */}
        <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] noise-overlay p-6 md:p-8 overflow-hidden flex flex-col min-h-[260px]">
          <EyebrowLabel label="Identity" />

          <div className="flex flex-row items-center gap-5 mt-6">
            <img
              src="/dsignosour-logo.svg"
              alt="dsignosour mark"
              className="w-20 h-20 md:w-24 md:h-24 shrink-0 opacity-95"
            />
            <h3
              className="text-3xl md:text-4xl tracking-tight leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              dsignosour
            </h3>
          </div>

          <div className="mt-6 flex flex-col gap-0.5">
            <p
              className="text-lg md:text-xl leading-[1.3] text-foreground/95"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              part portfolio,
            </p>
            <p
              className="text-lg md:text-xl leading-[1.3] text-foreground/70"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              part journal,
            </p>
            <p
              className="text-lg md:text-xl leading-[1.3] text-muted-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              part evolving digital universe.
            </p>
          </div>

          <span className="text-[11px] uppercase tracking-wide text-muted-foreground/70 mt-auto pt-6">
            A reflection of curiosity
          </span>
        </article>
      </motion.div>
    </section>
  );
}
