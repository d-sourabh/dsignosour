import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactNode, useState, useRef } from "react";
import Navigation from "./Navigation";
import EditorialPlaceholder from "./EditorialPlaceholder";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Page wrapper
// ------------------------------------------------------------------
export function CaseStudyPage({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full bg-background overflow-hidden"
    >
      <Navigation />
      {children}
    </motion.main>
  );
}

// ------------------------------------------------------------------
// Fullscreen opening statement
// ------------------------------------------------------------------
interface OpeningProps {
  eyebrow: string;
  index: string;
  meta: string;
  statement: string;
}

export function CaseStudyOpening({
  eyebrow,
  index,
  meta,
  statement,
}: OpeningProps) {
  return (
    <section className="relative px-6 pt-24 pb-20 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="flex flex-row justify-between items-start mb-20 animate-fade-rise">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index}
        </span>
      </div>

      <h1
        className="animate-fade-rise-delay text-5xl sm:text-7xl md:text-8xl leading-[0.98] tracking-[-2.4px] max-w-6xl font-normal text-balance"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {statement}
      </h1>

      <p className="animate-fade-rise-delay-2 text-xs uppercase tracking-wide text-muted-foreground/80 mt-16 max-w-xl">
        {meta}
      </p>
    </section>
  );
}

// ------------------------------------------------------------------
// Editorial section with heading + body + optional media
// ------------------------------------------------------------------
interface SectionProps {
  index: string;
  label: string;
  heading: string;
  body: string | string[];
  placeholder?: string;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
  pull?: ReactNode;
}

export function CaseStudySection({
  index,
  label,
  heading,
  body,
  placeholder,
  image,
  imageAlt,
  reverse = false,
  pull,
}: SectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className="relative px-6 py-16 sm:py-20 max-w-7xl mx-auto">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
        )}
      >
        {/* Index column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 lg:sticky lg:top-32"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block">
            {index}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 block mt-2">
            {label}
          </span>
        </motion.div>

        {/* Content column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-10"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-1.5px] max-w-4xl text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {heading}
          </h2>

          <div className="mt-10 max-w-2xl space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted-foreground text-base sm:text-lg leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          {pull && <div className="mt-16">{pull}</div>}

          {image ? (
            <div className={cn("mt-20", reverse && "lg:-ml-20")}>
              <figure className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
                <img
                  src={image}
                  alt={imageAlt || placeholder || heading}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                {/* Editorial corner marks for visual consistency with placeholder treatment */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
              </figure>
              {placeholder && (
                <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-4">
                  {index} · {placeholder}
                </figcaption>
              )}
            </div>
          ) : placeholder ? (
            <div className={cn("mt-20", reverse && "lg:-ml-20")}>
              <EditorialPlaceholder
                label={placeholder}
                index={index}
                aspect="wide"
              />
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Pull quote / oversized statement
// ------------------------------------------------------------------
export function PullStatement({ children }: { children: ReactNode }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-6 py-20 sm:py-24 max-w-6xl mx-auto"
    >
      <span
        className="block text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-[-1.5px] text-foreground/90 text-balance"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <span className="text-muted-foreground/60">&ldquo;</span>
        {children}
        <span className="text-muted-foreground/60">&rdquo;</span>
      </span>
    </motion.blockquote>
  );
}

// ------------------------------------------------------------------
// Outcomes grid (oversized typography, no boxes)
// ------------------------------------------------------------------
interface OutcomeItem {
  metric: string;
  label: string;
}

