import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full">
      {/* Cinematic closing zone: full-bleed video with overlay text */}
      <section className="relative w-full h-[60vh] min-h-[420px] sm:h-[70vh] sm:min-h-[520px] overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/footer-cliff.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/footer-cliff.mp4" type="video/mp4" />
        </video>

        {/* Top gradient: softens the eyebrow area, keeps it legible */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bottom gradient: deeper, so text sits cleanly + transitions into the navy contact area below */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, hsl(var(--background)) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Overlay content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-start justify-end h-full px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 max-w-7xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">
            End of Reel
          </span>

          <p
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-[-1px] max-w-3xl mt-6 text-white text-balance"
            style={{
              fontFamily: "'Instrument Serif', serif",
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}
          >
            Most of the work happens{" "}
            <em className="not-italic text-white/70">quietly,</em> far from the
            noise.
          </p>
        </motion.div>
      </section>

      {/* Contact zone: sits on the site's navy background */}
      <div className="relative px-6 pt-32 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2px] max-w-5xl text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let&apos;s build the next{" "}
            <em className="not-italic text-muted-foreground">narrative.</em>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mt-8 leading-relaxed">
            Open to collaborations across product marketing, brand
            transformation, and AI-first storytelling.
          </p>

          <div className="flex flex-row items-center gap-4 mt-12">
            <a
              href="mailto:srbhdhavala@gmail.com"
              aria-label="Email"
              className="liquid-glass rounded-full w-[52px] h-[52px] flex items-center justify-center text-foreground hover:scale-[1.03] transition-transform duration-300"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/dhavala-sourabh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="liquid-glass rounded-full w-[52px] h-[52px] flex items-center justify-center text-foreground hover:scale-[1.03] transition-transform duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://wa.link/tf9g4j"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform duration-300"
            >
              Say Hi
            </a>
          </div>
        </motion.div>

        <div className="mt-32 flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-border/40">
          <span
            className="text-2xl tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Dhavala Sourabh
          </span>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            dsignosour · Bengaluru · 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
