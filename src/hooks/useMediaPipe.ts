import { useEffect, useRef, useCallback, useState } from "react";
import {
  HandLandmarker,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export interface HandResult {
  landmarks: { x: number; y: number; z: number }[][];
  handedness: { categoryName: string }[][];
}

export interface FaceResult {
  faceLandmarks: { x: number; y: number; z: number }[][];
}

export function useMediaPipe(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean
) {
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const handResultRef = useRef<HandResult>({ landmarks: [], handedness: [] });
  const faceResultRef = useRef<FaceResult>({ faceLandmarks: [] });
  const listenersRef = useRef<
    ((h: HandResult, f: FaceResult) => void)[]
  >([]);

  const subscribe = useCallback(
    (fn: (h: HandResult, f: FaceResult) => void) => {
      listenersRef.current.push(fn);
      return () => {
        listenersRef.current = listenersRef.current.filter((l) => l !== fn);
      };
    },
    []
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      if (cancelled) return;

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
      });

      if (cancelled) return;
      handLandmarkerRef.current = handLandmarker;
      faceLandmarkerRef.current = faceLandmarker;
      setReady(true);
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!ready || !enabled) return;

    let lastTime = -1;

    function detect() {
      const video = videoRef.current;
      const hl = handLandmarkerRef.current;
      const fl = faceLandmarkerRef.current;

      if (video && hl && fl && video.readyState >= 2) {
        const now = video.currentTime;
        if (now !== lastTime) {
          lastTime = now;
          const ts = performance.now();
          try {
            const hr = hl.detectForVideo(video, ts);
            const fr = fl.detectForVideo(video, ts);

            handResultRef.current = {
              landmarks: hr.landmarks ?? [],
              handedness: hr.handednesses ?? [],
            };
            faceResultRef.current = {
              faceLandmarks: fr.faceLandmarks ?? [],
            };

            for (const fn of listenersRef.current) {
              fn(handResultRef.current, faceResultRef.current);
            }
          } catch {
            // skip frame on error
          }
        }
      }
      rafRef.current = requestAnimationFrame(detect);
    }

    rafRef.current = requestAnimationFrame(detect);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, enabled, videoRef]);

  useEffect(() => {
    return () => {
      handLandmarkerRef.current?.close();
      faceLandmarkerRef.current?.close();
    };
  }, []);

  return { ready, subscribe, handResultRef, faceResultRef };
}
