export interface GestureEntry {
  id: string;        // internal key matching useGestures detection
  index: string;     // display number "01"-"10"
  name: string;
  description: string;
  filter: string;    // short label for the filter effect
}

export const GESTURES: GestureEntry[] = [
  {
    id: "fist",
    index: "01",
    name: "Fist",
    description: "Clench all five fingers tight.",
    filter: "Dither",
  },
  {
    id: "peace",
    index: "02",
    name: "Peace Sign",
    description: "Index and middle fingers up, others curled.",
    filter: "VHS · chromatic aberration",
  },
  {
    id: "pointing",
    index: "03",
    name: "Pointing Finger",
    description: "Index finger only, others curled.",
    filter: "Spotlight",
  },
  {
    id: "openPalm",
    index: "04",
    name: "Open Palm",
    description: "All five fingers spread wide.",
    filter: "Water ripple",
  },
  {
    id: "thumbsUp",
    index: "05",
    name: "Thumbs Up",
    description: "Thumb extended up, fingers curled.",
    filter: "\"noted, thanks\" overlay",
  },
  {
    id: "rockOn",
    index: "06",
    name: "Rock On",
    description: "Index and pinky up, middle and ring curled.",
    filter: "Glitch · RGB shift",
  },
  {
    id: "okSign",
    index: "07",
    name: "OK Sign",
    description: "Thumb and index forming a circle, others extended.",
    filter: "Soft focus + vignette",
  },
  {
    id: "thumbDown",
    index: "08",
    name: "Thumb Down",
    description: "Thumb extended downward, fingers curled.",
    filter: "Invert colors",
  },
  {
    id: "pinch",
    index: "09",
    name: "Pinch",
    description: "Thumb and index pinched, other fingers curled.",
    filter: "Magnify",
  },
  {
    id: "threeFingers",
    index: "10",
    name: "Three Fingers",
    description: "Index, middle, and ring extended.",
    filter: "Pixelate · 8-bit",
  },
];
