import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import SelectedWork from "@/components/SelectedWork";
import KeyAccolades from "@/components/KeyAccolades";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-background overflow-hidden"
    >
      {/* Hero block contains its own video background and nav */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-20">
          <Navigation />
        </div>
        <Hero />
      </div>

      <AboutMe />
      <SelectedWork />
      <KeyAccolades />
      <Footer />
      <AmbientAudio />
    </motion.main>
  );
}
