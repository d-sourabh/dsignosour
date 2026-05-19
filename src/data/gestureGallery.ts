export interface GestureEntry {
  index: string;
  name: string;
  description: string;
}

export interface GestureGroup {
  category: string;
  entries: GestureEntry[];
}

export const gestureGallery: GestureGroup[] = [
  {
    category: "Hand Gestures",
    entries: [
      { index: "01", name: "Peace Sign", description: "Extend index and middle fingers — \"✌️ peace\" floats into view." },
      { index: "02", name: "Thumbs Up", description: "Raise your thumb, curl the rest — \"noted, thanks\" with white dots rising from your thumb." },
      { index: "03", name: "Open Palm", description: "Spread all five fingers flat — concentric ripples radiate from your palm." },
      { index: "04", name: "Finger Painting", description: "Extend only your index, tuck your thumb — draw glowing trails that fade after three seconds." },
      { index: "05", name: "Shaka", description: "Extend thumb and pinky, curl the rest — \"stay in touch\" glows softly." },
      { index: "06", name: "Fist Hold", description: "Clench your fist and hold for 1.5 seconds — the screen shakes briefly." },
      { index: "07", name: "Pointing at Camera", description: "Point your index finger forward — \"you, yes you\" types itself letter by letter." },
    ],
  },
  {
    category: "Face Gestures",
    entries: [
      { index: "08", name: "Head Tilt", description: "Tilt your head past 15° — \"hmm\" or \"huh\" appears beside you." },
      { index: "09", name: "Wink", description: "Close one eye — a twinkle drifts up from the corner of the winking eye." },
      { index: "10", name: "Mouth Open Wide", description: "Open your mouth — the camera zooms out slightly, returning when you close." },
      { index: "11", name: "Eyebrow Raise", description: "Raise your eyebrows above baseline — \"interesting\" fades in." },
    ],
  },
  {
    category: "Combined Gestures",
    entries: [
      { index: "12", name: "Ray of Light", description: "Touch your index finger to your forehead — a white gradient ray extends upward." },
      { index: "13", name: "Pinch Zoom", description: "Pinch thumb and index apart with both hands — the video smoothly scales up to 1.8×." },
      { index: "14", name: "Slap", description: "Move your hand fast across your face — \"ouch that hurt\" flashes center-screen." },
      { index: "15", name: "Hand on Chin", description: "Rest your palm under your chin — \"thinking…\" appears in italic at the bottom." },
      { index: "16", name: "Heart Shape", description: "Touch both thumb tips and index tips together, hands raised — floating hearts rise." },
      { index: "17", name: "Clap", description: "Bring both hands together quickly — a full-screen flash with an audio click." },
      { index: "18", name: "Hands Raised", description: "Raise both hands above your head — \"let it all out\" in oversized type." },
      { index: "19", name: "Hand Swipe", description: "Swipe your palm quickly left or right — the screen slides in that direction." },
      { index: "20", name: "Finger Spark", description: "Touch both index fingertips together — white sparks burst at the contact point." },
    ],
  },
];
