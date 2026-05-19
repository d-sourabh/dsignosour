import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useMediaPipe } from "@/hooks/useMediaPipe";
import { useGestures } from "@/hooks/useGestures";
import type { DetectionResult } from "@/hooks/useGestures";
import { drawFrame } from "@/lib/canvasRenderer";
import type { FilterState } from "@/lib/canvasRenderer";
import { GESTURES } from "@/data/gestureGallery";

// Priority order: when multiple gestures detected, pick the first that's active + enabled
const PRIORITY = [
  "pinch",
  "okSign",
  "rockOn",
  "peace",
  "threeFingers",
  "pointing",
  "thumbsUp",
  "thumbDown",
  "fist",
  "openPalm",
];

export default function Thinking() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [cameraPending, setCameraPending] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [canvasSize, setCanvasSize] = useState({ w: 960, h: 540 });

  // Toggle state: gesture id → enabled
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    GESTURES.forEach((g) => (map[g.id] = true));
    return map;
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [thumbsUpVisible, setThumbsUpVisible] = useState(false);

  // Refs for the render loop (avoid re-render churn)
  const detectionRef = useRef<DetectionResult>({
    gestures: [],
    indexFingertip: null,
    palmCenter: null,
    pinchPoint: null,
  });
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const { ready: mpReady, subscribe } = useMediaPipe(videoRef, cameraEnabled);
  const { detect } = useGestures(canvasSize.w, canvasSize.h);

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

  // Resize canvas internal resolution to container size (cap at 720p-ish for perf)
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          // Internal resolution capped for filter perf
          const maxW = 960;
          const scale = Math.min(1, maxW / width);
          setCanvasSize({
            w: Math.round(width * scale),
            h: Math.round(height * scale),
          });
        }
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Subscribe to MediaPipe detections
  useEffect(() => {
    if (!mpReady || !cameraEnabled) return;

    const unsub = subscribe((hands, face) => {
      const result = detect(hands, face);
      detectionRef.current = result;
    });

    return unsub;
  }, [mpReady, cameraEnabled, subscribe, detect]);

  // Render loop: draws video to canvas every frame, applies filter from active gesture
  useEffect(() => {
    if (!cameraEnabled) return;

    let rafId = 0;
    const loop = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video && video.readyState >= 2) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Determine active filter from priority order, skipping disabled gestures
          const det = detectionRef.current;
          const activeNames = new Set(
            det.gestures.filter((g) => g.active).map((g) => g.name)
          );
          let chosen: string | null = null;
          for (const id of PRIORITY) {
            if (activeNames.has(id) && enabledRef.current[id]) {
              chosen = id;
              break;
            }
          }
          // Update React state only when filter changes (avoid render churn)
          if (chosen !== activeFilter) setActiveFilter(chosen);

          // Toggle thumbs-up overlay
          const showThumbs = activeNames.has("thumbsUp") && enabledRef.current["thumbsUp"];
          if (showThumbs !== thumbsUpVisible) setThumbsUpVisible(showThumbs);

          const filterState: FilterState = {
            // Thumbs-up doesn't have a visual filter; only the text overlay shows.
            active: chosen === "thumbsUp" ? null : chosen,
            indexFingertip: det.indexFingertip,
            palmCenter: det.palmCenter,
            pinchPoint: det.pinchPoint,
          };

          drawFrame(ctx, video, filterState);
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [cameraEnabled, activeFilter, thumbsUpVisible]);

  const toggleGesture = useCallback((id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleAll = useCallback(
    (value: boolean) => {
      const map: Record<string, boolean> = {};
      GESTURES.forEach((g) => (map[g.id] = value));
      setEnabled(map);
    },
    []
  );

  const allOn = GESTURES.every((g) => enabled[g.id]);

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

      {/* Intro */}
      <section className="relative px-6 pt-12 pb-10 sm:pt-16 sm:pb-12 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground block"
        >
          Thinking
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1px] max-w-4xl mt-6 text-balance font-normal"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          A small experiment in{" "}
          <em className="not-italic text-muted-foreground">gesture-controlled</em>{" "}
          camera filters, built with MediaPipe Hands.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-muted-foreground text-base max-w-2xl mt-6 leading-relaxed"
        >
          Each hand pose triggers a different visual treatment on your webcam
          feed. The white dot tracks your index fingertip. Toggle any gesture off
          if you want to disable it.
        </motion.p>
      </section>

      {/* Main layout: gallery on left, camera on right */}
      <div className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          {/* ─── Left: Gesture gallery with toggles ─── */}
          <aside className="order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Gesture Gallery
              </span>
              <button
                onClick={() => toggleAll(!allOn)}
                className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {allOn ? "Disable all" : "Enable all"}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {GESTURES.map((g) => {
                const isOn = !!enabled[g.id];
                const isActive = activeFilter === g.id || (g.id === "thumbsUp" && thumbsUpVisible);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGesture(g.id)}
                    className={`relative text-left rounded-xl border p-4 transition-all duration-200 ${
                      isOn
                        ? "border-white/[0.10] bg-white/[0.02]"
                        : "border-white/[0.04] bg-transparent opacity-50"
                    } ${isActive ? "ring-1 ring-white/40 shadow-[0_0_24px_rgba(255,255,255,0.05)]" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-[3px] w-5 shrink-0">
                        {g.index}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="text-[15px] leading-tight"
                            style={{
                              fontFamily: "'Instrument Serif', serif",
                            }}
                          >
                            {g.name}
                          </span>
                          {/* Toggle pill */}
                          <span
                            className={`shrink-0 w-7 h-4 rounded-full transition-colors relative ${
                              isOn ? "bg-white/70" : "bg-white/15"
                            }`}
                            aria-hidden="true"
                          >
                            <span
                              className={`absolute top-[2px] w-3 h-3 rounded-full bg-background transition-all ${
                                isOn ? "left-[14px]" : "left-[2px]"
                              }`}
                            />
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-[1.45] mt-1">
                          {g.description}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 mt-2">
                          {g.filter}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] text-muted-foreground/50 leading-relaxed mt-6">
              All detection runs locally in your browser. No video is recorded or
              transmitted.
            </p>
          </aside>

          {/* ─── Right: Camera + canvas ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div
              ref={containerRef}
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/[0.06]"
            >
              {/* Hidden video element. The canvas draws frames from it. */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* Display canvas */}
              <canvas
                ref={canvasRef}
                width={canvasSize.w}
                height={canvasSize.h}
                className="absolute inset-0 w-full h-full"
              />

              {/* Camera pending overlay */}
              {cameraPending && (
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <span className="text-muted-foreground text-sm">
                    Requesting camera access...
                  </span>
                </div>
              )}

              {/* Camera denied overlay */}
              {cameraDenied && (
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <div className="max-w-sm">
                    <p
                      className="text-xl mb-3"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      Camera access denied
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Enable camera access in your browser settings to try this
                      experiment. Nothing is recorded or transmitted.
                    </p>
                  </div>
                </div>
              )}

              {/* MediaPipe loading */}
              {cameraEnabled && !mpReady && (
                <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/80 animate-pulse">
                  Loading detection models...
                </div>
              )}

              {/* Active filter label */}
              {activeFilter && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/90">
                    {GESTURES.find((g) => g.id === activeFilter)?.filter}
                  </span>
                </div>
              )}

              {/* Thumbs up text overlay (the only text overlay kept) */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <AnimatePresence>
                  {thumbsUpVisible && (
                    <motion.span
                      key="thumbs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
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
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
