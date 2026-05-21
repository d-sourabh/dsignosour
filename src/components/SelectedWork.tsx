import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyImpact {
  value: string;
  label: string;
}

interface CaseStudy {
  number: string;
  route?: string;
  title: string;
  description: string;
  metadata: string;
  placeholder: string;
  inProgress?: boolean;
  impacts?: CaseStudyImpact[];
  thumbnail?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    number: "01",
    route: "/work/fss-transformation",
    title: "Repositioning FSS for the AI Era",
    description:
      "FSS launched a new AI-first digital experience that transformed how banks, regulators, employees, and partners perceived the brand across India, the Middle East, and Africa.",
    metadata: "Brand Strategy · Website Transformation · AI Experience · Experiential Marketing",
    placeholder: "Placeholder for homepage hero showcasing the new dark-mode website experience.",
    thumbnail: "/fss-thumbnail.webp",
    impacts: [
      { value: "91K+", label: "Visitors" },
      { value: "2.6×", label: "Sessions" },
      { value: "3.4M", label: "Impressions" },
    ],
  },
  {
    number: "02",
    route: "/work/blaze-platform",
    title: "Positioning and Launching FSS BLAZE",
    description:
      "Taking a microservices payments platform no one understood and turning it into a category banks wanted to buy into, through positioning, brand architecture, and sales enablement.",
    metadata: "Product Marketing · Positioning · Brand Architecture · Sales Enablement",
    placeholder: "Placeholder for the FSS BLAZE platform.",
    thumbnail: "/blaze-thumbnail.webp",
    impacts: [
      { value: "Rs.500+ Cr", label: "Pipeline targeted" },
      { value: "6", label: "Tier-1 banks" },
      { value: "30+", label: "Banks in talks" },
    ],
  },
  {
    number: "03",
    route: "/work/gtm-narratives",
    title: "Building GTM Narratives Across a Payments Ecosystem",
    description:
      "Creating product positioning systems and GTM narratives across payment gateway, CMS, recon, switch, and platform products.",
    metadata: "GTM · Positioning · Sales Enablement · PMM",
    placeholder: "Placeholder for product ecosystem diagram.",
    thumbnail: "/gtm-thumbnail.webp",
    impacts: [
      { value: "15+", label: "Products" },
      { value: "18", label: "Markets" },
      { value: "12", label: "Launches" },
    ],
  },
  {
    number: "04",
    route: "/work/simply-payments",
    title: "Scaling Simply Payments as an Industry Recognized Brand IP",
    description:
      "Scaling Simply Payments from a niche CXO gathering into a recognised fintech ecosystem platform.",
    metadata: "Executive Marketing · Community · Events",
    placeholder: "Placeholder for executive storytelling visuals.",
    thumbnail: "/simply-thumbnail.webp",
    impacts: [
      { value: "1.2K+", label: "CXOs" },
      { value: "8", label: "Cities" },
      { value: "40+", label: "Sessions" },
    ],
  },
  {
    number: "05",
    route: "/work/innovation-lab",
    title: "Designing Experimental Brand Experiences",
    description:
      "Exploring AI, AR, interactive systems, and immersive storytelling in modern B2B marketing.",
    metadata: "Innovation · AI · AR · Experiments",
    placeholder: "Placeholder for AI-powered experience showcase.",
    impacts: [
      { value: "12", label: "Experiments" },
      { value: "4", label: "Platforms" },
      { value: "6", label: "Categories" },
    ],
  },
  {
    number: "06",
    route: "/work/customer-voice",
    title: "Building a Customer Voice System Across 34 Accounts",
    description:
      "Designing a CSAT and NPS listening system in Qualtrics, coding hundreds of verbatim responses into themes, and building a live observability dashboard leadership could act on.",
    metadata: "CSAT & NPS · Qualtrics · Customer Analytics · Executive Engagement",
    placeholder: "Placeholder for the FSS Customer Voice Dashboard.",
    thumbnail: "/csat-thumbnail.webp",
    impacts: [
      { value: "36%", label: "Response rate" },
      { value: "65", label: "Leaders heard" },
      { value: "34", label: "Accounts tracked" },
    ],
  },
  {
    number: "07",
    title: "The FSS AI Masterclass",
    description:
      "Designing a C-suite AI education programme for banking executives, anchored in original frameworks and faculty-led conversations.",
    metadata: "Executive Education · AI · Programme Design",
    placeholder: "Placeholder for masterclass curriculum and brand visuals.",
    inProgress: true,
  },
  {
    number: "08",
    title: "CXO Relationship Marketing",
    description:
      "Building a passion-led relationship programme for senior banking executives across Mumbai and Dubai, organised around cricket, golf, ghazals, and the arts.",
    metadata: "Relationship Marketing · Events · CXO",
    placeholder: "Placeholder for CXO programme visuals.",
    inProgress: true,
  },
  {
    number: "09",
    title: "The Payments Unheard Podcast",
    description:
      "Building a CXO-grade audio property exploring legacy systems, digital expectations, and the future of payments infrastructure.",
    metadata: "Editorial Brand · Podcast · CXO Audience",
    placeholder: "Placeholder for podcast cover and episode visuals.",
    inProgress: true,
  },
];