export function CaseStudyOutcomes({
  index,
  outcomes,
}: {
  index: string;
  outcomes: OutcomeItem[];
}) {
  return (
    <section className="relative px-6 py-20 sm:py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-row justify-between items-end mb-20"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block">
            {index}
          </span>
          <h2
            className="text-4xl sm:text-6xl leading-tight mt-6 text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Outcomes
          </h2>
        </div>
        <span className="hidden sm:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Impact at a glance
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
        {outcomes.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-t border-border/40 pt-10"
          >
            <div
              className="text-6xl sm:text-7xl md:text-8xl leading-none tracking-[-2px]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {o.metric}
            </div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground mt-6">
              {o.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Next case study navigation
// ------------------------------------------------------------------
interface NextCaseProps {
  route: string;
  title: string;
  number: string;
}

export function NextCaseStudy({ route, title, number }: NextCaseProps) {
  return (
    <section className="relative px-6 pt-20 pb-24 max-w-7xl mx-auto">
      <Link to={route} className="block group">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-border/40 pt-20"
        >
          <div className="flex flex-row justify-between items-baseline">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Next Case Study · {number}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition-transform duration-500 group-hover:translate-x-2">
              Continue →
            </span>
          </div>

          <h2
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.98] tracking-[-2px] max-w-6xl mt-12 text-balance transition-opacity duration-500 group-hover:opacity-70"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {title}
          </h2>
        </motion.div>
      </Link>
    </section>
  );
}

// ------------------------------------------------------------------
// Looping muted video (compressed teaser)
// ------------------------------------------------------------------
type CaseStudyVideoProps = {
  index: string;
  label: string;
  caption: string;
  src: string;
  poster?: string;
  /** max width in px for near-square videos so they don't dominate */
  maxWidth?: number;
};

export function CaseStudyVideo({
  index,
  label,
  caption,
  src,
  poster,
  maxWidth,
}: CaseStudyVideoProps) {
  return (
    <section className="relative px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index} · {label}
        </span>
        <div
          className="relative mt-6 mx-auto"
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        >
          <figure className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
            <video
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto block"
            />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
          </figure>
          <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-4">
            {index} · {caption}
          </figcaption>
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// Two-up media grid (images side by side)
// ------------------------------------------------------------------
type MediaItem = { src: string; alt: string; caption: string };

export function CaseStudyMediaGrid({
  index,
  label,
  items,
}: {
  index: string;
  label: string;
  items: MediaItem[];
}) {
  return (
    <section className="relative px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index} · {label}
        </span>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <div key={i}>
              {it.src ? (
                <figure className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
                  <img
                    src={it.src}
                    alt={it.alt}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
                  <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
                  <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
                </figure>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-dashed border-white/[0.12] bg-white/[0.015] aspect-video flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
                    Media slot
                  </span>
                  <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
                  <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
                  <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />
                </div>
              )}
              <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-4">
                {it.caption}
              </figcaption>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// Brochure flipbook (self-contained page-turning viewer)
// ------------------------------------------------------------------
type BrochureProps = {
  index: string;
  label: string;
  caption: string;
  /** total number of pages; files expected at `${basePath}/page-NN.webp` (1-indexed, zero-padded) */
  pageCount: number;
  basePath: string;
};

export function CaseStudyBrochure({
  index,
  label,
  caption,
  pageCount,
  basePath,
}: BrochureProps) {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const pad = (n: number) => String(n + 1).padStart(2, "0");
  const go = (dir: number) =>
    setPage((p) => Math.min(pageCount - 1, Math.max(0, p + dir)));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section className="relative px-6 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index} · {label}
        </span>

        <div
          className="relative mt-6 rounded-2xl overflow-hidden border border-white/[0.06] bg-black"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Page stage */}
          <div className="relative mx-auto" style={{ maxWidth: 620 }}>
            <motion.img
              key={page}
              src={`${basePath}/page-${pad(page)}.webp`}
              alt={`Brochure page ${page + 1}`}
              className="w-full h-auto block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Prev / Next click zones */}
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => go(-1)}
            disabled={page === 0}
            className="absolute inset-y-0 left-0 w-1/4 flex items-center justify-start pl-4 text-white/70 hover:text-white disabled:opacity-0 transition"
          >
            <span className="text-3xl select-none">‹</span>
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => go(1)}
            disabled={page === pageCount - 1}
            className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end pr-4 text-white/70 hover:text-white disabled:opacity-0 transition"
          >
            <span className="text-3xl select-none">›</span>
          </button>

          {/* Corner marks */}
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
        </div>

        {/* Controls row */}
        <div className="mt-4 flex items-center justify-between">
          <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
            {index} · {caption}
          </figcaption>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 tabular-nums">
              {page + 1} / {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={page === 0}
                className="w-8 h-8 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 transition flex items-center justify-center"
                aria-label="Previous page"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={page === pageCount - 1}
                className="w-8 h-8 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 transition flex items-center justify-center"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all",
                i === page
                  ? "w-6 bg-white/80"
                  : "w-3 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// Horizontal media carousel (uniform height, no cropping)
// Items scroll horizontally; each keeps its native aspect at a shared height.
// ------------------------------------------------------------------
type CarouselItem = { src: string; alt: string; caption?: string };

export function CaseStudyCarousel({
  index,
  label,
  items,
}: {
  index: string;
  label: string;
  items: CarouselItem[];
}) {
  const scroller = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="relative py-16">
      <div className="px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {index} · {label}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition flex items-center justify-center"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition flex items-center justify-center"
              >
                ›
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edge-bleed scroller */}
      <div
        ref={scroller}
        className="mt-6 flex gap-5 overflow-x-auto scrollbar-hidden snap-x snap-mandatory px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((it, i) => (
          <figure
            key={i}
            className="snap-start shrink-0 group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
              {/* Uniform height, width auto -> no cropping */}
              <img
                src={it.src}
                alt={it.alt}
                className="h-[60vh] max-h-[640px] w-auto block"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
              <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
            </div>
            {it.caption && (
              <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-3">
                {it.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Single full-bleed image, never cropped (height auto, full width within frame)
// ------------------------------------------------------------------
export function CaseStudyImage({
  index,
  label,
  caption,
  src,
  alt,
  maxWidth,
}: {
  index: string;
  label: string;
  caption: string;
  src: string;
  alt: string;
  maxWidth?: number;
}) {
  return (
    <section className="relative px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index} · {label}
        </span>
        <div
          className="relative mt-6 mx-auto"
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        >
          <figure className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
            <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
          </figure>
          <figcaption className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mt-4">
            {index} · {caption}
          </figcaption>
        </div>
      </motion.div>
    </section>
  );
}
