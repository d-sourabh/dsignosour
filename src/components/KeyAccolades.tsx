import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Accolade {
  title: string;
  detail: string;
  /** 16:9 image path under public/. Falls back to an editorial placeholder when absent. */
  image?: string;
}

const ACCOLADES: Accolade[] = [
  {
    title: "Runner-Up, RBI NCMC Ideathon",
    detail:
      "A national-level RBI competition, for the NCMC Karmanya Card: One Nation, One Workforce, integrating public transit, workplace access, and everyday transactions for the working population.",
  },
  {
    title: "Best Campaign Award, FSS BLAZE",
    detail: "E4M Marketing Awards, 2024.",
  },
  {
    title: "Digital Dragons Award, 2025",
    detail:
      "Best B2B Marketing Campaign, for a 360-degree digital performance campaign targeting bankers.",
  },
  {
    title: "Best Event Marketing Campaign, 2026",
    detail:
      "FSS Simply Payments across Mumbai and Dubai, World Fintech Awards.",
  },
  {
    title: "Member, CBDC Centre of Excellence",
    detail: "Part of the Central Bank Digital Currency Centre of Excellence.",
  },
  {
    title: "AI Champion",
    detail: "Recognised AI Champion member, with formal AI training completed.",
  },
  {
    title: "5x Winner, Team of the Quarter",
    detail: "Recognised five times at FSS.",
  },
];

export default function KeyAccolades() {
  const [index, setIndex] = useState(0);
  const count = ACCOLADES.length;

  // Auto-advance every 5 seconds. Keyed on index so manual selection resets the timer.
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearTimeout(id);
  }, [index, count]);

  const current = ACCOLADES[index];

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
        className="text-4xl sm:text-6xl leading-tight max-w-4xl mt-10 text-balance"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Recognition across category creation, campaigns, events, and emerging
        payments.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
        {/* 16:9 stage */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.012]">
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
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
                  <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/25" />
                  <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/25" />
                  <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/25" />
                  <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/40">
                      Photo placeholder · 16 : 9
                    </span>
                  </div>
                </>
              )}

              {/* Scrim so captions stay legible over photos */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Two-line caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <p
                  className="text-2xl sm:text-3xl leading-tight text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {current.title}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  {current.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide counter */}
          <div className="absolute top-4 right-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {ACCOLADES.map((accolade, i) => (
            <button
              key={accolade.title}
              onClick={() => setIndex(i)}
              aria-label={`Show accolade ${i + 1}: ${accolade.title}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-white/70"
                  : "w-1.5 bg-white/20 hover:bg-white/40 cursor-pointer"
              )}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
