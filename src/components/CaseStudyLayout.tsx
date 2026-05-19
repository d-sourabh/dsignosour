import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
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
  reverse?: boolean;
  pull?: ReactNode;
}

export function CaseStudySection({
  index,
  label,
  heading,
  body,
  placeholder,
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

          {placeholder && (
            <div className={cn("mt-20", reverse && "lg:-ml-20")}>
              <EditorialPlaceholder
                label={placeholder}
                index={index}
                aspect="wide"
              />
            </div>
          )}
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
