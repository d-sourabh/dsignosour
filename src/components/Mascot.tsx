import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Constants ─────────────────────────────────────────────────────────────

const R           = "#C8102E";
const SHOW_MS     = 6500;   // how long each message is visible
const PAUSE_MS    = 9000;   // gap between messages
const MOVE_MS     = 16000;  // how long to stay at each waypoint

// Waypoints as [xFraction, yFraction] of viewport: avoids nav (top 12%) and edges
const WPS: [number, number][] = [
  [0.04, 0.62],
  [0.82, 0.58],
  [0.04, 0.76],
  [0.82, 0.34],
  [0.42, 0.80],
  [0.04, 0.42],
  [0.82, 0.72],
  [0.42, 0.50],
];

const MESSAGES = [
  "Hey! I\u2019m Dsignosour \u2014 your guide here. Want to explore together? \ud83e\udd95",
  "There are 9 case studies on this portfolio. Click any tile on the homepage to dive in.",
  "Case Study 03 covers nine campaigns across six markets. One of the bigger reads.",
  "Scroll past the work tiles on the homepage \u2014 there\u2019s a Key Accolades section hiding below. \ud83d\udc47",
  "The FSS BLAZE case study (02) shows how positioning turns a complex platform into a story banks buy.",
  "The Thinking tab is where things get more personal.",
  "The Experiments tab has AI-built marketing tools. Worth a look.",
  "Each case study ends with a \u2192 to the next. You can read all nine in order.",
  "The ATM Growth Story (06) is about reviving a business that had stopped growing.",
  "Regional GTM (03) \u2014 nine campaigns, six markets, one discipline. Start there if you want the big picture.",
];

// ── SVG Icon ──────────────────────────────────────────────────────────────

function DsignosaurSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main body silhouette */}
      <path
        fill="white"
        d="M421.3,949.5l-11.4-19.6,3.7,18.7c.2,1-.4,4.1-1.4,3.8l-4.3-1.1-20.3-42.6c-7.9-19.5-16.6-38.1-28.3-55.9-1.5,1.9-3,3.6-4.1,4.2-5.5,2.8-28.8-39-34.1-51.7l-17.3-41.6c-1.6-.9-3.9-2.8-4.5-4.5-11.7-32.2-19.4-70.1-21.8-103.5l-3.6-.4c-.9,0-1.1-2.5-1.2-3.7l-5.1-81.9c-1.3-21.1-.9-40.9.1-62l3.5-74.9c1-20.7-4.1-40.5-8.6-60.1l-1.4,11.1c-.1,1-2,2.9-2.9,3.2-5.3,1.6-10.7-20.5-13-31.5-4.7-23.2-5.7-45.8-3.5-69.8l-6.6,8.7c-1.2,1.6-4.5,3.1-6.4,2.6s-3.9-3.8-4-6c-.6-50.1,30.4-100.2,66.1-133.4-2.4-3.7-2.2-7.8,0-11.7,13.1-22.3,30.9-41.4,52.8-55.9,12.4-8.2,25-16.9,39.4-21.5,37-11.8,74.3-19.8,112.4-27.5,56-11.2,109.9-10.5,161.9,14.4l68.9,33c18.7,8.9,35.5,19.5,51.5,32.4,42.2,34.2,62.3,82,68.4,135.3,4,34.5-1.1,67.9-14.8,99.7-14.2,33.1-16.8,23.8-10.6,59.8,4.7,27.3,5.8,53.4,4.6,81.2l-3.3,76.9-2.6,56c-1.3,26.5-7,51.3-14.1,76.7l-17.8,63.2c-5.4,19.1-13.3,36.5-23.5,53.3l-19,27.9-2.6.2c-.6,0-1.8-1.9-1.6-2.4l2.5-6.6c0-1.7-.4-1.7-1.1-.1l-18.1,32c-9.2,16.2-20.7,29.2-33.1,43l-49.7,55.2c-1,.7-3,1-3.9.6-4.3-2.3,5.3-11.9,7-21.8l-26.7,30.7-32.5,34.4c-6.8,7.2-14.4,13.2-23.1,17.9l-15.5,8.4-2.9,3.7c-.7.9-3.7-.3-4.7-.9l-60.2-35.7c-23.5-15.6-43.2-34.9-57.6-59.7ZM803.8,496.6l-4.8-57c-1.3-15.2-1.1-29.6-.2-44.9,1-17.7-1-27.4-15.5-38.7-15.7-12.3-33.2-21.1-53.2-26.5,7.6,15.1,11.7,29.8,10.8,46.3l-2.7,1.7c-1.7,1-8.1-12.4-16.4-20.8-14.4-14.6-32-23.3-51.9-28.3-25.2-6.3-49.9-10-76.3-7.1,9.9,20.1,28.4,34.8,49.3,43.2,13.6,5.5,24.2-.1,25,4.8,1.1,7.1-24.4,19.7-54.3,1.4-25.7-15.7-54.2-25.2-84.6-26.2l-51.6.3c7.1,4.2,14.1,7.1,22,9.4l23.8,7.1c9.3,2.8,19.8,12.4,14,17.1-11.8-3.4-23.8-6-36.3-6.8l-36-2.1c-15.6-.9-30.4-3.5-45.1-8.6-16.9-6.7-32.7-14.6-46.4-26.6l-32.1-28-27.2,50.4c-4.2,7.7-6.1,16.2-7,25.1-2.6,24.9-3.6,49.1-4.5,74.1l-2.9,78.6c-.9,24.1,1.3,46.5,7.8,69.6l15.1,53.1c6.2,21.9,17.1,41.2,30.3,59.5s31.1,42.3,54.7,46.2c-6-26.3-7.3-57.7,3.9-81s24.7-20.8,42.8-17.7c20,3.5,33.5-4.4,49.7-14.9l-1.6-3.9c-.3-.7,2.2-2.3,2.6-2.3,7.5,5.7,15.1,9.3,23.9,11.7,16.8,4.7,34.7.3,46.5-12.9,1.1,0,3.8,1.8,3.3,2.7l-2.1,3.5c9.4,11.4,23.5,16.6,38.3,16.9l35,.6c10.8-.6,19.2,5.3,22.7,15.6,6.9,20.8,7.6,42.3,4.9,65,20.2-12.3,38.3-25.2,54.7-41.3,28.1-20.2,48.8-47.3,61.1-79.9,5.9-28.3,9.7-55.9,10.1-84.7l.7-43.4Z"
      />
      {/* Inner body highlight */}
      <path
        fill="rgba(255,255,255,0.35)"
        d="M503.8,782.1c25,7.4,50.2,7.2,75,.2s7,.3,8.5,2c6.6,7.1-2,21.7-10.4,28.4l-17.2,13.7c-2.6,2.1-4,5.3-3,7.5s3.8,5,7,4.6c19.3-2,37.5-7.3,53.1-18.9,8.3-6.2,16.8-15.2,17.6-26.2,1.8-25.1-1.9-49.6-7.4-74.2l-33.9-6.2c-19.6-5.4-37.1-14.9-51-29.5-7.7,8.2-16.3,14.3-26.7,17.7l-31.6,10.4c-10.9,3-20.9,6.7-31.2,12-5.7,23.2-6.9,46.9-3.7,70.4,1.3,9.9,7.2,16.8,13.8,23.3,8.3,8.2,17.4,13.5,29,16.2,12.3,2.8,27.7,4.4,29.4-5.2s-19.8-10.9-29.5-34.9c-1.1-2.7-1.6-7.3.5-9.4s7.5-3,11.5-1.8Z"
      />
      {/* Eye patch left */}
      <path
        fill="rgba(140,0,20,0.9)"
        d="M631.3,443.8c-14,1.6-30.3,1.8-27.7-10.1s3.1-11.9,6.2-17.1,7.8-2,10.9-2.3l42.1-4.4,49.8-4.9c13.5-1.3,25.3,3,36.2,10.7l21.1,14.9c1.3.9,2,3.5,1.7,5.3-27.3,3.2-53.4,4.3-80.8,3.9-20-.3-39,1.7-59.4,4Z"
      />
      {/* Eye patch right */}
      <path
        fill="rgba(140,0,20,0.9)"
        d="M491.1,442.4c-5.7,2.5-11.2,2.4-16.9,1.8-18.6-1.9-36.5-4.5-55.4-4.5-30,0-59-.1-88.7-3.4-.8,0-2.6-.6-2.5-1.3l.6-3.2c6.8-5.7,13.6-10.4,21.3-14.6,10.6-9.2,23.3-12.8,37.4-12.4,34.3,1,64.6,8.8,93.9,9.2s9.1.8,10.7,6.1l4.1,12.8c1.1,3.4-.9,8-4.5,9.5Z"
      />
    </svg>
  );
}

