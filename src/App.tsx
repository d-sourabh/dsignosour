import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Home from "@/pages/Home";
import FSSTransformation from "@/pages/FSSTransformation";
import GTMNarratives from "@/pages/GTMNarratives";
import SimplyPayments from "@/pages/SimplyPayments";
import InnovationLab from "@/pages/InnovationLab";
import Thinking from "@/pages/Thinking";
import Experiments from "@/pages/Experiments";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work/fss-transformation" element={<FSSTransformation />} />
          <Route path="/work/gtm-narratives" element={<GTMNarratives />} />
          <Route path="/work/simply-payments" element={<SimplyPayments />} />
          <Route path="/work/innovation-lab" element={<InnovationLab />} />
          <Route path="/thinking" element={<Thinking />} />
          <Route path="/experiments" element={<Experiments />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
