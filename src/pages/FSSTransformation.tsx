import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function FSSTransformation() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="01 / 09"
        eyebrow="Case Study · FSS"
        meta="Brand Strategy · Website Transformation · AI Experience · Experiential Marketing"
        statement="Transforming a legacy payments company into an AI-first brand experience built for the next era of financial infrastructure."
      />

      <CaseStudySection
        index="01"
        label="Context"
        heading="FSS needed to signal that it was ready for the next generation of payments."
        body={[
          "For more than three decades, FSS had built a reputation as a trusted payments infrastructure company powering banks, processors, and financial institutions across India, the Middle East, and Africa. But the market had changed. AI, real-time payments, embedded finance, and modern digital experiences were redefining how enterprise technology brands were evaluated.",
          "The challenge was not credibility. FSS already had that. The challenge was perception. The company was still seen as infrastructure-first in a market increasingly rewarding intelligence, design, speed, and innovation. The brief was to launch a completely new digital experience that would reposition FSS as a future-ready, AI-first platform brand while retaining the trust associated with a 34-year legacy.",
        ]}
        image="/fss-old-vs-new.webp"
        imageAlt="Side-by-side comparison of the legacy FSS website and the new dark-mode platform brand experience."
        placeholder="Old versus new website transformation."
      />

      <PullStatement>
        AI alone does not change perception. People need to experience the
        future before they believe it.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="Strategic Shift"
        heading="The launch was designed as a full-scale perception shift rather than a website refresh."
        body={[
          "Instead of treating the website as a standalone marketing asset, we treated it as the centrepiece of a larger brand transformation initiative. Every decision was guided by a single objective: make FSS feel unmistakably modern without disconnecting from its credibility in payments.",
          "The visual system moved to a cinematic dark-mode interface built around deep blacks, sharp red accents, motion design, and immersive storytelling. At the same time, we introduced \u201CMerlin,\u201D a multilingual AI assistant designed to make the platform feel intelligent, conversational, and globally accessible. The launch strategy expanded beyond digital into physical experiences, AR activations, AI-powered interactions, and immersive storytelling environments across offices and client touchpoints.",
        ]}
        placeholder="Placeholder for brand strategy framework and AI-first positioning visuals."
        reverse
      />

      <CaseStudySection
        index="03"
        label="Website Experience"
        heading="The new website was engineered to feel immersive, intelligent, and alive."
        body={[
          "The website was rebuilt from the ground up with a focus on interaction design, motion systems, and modern enterprise storytelling. Scroll-triggered animations, cinematic transitions, WebGL-driven visual elements, and micro-interactions transformed the browsing experience into something more experiential than informational.",
          "The platform also integrated live martech systems and dynamic content surfaces that continuously pulled whitepapers, demos, and knowledge assets into the experience. Merlin, the multilingual LLM-powered assistant, enabled visitors to interact with the platform in more than 150 languages. Every layer of the experience was designed to reinforce one message: FSS was entering the AI era with confidence and clarity.",
        ]}
        placeholder="Placeholder for dark-mode website screens and interaction design system."
      />

      <CaseStudySection
        index="04"
        label="Phygital Launch"
        heading="The website launch extended into immersive physical experiences across offices and client environments."
        body={[
          "To ensure the launch became an organizational moment rather than a marketing announcement, we built a coordinated phygital rollout across Mumbai, Chennai, Dubai, and client-facing environments. Merlin cutouts equipped with QR triggers appeared across offices, linking employees to an AI-generated music video experience.",
          "An AI-powered roaming robot wearing Merlin\u2019s signature red cape interacted with employees in real time, while augmented reality wall installations brought the company\u2019s future-facing narrative to life through smartphone-triggered animations. A touch-sensitive Tesseract cube installation added a science-fiction inspired interactive layer to the experience. For client meetings, sales teams carried matte-black launch kits containing NFC-enabled collateral, AR triggers, and projection-led storytelling experiences.",
        ]}
        placeholder="Placeholder for AR wall installations, Merlin robot interactions, and Tesseract cube visuals."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Campaign Rollout"
        heading="Every audience experienced the transformation through a tailored narrative layer."
        body={[
          "The rollout strategy was customized across clients, regulators, employees, and prospective talent audiences. LinkedIn campaigns targeted banking and payments leaders across Mumbai, Dubai, and Riyadh using localized storytelling experiences and region-aware landing pages. Merlin greeted users contextually, while the site dynamically surfaced relevant platform capabilities and thought leadership content.",
          "Internally, employees were introduced to the launch through teaser campaigns, QR-driven interactions, and synchronized office activations leading into the CEO town hall and global website reveal. The objective was to convert employees into active brand participants instead of passive observers. This transformed the launch into a collective organizational experience that extended far beyond the website itself.",
        ]}
        placeholder="Placeholder for LinkedIn campaign creatives, launch kits, and employee engagement visuals."
      />

      <CaseStudySection
        index="06"
        label="Operating Layer"
        heading="The launch required new operational systems across technology, storytelling, and coordination."
        body={[
          "Executing the launch required capabilities that did not previously exist within the marketing function. The team worked with emerging technologies including WebGL environments, multilingual LLM systems, web-based augmented reality, and AI-assisted physical installations. To operationalize this, a two-week capability sprint was conducted with external specialists to train internal teams across production, prompting, interaction management, and activation workflows.",
          "A hub-and-spoke execution model ensured synchronization across Mumbai, Chennai, Dubai, and client-facing deployments. Shared messaging systems, centralized launch governance, and rapid-response micro teams allowed the experience to remain consistent across digital, physical, and social channels simultaneously.",
        ]}
        placeholder="Placeholder for launch operations workflow and cross-location coordination diagrams."
        reverse
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          { metric: "91K+", label: "Unique visitors in the first month" },
          { metric: "2.6×", label: "Increase in average session duration" },
          { metric: "12.6K", label: "AI conversations handled autonomously by Merlin" },
          { metric: "3.4M", label: "Organic social impressions generated by employees" },
        ]}
      />

      <NextCaseStudy
        number="02 / 09"
        route="/work/blaze-platform"
        title="Positioning and Launching FSS BLAZE"
      />
    </CaseStudyPage>
  );
}
