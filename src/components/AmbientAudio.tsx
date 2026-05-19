import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "dsignosour-ambient-muted";
const TARGET_VOLUME = 0.35;

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Clear any in-progress fade
  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  // Fade volume in: 0 → TARGET_VOLUME over 1.5s
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    audio.volume = 0;
    audio.play().catch(() => {});
    const steps = 30;
    const stepTime = 1500 / steps;
    const increment = TARGET_VOLUME / steps;
    let current = 0;
    fadeRef.current = setInterval(() => {
      current += increment;
      if (current >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        clearFade();
      } else {
        audio.volume = current;
      }
    }, stepTime);
  }, [clearFade]);

  // Fade volume out: current → 0 over 800ms, then pause
  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const startVol = audio.volume;
    if (startVol <= 0) {
      audio.pause();
      return;
    }
    const steps = 20;
    const stepTime = 800 / steps;
    const decrement = startVol / steps;
    let current = startVol;
    fadeRef.current = setInterval(() => {
      current -= decrement;
      if (current <= 0) {
        audio.volume = 0;
        audio.pause();
        clearFade();
      } else {
        audio.volume = current;
      }
    }, stepTime);
  }, [clearFade]);

  // Toggle play/pause
  const toggle = useCallback(() => {
    if (!hasInteracted) setHasInteracted(true);
    if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
      sessionStorage.setItem(STORAGE_KEY, "true");
    } else {
      fadeIn();
      setIsPlaying(true);
      sessionStorage.setItem(STORAGE_KEY, "false");
    }
  }, [isPlaying, fadeIn, fadeOut, hasInteracted]);

  // On mount: restore session preference
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "false") {
      // User previously opted in — try to resume
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            // Fade in
            const steps = 30;
            const stepTime = 1500 / steps;
            const increment = TARGET_VOLUME / steps;
            let current = 0;
            fadeRef.current = setInterval(() => {
              current += increment;
              if (current >= TARGET_VOLUME) {
                audio.volume = TARGET_VOLUME;
                if (fadeRef.current !== null) clearInterval(fadeRef.current);
                fadeRef.current = null;
              } else {
                audio.volume = current;
              }
            }, stepTime);
          })
          .catch(() => {
            // Autoplay blocked — stay muted
          });
      }
    }

    return () => {
      clearFade();
    };
  }, [clearFade]);

  // Show hint tooltip 3s after mount, hide after 8s or on first interaction
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!hasInteracted) setShowHint(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowHint(false);
    }, 11000); // 3s delay + 8s visible

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasInteracted]);

  // Hide hint on first interaction
  useEffect(() => {
    if (hasInteracted) setShowHint(false);
  }, [hasInteracted]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/mountain-alps-ambience.mp3"
        loop
        preload="auto"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-3"
      >
        {/* Hint tooltip */}
        <AnimatePresence>
          {showHint && !hasInteracted && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                exit: { duration: 0.3 },
              }}
              className="text-xs text-muted-foreground whitespace-nowrap select-none"
            >
              Sound on for full experience
            </motion.span>
          )}
        </AnimatePresence>

        {/* Toggle pill */}
        <button
          onClick={toggle}
          aria-label="Toggle ambient sound"
          aria-pressed={isPlaying}
          className="liquid-glass rounded-full h-11 px-4 flex items-center gap-2 text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
        >
          {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span className="text-xs uppercase tracking-wide">Ambience</span>
        </button>
      </motion.div>
    </>
  );
}
