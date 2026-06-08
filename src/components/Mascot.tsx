import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

// ── Constants ──────────────────────────────────────────────────────────────

const R = "#C8102E";
type Mood = "normal" | "excited" | "sleepy";

const WPS: [number, number][] = [
  [0.04, 0.88],  // bottom-left (home)
  [0.82, 0.58],
  [0.04, 0.76],
  [0.82, 0.34],
  [0.42, 0.80],
  [0.04, 0.42],
  [0.82, 0.72],
  [0.42, 0.50],
];

const MESSAGES: Record<Mood, string[]> = {
  normal: [
    "Hey. I am Dsignosour. Click me for tips, drag me anywhere.",
    "There are 9 case studies here. Click any tile on the homepage to dive in.",
    "Case Study 03 covers nine campaigns across six markets. One of the bigger reads.",
    "Scroll past the work tiles. There is a Key Accolades section below.",
    "The BLAZE case study (02) shows how positioning turns a platform into a story banks buy.",
    "Each case study ends with an arrow to the next. You can read all nine in sequence.",
    "The ATM Growth Story (06) is about reviving a business that had stopped growing.",
    "Regional GTM (03): nine campaigns, six markets, one discipline. Start there for the big picture.",
  ],
  excited: [
    "Have you seen the Regional GTM study? Nine campaigns, each a different strategy.",
    "Nine case studies, all different markets and approaches. Have you been through all of them?",
    "The BLAZE launch hit 54% email CTOR. Three times the benchmark.",
    "Simply Payments ran across Mumbai and Dubai. Real rooms, real bank CXOs.",
    "Try the Surprise Me button in the menu. It will take you somewhere.",
  ],
  sleepy: [
    "Still here. The work is worth the scroll.",
    "The case studies are long reads. That is intentional.",
    "Nine case studies. Take your time with them.",
    "The work tiles are right there when you are ready.",
  ],
};

const EASTER_MSG =
  "You found it. This portfolio took longer to build than most of the campaigns inside it. You can stop clicking now.";

const MOOD_BOB:  Record<Mood, number> = { normal: 2.8, excited: 1.1, sleepy: 5.5 };
const MOOD_MOVE: Record<Mood, number> = { normal: 16000, excited: 8000, sleepy: 30000 };
const MOOD_NEXT: Record<Mood, Mood>   = { normal: "excited", excited: "sleepy", sleepy: "normal" };
const MOOD_ICON: Record<Mood, string> = { normal: "calm", excited: "up", sleepy: "low" };

const CASE_ROUTES = [
  "/work/fss-transformation", "/work/blaze-platform", "/work/regional-gtm",
  "/work/gtm-narratives", "/work/simply-payments", "/work/fss-atm",
  "/work/customer-voice", "/work/content-engine",
];

// ── SVG ────────────────────────────────────────────────────────────────────

function DsignosaurSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="black" d="M421.3,949.5l-11.4-19.6,3.7,18.7c.2,1-.4,4.1-1.4,3.8l-4.3-1.1-20.3-42.6c-7.9-19.5-16.6-38.1-28.3-55.9-1.5,1.9-3,3.6-4.1,4.2-5.5,2.8-28.8-39-34.1-51.7l-17.3-41.6c-1.6-.9-3.9-2.8-4.5-4.5-11.7-32.2-19.4-70.1-21.8-103.5l-3.6-.4c-.9,0-1.1-2.5-1.2-3.7l-5.1-81.9c-1.3-21.1-.9-40.9.1-62l3.5-74.9c1-20.7-4.1-40.5-8.6-60.1l-1.4,11.1c-.1,1-2,2.9-2.9,3.2-5.3,1.6-10.7-20.5-13-31.5-4.7-23.2-5.7-45.8-3.5-69.8l-6.6,8.7c-1.2,1.6-4.5,3.1-6.4,2.6s-3.9-3.8-4-6c-.6-50.1,30.4-100.2,66.1-133.4-2.4-3.7-2.2-7.8,0-11.7,13.1-22.3,30.9-41.4,52.8-55.9,12.4-8.2,25-16.9,39.4-21.5,37-11.8,74.3-19.8,112.4-27.5,56-11.2,109.9-10.5,161.9,14.4l68.9,33c18.7,8.9,35.5,19.5,51.5,32.4,42.2,34.2,62.3,82,68.4,135.3,4,34.5-1.1,67.9-14.8,99.7-14.2,33.1-16.8,23.8-10.6,59.8,4.7,27.3,5.8,53.4,4.6,81.2l-3.3,76.9-2.6,56c-1.3,26.5-7,51.3-14.1,76.7l-17.8,63.2c-5.4,19.1-13.3,36.5-23.5,53.3l-19,27.9-2.6.2c-.6,0-1.8-1.9-1.6-2.4l2.5-6.6c0-1.7-.4-1.7-1.1-.1l-18.1,32c-9.2,16.2-20.7,29.2-33.1,43l-49.7,55.2c-1,.7-3,1-3.9.6-4.3-2.3,5.3-11.9,7-21.8l-26.7,30.7-32.5,34.4c-6.8,7.2-14.4,13.2-23.1,17.9l-15.5,8.4-2.9,3.7c-.7.9-3.7-.3-4.7-.9l-60.2-35.7c-23.5-15.6-43.2-34.9-57.6-59.7ZM803.8,496.6l-4.8-57c-1.3-15.2-1.1-29.6-.2-44.9,1-17.7-1-27.4-15.5-38.7-15.7-12.3-33.2-21.1-53.2-26.5,7.6,15.1,11.7,29.8,10.8,46.3l-2.7,1.7c-1.7,1-8.1-12.4-16.4-20.8-14.4-14.6-32-23.3-51.9-28.3-25.2-6.3-49.9-10-76.3-7.1,9.9,20.1,28.4,34.8,49.3,43.2,13.6,5.5,24.2-.1,25,4.8,1.1,7.1-24.4,19.7-54.3,1.4-25.7-15.7-54.2-25.2-84.6-26.2l-51.6.3c7.1,4.2,14.1,7.1,22,9.4l23.8,7.1c9.3,2.8,19.8,12.4,14,17.1-11.8-3.4-23.8-6-36.3-6.8l-36-2.1c-15.6-.9-30.4-3.5-45.1-8.6-16.9-6.7-32.7-14.6-46.4-26.6l-32.1-28-27.2,50.4c-4.2,7.7-6.1,16.2-7,25.1-2.6,24.9-3.6,49.1-4.5,74.1l-2.9,78.6c-.9,24.1,1.3,46.5,7.8,69.6l15.1,53.1c6.2,21.9,17.1,41.2,30.3,59.5s31.1,42.3,54.7,46.2c-6-26.3-7.3-57.7,3.9-81s24.7-20.8,42.8-17.7c20,3.5,33.5-4.4,49.7-14.9l-1.6-3.9c-.3-.7,2.2-2.3,2.6-2.3,7.5,5.7,15.1,9.3,23.9,11.7,16.8,4.7,34.7.3,46.5-12.9,1.1,0,3.8,1.8,3.3,2.7l-2.1,3.5c9.4,11.4,23.5,16.6,38.3,16.9l35,.6c10.8-.6,19.2,5.3,22.7,15.6,6.9,20.8,7.6,42.3,4.9,65,20.2-12.3,38.3-25.2,54.7-41.3,28.1-20.2,48.8-47.3,61.1-79.9,5.9-28.3,9.7-55.9,10.1-84.7l.7-43.4Z" />
      <path fill="white" d="M803.8,496.6l-.7,43.4c-.4,28.8-4.2,56.5-10.1,84.7-12.2,32.6-32.9,59.7-61.1,79.9-16.3,16.1-34.4,29-54.7,41.3,2.7-22.7,1.9-44.3-4.9-65-3.4-10.3-11.9-16.3-22.7-15.6l-35-.6c-14.9-.3-28.9-5.5-38.3-16.9l2.1-3.5c.5-.8-2.1-2.6-3.3-2.7-11.8,13.2-29.7,17.7-46.5,12.9-8.9-2.4-16.5-5.9-23.9-11.7-.5,0-2.9,1.7-2.6,2.3l1.6,3.9c-16.1,10.4-29.7,18.3-49.7,14.9-18-3.1-34.8,1.1-42.8,17.7s-9.9,54.7-3.9,81c-23.6-3.9-41.2-27.6-54.7-46.2s-24.1-37.6-30.3-59.5l-15.1-53.1c-6.5-23-8.7-45.5-7.8-69.6l2.9-78.6c.9-25,2-49.2,4.5-74.1s2.9-17.3,7-25.1l27.2-50.4,32.1,28c13.7,12,29.5,19.8,46.4,26.6,14.7,5.2,29.5,7.7,45.1,8.6l36,2.1c12.5.7,24.6,3.4,36.3,6.8,5.9-4.7-4.7-14.4-14-17.1l-23.8-7.1c-7.8-2.3-14.8-5.2-22-9.4l51.6-.3c30.4,1,58.9,10.5,84.6,26.2,29.9,18.3,55.4,5.7,54.3-1.4-.8-4.9-11.4.7-25-4.8-21-8.4-39.4-23.1-49.3-43.2,26.4-2.8,51.2.8,76.3,7.1,19.8,4.9,37.5,13.7,51.9,28.3,8.3,8.4,14.8,21.9,16.4,20.8l2.7-1.7c.9-16.6-3.3-31.2-10.8-46.3,20.1,5.4,37.6,14.2,53.2,26.5,14.4,11.3,16.5,21.1,15.5,38.7-.9,15.2-1.1,29.7.2,44.9l4.8,57ZM491.1,442.4c3.6-1.5,5.6-6.1,4.5-9.5l-4.1-12.8c-1.7-5.3-5.9-6-10.7-6.1-29.2-.4-59.6-8.2-93.9-9.2-14.1-.4-26.8,3.2-37.4,12.4-7.7,4.2-14.6,9-21.3,14.6l-.6,3.2c-.1.6,1.6,1.2,2.5,1.3,29.8,3.2,58.7,3.4,88.7,3.4s36.8,2.5,55.4,4.5,11.2.7,16.9-1.8ZM631.3,443.8c20.4-2.3,39.4-4.3,59.4-4,27.4.4,53.6-.6,80.8-3.9.3-1.8-.4-4.4-1.7-5.3l-21.1-14.9c-10.9-7.7-22.6-12-36.2-10.7l-49.8,4.9-42.1,4.4c-3.1.3-9.1-.8-10.9,2.3-3.1,5.2-4.9,11.2-6.2,17.1-2.6,11.9,13.7,11.7,27.7,10.1Z" />
      <path fill="white" d="M503.8,782.1c25,7.4,50.2,7.2,75,.2s7,.3,8.5,2c6.6,7.1-2,21.7-10.4,28.4l-17.2,13.7c-2.6,2.1-4,5.3-3,7.5s3.8,5,7,4.6c19.3-2,37.5-7.3,53.1-18.9,8.3-6.2,16.8-15.2,17.6-26.2,1.8-25.1-1.9-49.6-7.4-74.2l-33.9-6.2c-19.6-5.4-37.1-14.9-51-29.5-7.7,8.2-16.3,14.3-26.7,17.7l-31.6,10.4c-10.9,3-20.9,6.7-31.2,12-5.7,23.2-6.9,46.9-3.7,70.4,1.3,9.9,7.2,16.8,13.8,23.3,8.3,8.2,17.4,13.5,29,16.2,12.3,2.8,27.7,4.4,29.4-5.2s-19.8-10.9-29.5-34.9c-1.1-2.7-1.6-7.3.5-9.4s7.5-3,11.5-1.8Z" />
      <path fill="black" d="M631.3,443.8c-14,1.6-30.3,1.8-27.7-10.1s3.1-11.9,6.2-17.1,7.8-2,10.9-2.3l42.1-4.4,49.8-4.9c13.5-1.3,25.3,3,36.2,10.7l21.1,14.9c1.3.9,2,3.5,1.7,5.3-27.3,3.2-53.4,4.3-80.8,3.9-20-.3-39,1.7-59.4,4Z" />
      <path fill="black" d="M491.1,442.4c-5.7,2.5-11.2,2.4-16.9,1.8-18.6-1.9-36.5-4.5-55.4-4.5-30,0-59-.1-88.7-3.4-.8,0-2.6-.6-2.5-1.3l.6-3.2c6.8-5.7,13.6-10.4,21.3-14.6,10.6-9.2,23.3-12.8,37.4-12.4,34.3,1,64.6,8.8,93.9,9.2s9.1.8,10.7,6.1l4.1,12.8c1.1,3.4-.9,8-4.5,9.5Z" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Mascot() {
  const navigate = useNavigate();
  const [pos, setPos]           = useState({ x: 40, y: 500 });
  const [dragging, setDragging] = useState(false);
  const [wpIndex, setWpIndex]   = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showMsg, setShowMsg]   = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [navOpen, setNavOpen]   = useState(false);
  const [mood, setMood]         = useState<Mood>("normal");
  const [moodFlash, setMoodFlash] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const isDragRef    = useRef(false);
  const dragStartRef = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const clickTimesRef = useRef<number[]>([]);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const msgIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const msgShowRef     = useRef<ReturnType<typeof setTimeout>>();

  const msgs     = MESSAGES[mood];
  const bobDur   = MOOD_BOB[mood];
  const moveDur  = MOOD_MOVE[mood];

  const calcPos = useCallback((wp: [number, number]) => ({
    x: Math.round(wp[0] * window.innerWidth),
    y: Math.round(wp[1] * window.innerHeight),
  }), []);

  // Init: start at bottom-left corner
  useEffect(() => {
    setPos({
      x: 24,
      y: Math.round(window.innerHeight - 100),
    });
  }, []);

  // Waypoint cycle
  useEffect(() => {
    if (minimized || dragging) return;
    moveTimerRef.current = setTimeout(() => {
      const next = (wpIndex + 1) % WPS.length;
      setWpIndex(next);
      setPos(calcPos(WPS[next]));
    }, moveDur);
    return () => clearTimeout(moveTimerRef.current);
  }, [wpIndex, minimized, dragging, calcPos, moveDur]);

  // Message cycle
  const startMsgCycle = useCallback(() => {
    clearInterval(msgIntervalRef.current);
    clearTimeout(msgShowRef.current);
    msgIntervalRef.current = setInterval(() => {
      setShowMsg(false);
      msgShowRef.current = setTimeout(() => {
        setMsgIndex(i => (i + 1) % msgs.length);
        setShowMsg(true);
      }, 9000);
    }, 15500);
  }, [msgs.length]);

  useEffect(() => {
    if (minimized) { setShowMsg(false); return; }
    const t = setTimeout(() => { setShowMsg(true); startMsgCycle(); }, 3000);
    return () => { clearTimeout(t); clearInterval(msgIntervalRef.current); clearTimeout(msgShowRef.current); };
  }, [minimized, startMsgCycle]);

  // Easter egg
  const triggerEasterEgg = useCallback(() => {
    setSpinning(true);
    setShowMsg(false);
    setNavOpen(false);
    setTimeout(() => setSpinning(false), 1000);
    setTimeout(() => { setEasterEgg(true); setShowMsg(true); }, 900);
    setTimeout(() => setEasterEgg(false), 9000);
  }, []);

  // Click handler
  const handleClick = useCallback(() => {
    if (isDragRef.current) return;
    const now = Date.now();
    clickTimesRef.current = [...clickTimesRef.current.filter(t => now - t < 3000), now];
    if (clickTimesRef.current.length >= 5) {
      clickTimesRef.current = [];
      triggerEasterEgg();
      return;
    }
    if (navOpen) { setNavOpen(false); return; }
    // Next message immediately
    clearInterval(msgIntervalRef.current);
    clearTimeout(msgShowRef.current);
    setShowMsg(false);
    msgShowRef.current = setTimeout(() => {
      setMsgIndex(i => (i + 1) % msgs.length);
      setShowMsg(true);
      startMsgCycle();
    }, 150);
  }, [navOpen, msgs.length, triggerEasterEgg, startMsgCycle]);

  // Drag handler (manual, works alongside Framer Motion spring)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    isDragRef.current = false;
    dragStartRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.mx;
      const dy = ev.clientY - dragStartRef.current.my;
      if (!isDragRef.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isDragRef.current = true;
        setDragging(true);
        setNavOpen(false);
      }
      if (isDragRef.current) {
        setPos({
          x: Math.max(4, Math.min(window.innerWidth - 80, dragStartRef.current.px + dx)),
          y: Math.max(80, Math.min(window.innerHeight - 84, dragStartRef.current.py + dy)),
        });
      }
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      setDragging(false);
      setTimeout(() => { isDragRef.current = false; }, 10);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [pos]);

  // Mood cycle
  const cycleMood = () => {
    const next = MOOD_NEXT[mood];
    setMood(next);
    setMsgIndex(0);
    setMoodFlash(true);
    setTimeout(() => setMoodFlash(false), 2200);
  };

  // Surprise me
  const surpriseMe = () => {
    setNavOpen(false);
    navigate(CASE_ROUTES[Math.floor(Math.random() * CASE_ROUTES.length)]);
  };

  const onRight = pos.x > window.innerWidth * 0.5;
  const currentMsg = easterEgg ? EASTER_MSG : msgs[msgIndex % msgs.length];

  // ── Minimized dot ─────────────────────────────────────────────────────────
  if (minimized) {
    return (
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-[999] cursor-pointer"
        onClick={() => setMinimized(false)}
        title="Bring Dsignosour back"
        aria-label="Reopen guide"
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: R, boxShadow: `0 0 16px 4px rgba(200,16,46,0.4)` }}
        >
          <DsignosaurSVG size={28} />
        </motion.div>
      </motion.button>
    );
  }

  // ── Full mascot ───────────────────────────────────────────────────────────
  return (
    <motion.div
      className="fixed z-[999] pointer-events-none"
      style={{ left: 0, top: 0 }}
      animate={{ x: pos.x, y: pos.y }}
      transition={dragging
        ? { duration: 0 }
        : { type: "spring", stiffness: 22, damping: 18, mass: 1.2 }
      }
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showMsg && (
          <motion.div
            key={`${msgIndex}-${easterEgg}`}
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none"
            style={{ bottom: 88, width: 250, ...(onRight ? { right: 0 } : { left: 0 }) }}
          >
            <div
              className="rounded-2xl px-4 py-3 text-[13px] leading-relaxed text-white"
              style={{
                background: "rgba(10,10,12,0.93)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
                fontFamily: "inherit",
              }}
            >
              {currentMsg}
            </div>
            <div
              className="absolute"
              style={{
                top: "100%", width: 0, height: 0,
                ...(onRight ? { right: 24 } : { left: 24 }),
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(10,10,12,0.93)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav popup */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-auto"
            style={{ bottom: 88, width: 200, ...(onRight ? { right: 0 } : { left: 0 }) }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,12,0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              }}
            >
              <div className="px-4 pt-3 pb-1">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/35">Navigate</span>
              </div>
              {[{ label: "Home", to: "/" }].map(({ label, to }) => (
                <Link
                  key={to} to={to}
                  onClick={() => setNavOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-white/80 hover:text-white hover:bg-white/[0.07] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="mx-4 my-1 h-px bg-white/[0.07]" />
              <button
                onClick={surpriseMe}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-left transition-colors hover:bg-white/[0.07]"
                style={{ color: R }}
              >
                Surprise me
              </button>
              <div className="mx-4 my-1 h-px bg-white/[0.07]" />
              <div className="px-4 pt-1 pb-1">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/35">Mood</span>
              </div>
              <button
                onClick={cycleMood}
                className="flex items-center justify-between w-full px-4 py-2.5 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.07] transition-colors pb-3"
              >
                <span>Current: <span className="text-white">{MOOD_ICON[mood]} {mood}</span></span>
                <span className="text-white/30 text-[11px]">cycle →</span>
              </button>
            </div>
            {/* Triangle */}
            <div
              className="absolute"
              style={{
                top: "100%", width: 0, height: 0,
                ...(onRight ? { right: 24 } : { left: 24 }),
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(10,10,12,0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood flash toast */}
      <AnimatePresence>
        {moodFlash && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
            className="absolute pointer-events-none"
            style={{ bottom: 88, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
          >
            <div
              className="rounded-full px-3 py-1.5 text-[12px] text-white font-mono"
              style={{ background: "rgba(10,10,12,0.90)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {MOOD_ICON[mood]} mood: {mood}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge */}
      <motion.div
        animate={{ y: [0, -9, 0], rotate: spinning ? [0, 180, 360] : 0 }}
        transition={
          spinning
            ? { rotate: { duration: 0.8, ease: "easeInOut" }, y: { duration: bobDur, repeat: Infinity, ease: "easeInOut" } }
            : { y: { duration: bobDur, repeat: Infinity, ease: "easeInOut" } }
        }
        className="relative pointer-events-auto select-none"
        style={{ width: 72, height: 72, cursor: dragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Red circle */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: R,
            boxShadow: "0 4px 24px rgba(200,16,46,0.50), 0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          <DsignosaurSVG size={50} />
        </div>

        {/* Explore button (always visible, bottom of badge) */}
        <button
          onClick={(e) => { e.stopPropagation(); setNavOpen(v => !v); setShowMsg(false); }}
          aria-label="Open navigation menu"
          title="Explore"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9px] font-mono tracking-[0.12em] uppercase transition-all duration-200"
          style={{
            background: navOpen ? "rgba(200,16,46,0.9)" : "rgba(10,10,12,0.82)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: navOpen ? "white" : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {navOpen ? "close" : "explore"}
        </button>

        {/* Close X (hover only) */}
        <AnimatePresence>
          {hovered && !navOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.15 }}
              onClick={(e) => { e.stopPropagation(); setMinimized(true); }}
              aria-label="Hide guide"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "rgba(10,10,12,0.90)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Drag hint ring (on hover, not dragging) */}
        <AnimatePresence>
          {hovered && !dragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: "2px dashed rgba(255,255,255,0.25)", borderRadius: "50%" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