// ----------------------------------------------------------------------
// Editorial tile (portrait orientation, used inside the horizontal row)
// ----------------------------------------------------------------------
function CaseStudyTile({ cs }: { cs: CaseStudy }) {
  const isInProgress = !!cs.inProgress;

  const inner = (
    <article
      className={cn(
        "relative h-full w-full rounded-2xl overflow-hidden flex flex-col",
        "border border-white/[0.06] bg-white/[0.012]",
        "transition-all duration-500",
        !isInProgress &&
          "group-hover:border-white/20 group-hover:bg-white/[0.025]",
        isInProgress && "opacity-70"
      )}
    >
      {/* Editorial placeholder area or thumbnail */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        {cs.thumbnail ? (
          <>
            <img
              src={cs.thumbnail}
              alt={cs.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle dark overlay to keep the title and metadata legible if needed downstream */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            {/* Editorial corner marks kept for visual consistency with placeholder tiles */}
            <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/25" />
            <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/25" />
            <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/25" />
            <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/25" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 10%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.7), transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.7), transparent 70%)",
              }}
            />

            {/* Corner marks */}
            <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/25" />
            <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/25" />
            <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/25" />
            <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/25" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70 mb-4">
                {cs.number}
              </span>
              <span
                className="text-muted-foreground/70 text-sm max-w-[260px]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {cs.placeholder}
              </span>
            </div>
          </>
        )}

        {/* In Progress chip, top right */}
        {isInProgress && (
          <span className="absolute top-4 right-4 z-10 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/[0.08]">
            In Progress
          </span>
        )}
      </div>

      {/* Text area */}
      <div className="flex-1 flex flex-col p-6 md:p-7">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {cs.number} · Case Study
        </span>

        <h3
          className="text-2xl md:text-[26px] leading-[1.15] tracking-[-0.5px] text-balance mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {cs.title}
        </h3>

        {cs.impacts && cs.impacts.length > 0 && (
          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2 mb-4 pb-4 border-b border-white/[0.06]">
            {cs.impacts.map((imp, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-xl md:text-2xl leading-none tracking-[-0.5px]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {imp.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 mt-1.5">
                  {imp.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-[13px] text-muted-foreground leading-[1.6] line-clamp-3 mb-4">
          {cs.description}
        </p>

        <p className="text-[10px] uppercase tracking-wide text-muted-foreground/70 mt-auto">
          {cs.metadata}
        </p>

        {!isInProgress && (
          <span className="inline-flex items-center gap-2 mt-5 text-sm text-foreground/90 transition-opacity duration-300 group-hover:opacity-70">
            View Case Study
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </div>
    </article>
  );

  if (isInProgress || !cs.route) {
    return (
      <div className="group block h-full w-full" aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <Link to={cs.route} className="group block h-full w-full">
      {inner}
    </Link>
  );
}

// ----------------------------------------------------------------------
// Horizontal scroll row
// ----------------------------------------------------------------------
export default function SelectedWork() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateProgress = () => {
      const max = el.scrollWidth - el.clientWidth;
      const progress = max > 0 ? el.scrollLeft / max : 0;
      setScrollProgress(progress);
      setCanScrollLeft(el.scrollLeft > 8);
      setCanScrollRight(el.scrollLeft < max - 8);
    };

    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const scrollByTile = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const tile = el.querySelector<HTMLElement>("[data-tile]");
    const delta = tile ? tile.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  return (
    <div id="work" className="relative">
      {/* Intro */}
      <section className="relative z-10 px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-muted-foreground block"
        >
          Select Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl leading-tight max-w-5xl mt-10 text-balance"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Strategic narratives, GTM systems, and digital experiences built
          across fintech, AI, and platform transformation.
        </motion.h2>
      </section>

      {/* Horizontal scroll row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative pb-24"
      >
        {/* The scrolling container itself */}
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hidden"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-5 px-6 sm:px-10 lg:px-14 pr-[40%] sm:pr-[30%] lg:pr-[20%]">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.number}
                data-tile
                className="flex-none w-[78vw] sm:w-[44vw] lg:w-[30vw] max-w-[420px] scroll-ml-6 sm:scroll-ml-10 lg:scroll-ml-14"
                style={{ scrollSnapAlign: "start" }}
              >
                <CaseStudyTile cs={cs} />
              </div>
            ))}
          </div>
        </div>

        {/* Edge fade hints */}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(-90deg, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/* Controls + progress indicator */}
        <div className="mt-10 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-row items-center justify-between gap-6">
          <div className="relative flex-1 h-px bg-white/[0.08] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white/60 transition-[width] duration-200"
              style={{
                width: `${Math.max(8, scrollProgress * 100)}%`,
                minWidth: "32px",
              }}
            />
          </div>

          <div className="flex flex-row gap-2 shrink-0">
            <button
              onClick={() => scrollByTile("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll case studies left"
              className={cn(
                "liquid-glass rounded-full w-10 h-10 flex items-center justify-center text-foreground transition-all duration-300",
                canScrollLeft
                  ? "hover:scale-[1.05] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              )}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scrollByTile("right")}
              disabled={!canScrollRight}
              aria-label="Scroll case studies right"
              className={cn(
                "liquid-glass rounded-full w-10 h-10 flex items-center justify-center text-foreground transition-all duration-300",
                canScrollRight
                  ? "hover:scale-[1.05] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              )}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
