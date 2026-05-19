import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4";

interface ExperimentMetric {
  value: string;
  label: string;
}

interface Experiment {
  number: string;
  shortName: string;
  description: string;
  metrics: ExperimentMetric[];
  placeholder: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    number: "01",
    shortName: "AR Packaging",
    description:
      "Augmented reality packaging that transforms physical products into interactive brand experiences.",
    metrics: [
      { value: "4.2×", label: "Scan-through rate" },
      { value: "38s", label: "Avg interaction time" },
      { value: "12K", label: "Social shares" },
    ],
    placeholder: "Placeholder for AR packaging product visuals.",
  },
  {
    number: "02",
    shortName: "Phygital Invitation",
    description:
      "A printed invitation that opens into an immersive AR welcome experience for senior executives.",
    metrics: [
      { value: "87%", label: "CXO scan rate" },
      { value: "12", label: "Cities activated" },
      { value: "4 min", label: "Avg dwell time" },
    ],
    placeholder: "Placeholder for phygital invitation reveal moment.",
  },
  {
    number: "03",
    shortName: "AR Gift Box",
    description:
      "A premium gift box that unlocks a personalised AR film when opened.",
    metrics: [
      { value: "92%", label: "Completion rate" },
      { value: "156", label: "Boxes shipped" },
      { value: "3.4 min", label: "Avg engagement" },
    ],
    placeholder: "Placeholder for AR gift box unboxing sequence.",
  },
  {
    number: "04",
    shortName: "Merlin Voice Avatar",
    description:
      "An AI voice avatar that brings Merlin to life as a multilingual conversational guide.",
    metrics: [
      { value: "150+", label: "Languages supported" },
      { value: "8.7K", label: "Conversations completed" },
      { value: "4.2/5", label: "Avg sentiment" },
    ],
    placeholder: "Placeholder for Merlin avatar interaction visuals.",
  },
  {
    number: "05",
    shortName: "Reconciliation ROI Calculator",
    description:
      "An interactive web tool that quantifies the operational cost of legacy reconciliation systems.",
    metrics: [
      { value: "1.4K", label: "Leads captured" },
      { value: "23%", label: "Demo conversion" },
      { value: "6 min", label: "Avg session" },
    ],
    placeholder: "Placeholder for ROI calculator interface mockup.",
  },
  {
    number: "06",
    shortName: "Interactive Whitepaper",
    description:
      "A scrollable, animated whitepaper that turns research into a cinematic narrative.",
    metrics: [
      { value: "3.1×", label: "Completion vs PDF" },
      { value: "11 min", label: "Avg read time" },
      { value: "2.8K", label: "Downloads" },
    ],
    placeholder: "Placeholder for interactive whitepaper scroll sequence.",
  },
];

// ----------------------------------------------------------------------
// Tile content (used in both desktop active-pane and mobile stack)
// ----------------------------------------------------------------------
function TileContent({ exp }: { exp: Experiment }) {
  return (
    <div className="w-full">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Experiment {exp.number} · {exp.shortName}
      </span>

      <h3
        className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.08] tracking-[-1px] text-balance mt-6 max-w-3xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {exp.description}
      </h3>

      <div className="flex flex-row flex-wrap gap-x-10 gap-y-6 mt-10">
        {exp.metrics.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span
              className="text-3xl sm:text-4xl md:text-5xl leading-none tracking-[-1px]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {m.value}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 mt-3 max-w-[140px]">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Editorial media placeholder */}
      <div className="relative w-full aspect-[16/9] mt-10 rounded-xl overflow-hidden border border-white/[0.06]">
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
        <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/25" />
        <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/25" />
        <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/25" />
        <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/25" />
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <span
            className="text-muted-foreground/70 text-sm max-w-md"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {exp.placeholder}
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main page
// ----------------------------------------------------------------------
export default function Experiments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ensure video is paused and ready to scrub
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch {
        // ignore
      }
    };
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  // Scrub video + update active index as scroll progresses
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const targetTime = v * video.duration;
      // Skip micro-updates to reduce seek thrashing
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        try {
          video.currentTime = targetTime;
        } catch {
          // ignore seek errors
        }
      }
    }

    const idx = Math.min(
      Math.floor(v * EXPERIMENTS.length),
      EXPERIMENTS.length - 1
    );
    setActiveIndex(idx);
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-background"
      style={{ overflowX: "clip" }}
    >
      <Navigation />

      {/* Hero / intro */}
      <section className="relative px-6 pt-12 pb-6 sm:pt-20 sm:pb-10 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground block"
        >
          Experiments
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl leading-[1.02] tracking-[-1.5px] max-w-5xl mt-8 text-balance font-normal"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Small explorations at the edges of{" "}
          <em className="not-italic text-muted-foreground">brand</em>,{" "}
          <em className="not-italic text-muted-foreground">technology</em>, and{" "}
          <em className="not-italic text-muted-foreground">storytelling.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
        >
          A collection of things built outside the brief. AR experiences,
          interactive tools, AI characters, and editorial systems made to test
          what is possible in modern marketing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70 mt-10"
        >
          Scroll to scrub
        </motion.p>
      </section>

      {/* Desktop scroll-scrub section ----------------------------------- */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${EXPERIMENTS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: scrubbing video */}
            <div className="col-span-3 flex items-center justify-center">
              <div
                className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.06]"
                style={{
                  aspectRatio: "9 / 16",
                  height: "min(80vh, 720px)",
                }}
              >
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-hidden="true"
                />
                {/* Subtle inner border to match site treatment */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                />
              </div>
            </div>

            {/* Reel column */}
            <div className="col-span-1 relative h-[70vh]">
              {/* Base line */}
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10" />
              {/* Progress line */}
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-white/70 origin-top"
                style={{
                  height: "100%",
                  scaleY: scrollYProgress,
                }}
              />

              {/* Markers */}
              {EXPERIMENTS.map((exp, i) => {
                const isActive = activeIndex === i;
                const isPast = activeIndex > i;
                return (
                  <div
                    key={exp.number}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      top: `${((i + 0.5) / EXPERIMENTS.length) * 100}%`,
                    }}
                  >
                    <div className="relative flex items-center">
                      <div
                        className={cn(
                          "rounded-full transition-all duration-500",
                          isActive
                            ? "w-3 h-3 bg-white shadow-[0_0_16px_rgba(255,255,255,0.5)]"
                            : isPast
                              ? "w-2 h-2 bg-white/60"
                              : "w-2 h-2 bg-white/20"
                        )}
                      />
                      <span
                        className={cn(
                          "absolute left-6 text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 whitespace-nowrap",
                          isActive ? "text-white" : "text-white/40"
                        )}
                      >
                        {exp.number}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active tile */}
            <div className="col-span-8 flex items-center min-h-[70vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <TileContent exp={EXPERIMENTS[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback: simple vertical stack ------------------------- */}
      <div className="lg:hidden px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {EXPERIMENTS.map((exp) => (
            <motion.div
              key={exp.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TileContent exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing ---------------------------------------------------------- */}
      <section className="relative px-6 py-32 max-w-7xl mx-auto">
        <div className="border-t border-border/40 pt-16 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
          <p
            className="text-2xl sm:text-3xl leading-tight tracking-[-0.5px] max-w-2xl text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            More experiments in progress. The lab is always open.
          </p>
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Back to start →
          </Link>
        </div>
      </section>
    </motion.main>
  );
}
