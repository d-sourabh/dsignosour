import { useRef, useCallback } from "react";
import type { HandResult, FaceResult } from "./useMediaPipe";

type Pt = { x: number; y: number; z: number };

export interface GestureState {
  name: string;
  active: boolean;
  data?: Record<string, number>;
}

export interface DetectionResult {
  gestures: GestureState[];
  indexFingertip: { x: number; y: number } | null;
  palmCenter: { x: number; y: number } | null;
  pinchPoint: { x: number; y: number } | null;
}

function dist(a: Pt, b: Pt): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function isFingerExtended(hand: Pt[], tip: number, pip: number): boolean {
  // Finger is extended if tip is further from wrist than the PIP joint
  const palmBase = hand[0];
  return dist(hand[tip], palmBase) > dist(hand[pip], palmBase) * 1.1;
}

function isThumbExtended(hand: Pt[]): boolean {
  return dist(hand[4], hand[2]) > dist(hand[3], hand[2]) * 1.15;
}

function isThumbUp(hand: Pt[]): boolean {
  // Thumb pointing upward: tip is higher (smaller y) than IP joint, which is higher than MCP
  return hand[4].y < hand[3].y - 0.02 && hand[3].y < hand[2].y;
}

function isThumbDown(hand: Pt[]): boolean {
  // Thumb pointing downward: tip is lower than IP joint, which is lower than MCP
  return hand[4].y > hand[3].y + 0.02 && hand[3].y > hand[2].y;
}

export function useGestures(canvasW: number, canvasH: number) {
  const fistStartRef = useRef<number>(0);

  const toCanvas = useCallback(
    (p: Pt) => ({
      x: (1 - p.x) * canvasW, // mirrored horizontally
      y: p.y * canvasH,
    }),
    [canvasW, canvasH]
  );

  const detect = useCallback(
    (hands: HandResult, _face: FaceResult): DetectionResult => {
      const now = performance.now();
      const gestures: GestureState[] = [];
      const hl = hands.landmarks;

      let indexFingertip: { x: number; y: number } | null = null;
      let palmCenter: { x: number; y: number } | null = null;
      let pinchPoint: { x: number; y: number } | null = null;

      if (hl.length === 0 || !hl[0] || hl[0].length < 21) {
        fistStartRef.current = 0;
        return { gestures, indexFingertip, palmCenter, pinchPoint };
      }

      // Use first detected hand for all single-hand gestures
      const hand = hl[0];

      const indexExt = isFingerExtended(hand, 8, 6);
      const middleExt = isFingerExtended(hand, 12, 10);
      const ringExt = isFingerExtended(hand, 16, 14);
      const pinkyExt = isFingerExtended(hand, 20, 18);
      const thumbExt = isThumbExtended(hand);

      const indexTip = toCanvas(hand[8]);
      const thumbTip = toCanvas(hand[4]);
      const palm = toCanvas(hand[9]); // middle MCP, roughly palm center

      indexFingertip = { x: indexTip.x, y: indexTip.y };
      palmCenter = { x: palm.x, y: palm.y };

      // Distance between thumb tip and index tip (in normalized coords for stability)
      const thumbIndexDist = dist(hand[4], hand[8]);

      // 01 - FIST: all fingers curled (held for 200ms to avoid false trigger)
      if (!indexExt && !middleExt && !ringExt && !pinkyExt && !thumbExt) {
        if (fistStartRef.current === 0) fistStartRef.current = now;
        if (now - fistStartRef.current > 200) {
          gestures.push({ name: "fist", active: true });
        }
      } else {
        fistStartRef.current = 0;
      }

      // 02 - PEACE: index + middle extended, ring + pinky curled
      if (indexExt && middleExt && !ringExt && !pinkyExt) {
        gestures.push({
          name: "peace",
          active: true,
          data: { x: indexTip.x, y: indexTip.y },
        });
      }

      // 03 - POINTING: only index extended (and thumb may or may not be in)
      // We require index ext, others curled, and we don't require thumb state strictly
      if (indexExt && !middleExt && !ringExt && !pinkyExt && thumbIndexDist > 0.06) {
        gestures.push({
          name: "pointing",
          active: true,
          data: { x: indexTip.x, y: indexTip.y },
        });
      }

      // 04 - OPEN PALM: all five extended
      if (thumbExt && indexExt && middleExt && ringExt && pinkyExt) {
        gestures.push({
          name: "openPalm",
          active: true,
          data: { x: palm.x, y: palm.y },
        });
      }

      // 05 - THUMBS UP: thumb pointing up, fingers curled
      if (isThumbUp(hand) && !indexExt && !middleExt && !ringExt && !pinkyExt) {
        gestures.push({
          name: "thumbsUp",
          active: true,
          data: { x: thumbTip.x, y: thumbTip.y },
        });
      }

      // 06 - ROCK ON: index + pinky extended, middle + ring curled
      if (indexExt && !middleExt && !ringExt && pinkyExt) {
        gestures.push({
          name: "rockOn",
          active: true,
          data: { x: palm.x, y: palm.y },
        });
      }

      // 07 - OK SIGN: thumb + index very close (small circle), middle + ring + pinky extended
      if (thumbIndexDist < 0.05 && middleExt && ringExt && pinkyExt) {
        const cx = ((1 - (hand[4].x + hand[8].x) / 2)) * canvasW;
        const cy = ((hand[4].y + hand[8].y) / 2) * canvasH;
        gestures.push({
          name: "okSign",
          active: true,
          data: { x: cx, y: cy },
        });
      }

      // 08 - THUMB DOWN: thumb pointing down, fingers curled
      if (isThumbDown(hand) && !indexExt && !middleExt && !ringExt && !pinkyExt) {
        gestures.push({
          name: "thumbDown",
          active: true,
          data: { x: thumbTip.x, y: thumbTip.y },
        });
      }

      // 09 - PINCH: thumb + index very close, others curled
      if (thumbIndexDist < 0.05 && !middleExt && !ringExt && !pinkyExt) {
        const cx = ((1 - (hand[4].x + hand[8].x) / 2)) * canvasW;
        const cy = ((hand[4].y + hand[8].y) / 2) * canvasH;
        pinchPoint = { x: cx, y: cy };
        gestures.push({
          name: "pinch",
          active: true,
          data: { x: cx, y: cy },
        });
      }

      // 10 - THREE FINGERS: index, middle, ring extended; pinky curled
      if (indexExt && middleExt && ringExt && !pinkyExt) {
        gestures.push({
          name: "threeFingers",
          active: true,
          data: { x: palm.x, y: palm.y },
        });
      }

      return { gestures, indexFingertip, palmCenter, pinchPoint };
    },
    [canvasW, canvasH, toCanvas]
  );

  return { detect };
}
