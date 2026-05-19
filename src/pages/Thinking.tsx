import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useMediaPipe } from "@/hooks/useMediaPipe";
import { useGestures } from "@/hooks/useGestures";
import type { GestureState } from "@/hooks/useGestures";
import { renderCanvas } from "@/lib/canvasRenderer";
import { gestureGallery } from "@/data/gestureGallery";

// ─── Audio click for clap ───────────────────────────────────
function playClick() {
  try {
    const ac = new AudioContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = 4000;
    gain.gain.setValueAtTime(0.3, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.08);
  } catch {
    // audio not available
  }
}

// ─── Typewriter component ───────────────────────────────────
function Typewriter({ text, show }: { text: string; show: boolean }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!show) { setDisplayed(""); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [show, text]);
  if (!show) return null;
  return (
    <span style={{ fontFamily: "'Instrument Serif', serif" }}>
      {displayed}
    </span>
  );
}

export default function Thinking() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [cameraPending, setCameraPending] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [canvasSize, setCanvasSize] = useState({ w: 960, h: 540 });

  // Gesture overlays state
  const [activeGestures, setActiveGestures] = useState<GestureState[]>([]);
  const [gestureLog, setGestureLog] = useState<{ name: string; time: string }[]>([]);
  const [lastGestureName, setLastGestureName] = useState("");
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [videoScale, setVideoScale] = useState(1);
  const [shaking, setShaking] = useState(false);
  const [slideDir, setSlideDir] = useState<string | null>(null);

  // Cooldowns
  const cooldownRef = useRef<Record<string, number>>({});
  const clapCooldownRef = useRef(0);
  const shakeCooldownRef = useRef(0);
  const swipeCooldownRef = useRef(0);

  const { ready: mpReady, subscribe } = useMediaPipe(videoRef, cameraEnabled);
  const { detect, paintTrailRef } = useGestures(canvasSize.w, canvasSize.h);

  // ─── Auto-request camera on mount (800ms delay) ────────────
  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCameraPending(false);
        setCameraEnabled(true);
      } catch {
        if (!cancelled) {
          setCameraPending(false);
          setCameraDenied(true);
        }
      }
    }, 800);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Resize canvas to match video container
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setCanvasSize({ w: Math.round(width), h: Math.round(height) });
        }
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // ─── Detection loop ────────────────────────────────────────
  useEffect(() => {
    if (!mpReady || !cameraEnabled) return;

    const unsub = subscribe((hands, face) => {
      const gestures = detect(hands, face);
      setActiveGestures(gestures);

      const now = performance.now();
      const activeNames = gestures.filter((g) => g.active).map((g) => g.name);

      // Log new gestures with cooldown
      for (const name of activeNames) {
        if (!cooldownRef.current[name] || now - cooldownRef.current[name] > 2000) {
          cooldownRef.current[name] = now;
          setLastGestureName(name);
          setGestureLog((prev) => {
            const entry = {
              name,
              time: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };
            return [entry, ...prev].slice(0, 3);
          });
        }
      }

      // Clap → flash
      if (activeNames.includes("clap") && now - clapCooldownRef.current > 1000) {
        clapCooldownRef.current = now;
        setFlashOpacity(0.9);
        playClick();
        setTimeout(() => setFlashOpacity(0), 600);
      }

      // Pinch zoom
      const pinch = gestures.find((g) => g.name === "pinchZoom" && g.active);
      if (pinch?.data) {
        const s = pinch.data.scale as number;
        setVideoScale((prev) => prev + (s - prev) * 0.15);
      } else {
        setVideoScale((prev) => prev + (1 - prev) * 0.1);
      }

      // Mouth open → zoom out
      if (activeNames.includes("mouthOpen")) {
        setVideoScale((prev) => prev + (0.92 - prev) * 0.1);
      }

      // Fist → shake
      if (activeNames.includes("fist") && now - shakeCooldownRef.current > 2000) {
        shakeCooldownRef.current = now;
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }

      // Swipe → slide
      if (activeNames.includes("swipe") && now - swipeCooldownRef.current > 1000) {
        swipeCooldownRef.current = now;
        const dir = gestures.find((g) => g.name === "swipe")?.data?.direction as string;
        setSlideDir(dir);
        setTimeout(() => setSlideDir(null), 300);
      }

      // Canvas render
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          renderCanvas(ctx, canvas.width, canvas.height, gestures, paintTrailRef.current);
        }
      }
    });

    return unsub;
  }, [mpReady, cameraEnabled, subscribe, detect, paintTrailRef]);

  // Check which text overlays are active
  const isActive = (name: string) => activeGestures.some((g) => g.name === name && g.active);

  const shakeStyle = shaking
    ? { animation: "shake 0.4s ease-in-out" }
    : {};

  const slideTransform = slideDir
    ? `translateX(${slideDir === "right" ? "30px" : "-30px"})`
    : "translateX(0)";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full bg-background overflow-hidden"
    >
      <Navigation />

      {/* ─── Opening ─────────────────────────────────────────── */}
      <section className="relative px-6 pt-24 pb-12 max-w-3xl mx-auto">
        <div className="animate-fade-rise">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Thinking · Under Construction
          </span>
        </div>
        <h1
          className="animate-fade-rise-delay text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-1px] max-w-3xl font-normal mt-6 text-balance"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          This page is currently under construction.
        </h1>
        <p className="animate-fade-rise-delay-2 text-muted-foreground text-base sm:text-lg max-w-xl mt-4 leading-relaxed">
          In the meantime, here is a small experiment. Allow camera access and
          try gesturing at the screen.
        </p>
      </section>

      {/* ─── Two-column layout: Gallery + Camera ────────────── */}
      <div className="flex flex-col lg:flex-row gap-12 px-6 max-w-7xl mx-auto pb-32">

        {/* ─── Left: Gesture Gallery ──────────────────────────── */}
        <aside className="w-full lg:w-[380px] lg:shrink-0 order-2 lg:order-1 lg:border-r lg:border-border/40 lg:pr-10 lg:sticky lg:top-24 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block">
              The Full Vocabulary
            </span>
            <h2
              className="text-2xl sm:text-3xl leading-[1.05] tracking-[-1px] mt-4 text-balance"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Gesture Gallery
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mt-4 leading-relaxed">
              Some gestures are obvious. Some take a moment to discover. All work in
              your browser, with no data leaving your device.
            </p>
          </motion.div>

          <div className="mt-10 space-y-10">
            {gestureGallery.map((group) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="border-t border-border/40 pt-6 mb-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {group.category}
                  </span>
                </div>

                <div className="space-y-6">
                  {group.entries.map((entry) => (
                    <div key={entry.index} className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {entry.index}
                      </span>
                      <span
                        className="text-lg leading-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {entry.name}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {entry.description}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </aside>

        {/* ─── Right: Camera Playground ───────────────────────── */}
        <div className="flex-1 order-1 lg:order-2 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Video frame */}
            <div
              ref={containerRef}
              className="relative w-full editorial-placeholder"
              style={{
                aspectRatio: "16/9",
                transform: `scale(${videoScale}) ${slideTransform}`,
                transition: slideDir ? "transform 0.2s ease-out" : "transform 0.3s ease-out",
                ...shakeStyle,
              }}
            >
              {/* Corner marks */}
              <span className="corner-mark border-t border-l top-4 left-4" />
              <span className="corner-mark border-t border-r top-4 right-4" />
              <span className="corner-mark border-b border-l bottom-4 left-4" />
              <span className="corner-mark border-b border-r bottom-4 right-4" />

              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "scaleX(-1)", display: cameraEnabled ? "block" : "none" }}
                autoPlay
                playsInline
                muted
              />

              <canvas
                ref={canvasRef}
                width={canvasSize.w}
                height={canvasSize.h}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2 }}
              />

              {/* Pending / Denied captions inside the frame */}
              {!cameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
                  <span className="text-sm text-muted-foreground">
                    {cameraPending
                      ? "Awaiting camera permission..."
                      : cameraDenied
                        ? "Camera access declined. Refresh the page and grant permission to play."
                        : ""}
                  </span>
                </div>
              )}

              {/* Flash overlay for clap */}
              <div
                className="absolute inset-0 bg-white pointer-events-none"
                style={{
                  zIndex: 3,
                  opacity: flashOpacity,
                  transition: "opacity 0.6s ease-out",
                }}
              />

              {/* Status dot + gesture name, top-left */}
              <div className="absolute top-6 left-6 flex items-center gap-2" style={{ zIndex: 4 }}>
                <div
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: activeGestures.some((g) => g.active)
                      ? "white"
                      : "rgba(255,255,255,0.3)",
                  }}
                />
                <AnimatePresence mode="wait">
                  {lastGestureName && (
                    <motion.span
                      key={lastGestureName + Date.now()}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs uppercase tracking-wide text-white/70"
                    >
                      {lastGestureName}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Gesture log, bottom-left */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-1" style={{ zIndex: 4 }}>
                {gestureLog.map((entry, i) => (
                  <span
                    key={i}
                    className="text-xs uppercase tracking-wide text-white/40"
                  >
                    {entry.time} — {entry.name}
                  </span>
                ))}
              </div>

              {/* ─── Text Overlays ─────────────────────────── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("slap") && (
                    <motion.span
                      key="slap"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, exit: { duration: 0.8 } }}
                      className="text-white text-center"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      ouch that hurt
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Peace - top right */}
              <div className="absolute top-10 right-10 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("peace") && (
                    <motion.span
                      key="peace"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-white"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      ✌️ peace
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Thumbs up - center */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("thumbsUp") && (
                    <motion.span
                      key="thumbs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-white whitespace-nowrap"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      noted, thanks
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Hand on chin - bottom center */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("handOnChin") && (
                    <motion.span
                      key="chin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white/60 italic whitespace-nowrap"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(24px, 4vw, 64px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      thinking…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Hands raised - center large */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("handsRaised") && (
                    <motion.span
                      key="raised"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="text-white text-center"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(60px, 8vw, 120px)",
                        textShadow: "0 2px 30px rgba(0,0,0,0.5)",
                      }}
                    >
                      let it all out
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Head tilt */}
              <div className="absolute top-1/3 right-10 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("tiltLeft") && (
                    <motion.span
                      key="tiltL"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white italic"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      hmm
                    </motion.span>
                  )}
                  {isActive("tiltRight") && (
                    <motion.span
                      key="tiltR"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white italic"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      huh
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Eyebrow raise */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("eyebrowRaise") && (
                    <motion.span
                      key="brow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white italic"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      interesting
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Pointing - typewriter */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
                <span
                  className="text-white"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(40px, 6vw, 96px)",
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Typewriter text="you, yes you" show={isActive("pointing")} />
                </span>
              </div>

              {/* Shaka */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 5 }}>
                <AnimatePresence>
                  {isActive("shaka") && (
                    <motion.span
                      key="shaka"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white whitespace-nowrap"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(40px, 6vw, 96px)",
                        textShadow: "0 2px 30px rgba(255,255,255,0.3), 0 2px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      stay in touch
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Note below frame */}
            <p className="text-center text-xs text-muted-foreground/50 mt-8 max-w-xl mx-auto">
              Made with MediaPipe. No video is recorded or transmitted — all detection
              runs locally in your browser.
            </p>

            {/* Loading indicator while MediaPipe initializes */}
            {cameraEnabled && !mpReady && (
              <p className="text-center text-sm text-muted-foreground mt-6 animate-pulse">
                Loading gesture detection models…
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Shake keyframes (injected once) */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate3d(0, 0, 0); }
          10% { transform: translate3d(-4px, 0, 0); }
          20% { transform: translate3d(4px, 0, 0); }
          30% { transform: translate3d(-4px, 0, 0); }
          40% { transform: translate3d(4px, 0, 0); }
          50% { transform: translate3d(-2px, 0, 0); }
          60% { transform: translate3d(2px, 0, 0); }
          70% { transform: translate3d(-1px, 0, 0); }
          80% { transform: translate3d(1px, 0, 0); }
          90% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </motion.main>
  );
}