// ── Mascot Component ───────────────────────────────────────────────────────

export default function Mascot() {
  const [pos, setPos]             = useState({ x: 40, y: 500 });
  const [wpIndex, setWpIndex]     = useState(0);
  const [msgIndex, setMsgIndex]   = useState(0);
  const [showMsg, setShowMsg]     = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hovered, setHovered]     = useState(false);
  const moveTimer = useRef<ReturnType<typeof setTimeout>>();
  const msgTimer  = useRef<ReturnType<typeof setTimeout>>();

  // Calculate pixel position from waypoint fraction
  const calcPos = useCallback((wp: [number, number]) => ({
    x: Math.round(wp[0] * window.innerWidth),
    y: Math.round(wp[1] * window.innerHeight),
  }), []);

  // Set initial position once dimensions are known
  useEffect(() => {
    setPos(calcPos(WPS[0]));
  }, [calcPos]);

  // Cycle through waypoints
  useEffect(() => {
    if (minimized) return;
    moveTimer.current = setTimeout(() => {
      const next = (wpIndex + 1) % WPS.length;
      setWpIndex(next);
      setPos(calcPos(WPS[next]));
    }, MOVE_MS);
    return () => clearTimeout(moveTimer.current);
  }, [wpIndex, minimized, calcPos]);

  // Cycle through messages with show/hide rhythm
  useEffect(() => {
    if (minimized) { setShowMsg(false); return; }

    // Show first message after a 3s page-load delay, then cycle
    const initial = setTimeout(() => {
      setShowMsg(true);
      msgTimer.current = setInterval(() => {
        setShowMsg(false);
        setTimeout(() => {
          setMsgIndex((i) => (i + 1) % MESSAGES.length);
          setShowMsg(true);
        }, PAUSE_MS);
      }, SHOW_MS + PAUSE_MS);
    }, 3000);

    return () => {
      clearTimeout(initial);
      clearInterval(msgTimer.current);
    };
  }, [minimized]);

  // Bubble on the left when mascot is on right half of screen
  const onRight = pos.x > window.innerWidth * 0.5;

  if (minimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-[999] cursor-pointer"
        onClick={() => setMinimized(false)}
        title="Bring Dsignosour back"
        aria-label="Reopen guide"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: R, boxShadow: `0 0 0 0 ${R}` }}
        >
          <span className="text-white text-lg leading-none">\ud83e\udd95</span>
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.div
      className="fixed z-[999] pointer-events-none"
      style={{ left: 0, top: 0 }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 22, damping: 18, mass: 1.2 }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showMsg && (
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none"
            style={{
              bottom: 84,
              ...(onRight
                ? { right: 0 }
                : { left: 0 }),
              width: 240,
            }}
          >
            <div
              className="rounded-2xl px-4 py-3 text-[13px] leading-relaxed text-white font-normal"
              style={{
                background: "rgba(10,10,12,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                fontFamily: "inherit",
              }}
            >
              {MESSAGES[msgIndex]}
            </div>
            {/* Triangle pointer */}
            <div
              className="absolute"
              style={{
                top: "100%",
                ...(onRight ? { right: 28 } : { left: 28 }),
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(10,10,12,0.92)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bobbing mascot badge */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: 72, height: 72 }}
      >
        {/* Badge */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center cursor-pointer select-none"
          style={{
            backgroundColor: R,
            boxShadow: "0 4px 24px rgba(200,16,46,0.50), 0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          <DsignosaurSVG size={50} />
        </div>

        {/* Close button: visible on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMinimized(true)}
              aria-label="Hide guide"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: "rgba(10,10,12,0.90)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Idle tail wag: subtle rotation */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
