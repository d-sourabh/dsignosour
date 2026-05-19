import { useRef, useCallback } from "react";
import type { HandResult, FaceResult } from "./useMediaPipe";

type Pt = { x: number; y: number; z: number };

export interface GestureState {
  name: string;
  active: boolean;
  data?: Record<string, unknown>;
}

interface PrevFrame {
  handLandmarks: Pt[][];
  timestamp: number;
}

// Helper: distance between two 2D points (normalized coords)
function dist2(a: Pt, b: Pt) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Helper: check if finger is extended by comparing tip-to-palm vs pip-to-palm
function isFingerExtended(hand: Pt[], tip: number, pip: number, mcp: number): boolean {
  const palmBase = hand[0];
  const tipDist = dist2(hand[tip], palmBase);
  const pipDist = dist2(hand[pip], palmBase);
  return tipDist > pipDist * 1.05;
}

function isThumbExtended(hand: Pt[]): boolean {
  return dist2(hand[4], hand[2]) > dist2(hand[3], hand[2]) * 1.2;
}

// Eye aspect ratio from face landmarks
function eyeAspectRatio(face: Pt[], top: number, bottom: number, left: number, right: number) {
  const vertical = dist2(face[top], face[bottom]);
  const horizontal = dist2(face[left], face[right]);
  return vertical / (horizontal + 0.0001);
}

export function useGestures(canvasW: number, canvasH: number) {
  const prevFrameRef = useRef<PrevFrame>({ handLandmarks: [], timestamp: 0 });
  const prevHandPosRef = useRef<{ x: number; y: number }[]>([]);
  const fistTimerRef = useRef<number>(0);
  const fistStartRef = useRef<number>(0);
  const clapStateRef = useRef<{ apart: boolean; apartTime: number }>({ apart: false, apartTime: 0 });
  const baselineEyebrowRef = useRef<number | null>(null);
  const baselineFrameCount = useRef(0);
  const swipeHistoryRef = useRef<{ x: number; t: number }[]>([]);
  const paintTrailRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const lastPaintRef = useRef<number>(0);

  const toCanvas = useCallback(
    (p: Pt) => ({
      x: (1 - p.x) * canvasW, // mirrored
      y: p.y * canvasH,
    }),
    [canvasW, canvasH]
  );

  const detect = useCallback(
    (hands: HandResult, face: FaceResult): GestureState[] => {
      const now = performance.now();
      const gestures: GestureState[] = [];
      const hl = hands.landmarks;
      const fl = face.faceLandmarks;
      const hasFace = fl.length > 0;
      const faceL = hasFace ? fl[0] : null;

      // --- HAND GESTURES ---
      for (let hi = 0; hi < hl.length; hi++) {
        const hand = hl[hi];
        if (!hand || hand.length < 21) continue;

        const indexExtended = isFingerExtended(hand, 8, 6, 5);
        const middleExtended = isFingerExtended(hand, 12, 10, 9);
        const ringExtended = isFingerExtended(hand, 16, 14, 13);
        const pinkyExtended = isFingerExtended(hand, 20, 18, 17);
        const thumbExt = isThumbExtended(hand);

        const indexTip = toCanvas(hand[8]);
        const thumbTip = toCanvas(hand[4]);
        const wrist = toCanvas(hand[0]);

        // 1. Peace sign: index + middle extended, ring + pinky curled
        if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
          gestures.push({ name: "peace", active: true, data: { x: indexTip.x, y: indexTip.y } });
        }

        // 2. Thumbs up: thumb extended, all fingers curled
        if (thumbExt && !indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
          gestures.push({
            name: "thumbsUp",
            active: true,
            data: { x: thumbTip.x, y: thumbTip.y },
          });
        }

        // 3. Open palm: all 5 extended
        if (thumbExt && indexExtended && middleExtended && ringExtended && pinkyExtended) {
          const palmCenter = toCanvas(hand[9]);
          gestures.push({
            name: "openPalm",
            active: true,
            data: { x: palmCenter.x, y: palmCenter.y },
          });
        }

        // 4. Finger painting: index extended, middle/ring/pinky curled, thumb tucked
        if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended && !thumbExt) {
          paintTrailRef.current.push({ x: indexTip.x, y: indexTip.y, t: now });
          lastPaintRef.current = now;
          gestures.push({
            name: "painting",
            active: true,
            data: { trail: [...paintTrailRef.current] },
          });
        }

        // Auto-clear paint after 8s inactivity
        if (now - lastPaintRef.current > 8000 && paintTrailRef.current.length > 0) {
          paintTrailRef.current = [];
        }
        // Fade old segments (keep last 3s)
        paintTrailRef.current = paintTrailRef.current.filter((p) => now - p.t < 3000);

        // 5. Shaka: thumb + pinky extended, others curled
        if (thumbExt && pinkyExtended && !indexExtended && !middleExtended && !ringExtended) {
          gestures.push({ name: "shaka", active: true, data: { x: wrist.x, y: wrist.y } });
        }

        // 6. Fist: all curled tightly
        if (!thumbExt && !indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
          if (fistStartRef.current === 0) {
            fistStartRef.current = now;
          }
          if (now - fistStartRef.current > 1500) {
            gestures.push({ name: "fist", active: true });
          }
        } else {
          fistStartRef.current = 0;
        }

        // 7. Pointing at camera: index extended forward, z closer than wrist
        if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
          if (hand[8].z < hand[0].z - 0.03) {
            gestures.push({ name: "pointing", active: true, data: { x: indexTip.x, y: indexTip.y } });
          }
        }

        // 8. Slap: fast hand motion into face bbox
        if (hasFace && faceL) {
          const prevHands = prevFrameRef.current.handLandmarks;
          if (prevHands[hi] && prevHands[hi].length >= 21) {
            const prevTip = toCanvas(prevHands[hi][8]);
            const vel = Math.sqrt((indexTip.x - prevTip.x) ** 2 + (indexTip.y - prevTip.y) ** 2);
            const faceCenter = toCanvas(faceL[1]); // nose
            const faceDist = Math.sqrt((indexTip.x - faceCenter.x) ** 2 + (indexTip.y - faceCenter.y) ** 2);
            if (vel > 40 && faceDist < 120) {
              gestures.push({ name: "slap", active: true });
            }
          }
        }

        // 9. Hand on chin
        if (hasFace && faceL) {
          const chin = toCanvas(faceL[152]);
          const palmCenter = toCanvas(hand[9]);
          if (Math.sqrt((palmCenter.x - chin.x) ** 2 + (palmCenter.y - chin.y) ** 2) < 60) {
            gestures.push({ name: "handOnChin", active: true });
          }
        }

        // 10. Index finger to head → ray of light
        if (hasFace && faceL && indexExtended) {
          const forehead = toCanvas(faceL[10]);
          if (Math.sqrt((indexTip.x - forehead.x) ** 2 + (indexTip.y - forehead.y) ** 2) < 80) {
            gestures.push({ name: "rayOfLight", active: true, data: { x: forehead.x, y: forehead.y } });
          }
        }

        // Swipe detection
        swipeHistoryRef.current.push({ x: wrist.x, t: now });
        swipeHistoryRef.current = swipeHistoryRef.current.filter((s) => now - s.t < 300);
        if (swipeHistoryRef.current.length > 5) {
          const first = swipeHistoryRef.current[0];
          const last = swipeHistoryRef.current[swipeHistoryRef.current.length - 1];
          const dx = last.x - first.x;
          const dt = last.t - first.t;
          if (dt > 0 && Math.abs(dx / dt) > 0.5) {
            gestures.push({ name: "swipe", active: true, data: { direction: dx > 0 ? "right" : "left" } });
            swipeHistoryRef.current = [];
          }
        }
      }

      // --- TWO-HAND GESTURES ---
      if (hl.length >= 2 && hl[0].length >= 21 && hl[1].length >= 21) {
        const tip0 = toCanvas(hl[0][8]);
        const tip1 = toCanvas(hl[1][8]);
        const tipDist = Math.sqrt((tip0.x - tip1.x) ** 2 + (tip0.y - tip1.y) ** 2);

        // Pinch zoom (right hand thumb-index distance)
        const rThumb = toCanvas(hl[0][4]);
        const rIndex = toCanvas(hl[0][8]);
        const pinchDist = Math.sqrt((rThumb.x - rIndex.x) ** 2 + (rThumb.y - rIndex.y) ** 2);
        const scale = Math.min(1.8, Math.max(1.0, 1.0 + (pinchDist - 30) / 300));
        gestures.push({ name: "pinchZoom", active: scale > 1.02, data: { scale } });

        // Clap
        if (tipDist > 250) {
          clapStateRef.current = { apart: true, apartTime: now };
        }
        if (clapStateRef.current.apart && tipDist < 100 && now - clapStateRef.current.apartTime < 400) {
          gestures.push({ name: "clap", active: true, data: { x: (tip0.x + tip1.x) / 2, y: (tip0.y + tip1.y) / 2 } });
          clapStateRef.current = { apart: false, apartTime: 0 };
        }

        // Both hands raised above head
        const wrist0 = hl[0][0];
        const wrist1 = hl[1][0];
        if (wrist0.y < 0.3 && wrist1.y < 0.3) {
          gestures.push({ name: "handsRaised", active: true });
        }

        // Heart shape: thumb tips + index tips close, hands above mid
        const thumbTip0 = toCanvas(hl[0][4]);
        const thumbTip1 = toCanvas(hl[1][4]);
        const thumbDist = Math.sqrt((thumbTip0.x - thumbTip1.x) ** 2 + (thumbTip0.y - thumbTip1.y) ** 2);
        const indexDist = tipDist;
        if (thumbDist < 60 && indexDist < 60 && wrist0.y < 0.5 && wrist1.y < 0.5) {
          const cx = (thumbTip0.x + thumbTip1.x) / 2;
          const cy = (thumbTip0.y + thumbTip1.y) / 2;
          gestures.push({ name: "heart", active: true, data: { x: cx, y: cy } });
        }

        // Index fingers touching tip-to-tip → spark
        if (tipDist < 30) {
          gestures.push({ name: "spark", active: true, data: { x: (tip0.x + tip1.x) / 2, y: (tip0.y + tip1.y) / 2 } });
        }
      }

      // --- FACE GESTURES ---
      if (hasFace && faceL) {
        // Head tilt
        const leftEar = toCanvas(faceL[234]);
        const nose = toCanvas(faceL[1]);
        const rightEar = toCanvas(faceL[454]);
        const dx = rightEar.x - leftEar.x;
        const dy = rightEar.y - leftEar.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle > 15) {
          gestures.push({ name: "tiltRight", active: true, data: { x: nose.x, y: nose.y } });
        } else if (angle < -15) {
          gestures.push({ name: "tiltLeft", active: true, data: { x: nose.x, y: nose.y } });
        }

        // Wink: one eye closed, one open
        const leftEAR = eyeAspectRatio(faceL, 159, 145, 33, 133);
        const rightEAR = eyeAspectRatio(faceL, 386, 374, 362, 263);
        const earDiff = Math.abs(leftEAR - rightEAR);
        if (earDiff > 0.015) {
          const winkingSide = leftEAR < rightEAR ? "left" : "right";
          const eyeCorner =
            winkingSide === "left" ? toCanvas(faceL[33]) : toCanvas(faceL[362]);
          gestures.push({
            name: "wink",
            active: true,
            data: { x: eyeCorner.x, y: eyeCorner.y, side: winkingSide },
          });
        }

        // Mouth open wide
        const upperLip = faceL[13];
        const lowerLip = faceL[14];
        const lipDist = dist2(upperLip, lowerLip);
        if (lipDist > 0.04) {
          gestures.push({ name: "mouthOpen", active: true, data: { lipDist } });
        }

        // Eyebrow raise
        const foreheadY = faceL[10].y;
        const eyeY = (faceL[159].y + faceL[386].y) / 2;
        const browDist = eyeY - foreheadY;
        if (baselineFrameCount.current < 60) {
          baselineFrameCount.current++;
          if (baselineEyebrowRef.current === null) {
            baselineEyebrowRef.current = browDist;
          } else {
            baselineEyebrowRef.current =
              baselineEyebrowRef.current * 0.95 + browDist * 0.05;
          }
        } else if (baselineEyebrowRef.current !== null) {
          if (browDist > baselineEyebrowRef.current * 1.25) {
            gestures.push({ name: "eyebrowRaise", active: true });
          }
        }
      }

      // Store prev frame
      prevFrameRef.current = {
        handLandmarks: hl.map((h) => [...h]),
        timestamp: now,
      };

      return gestures;
    },
    [canvasW, canvasH, toCanvas]
  );

  return { detect, paintTrailRef };
}
