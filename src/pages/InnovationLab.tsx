import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function InnovationLab() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="04 / 08"
        eyebrow="Case Study · Innovation Lab"
        meta="Innovation · AI · AR · Experiments"
        statement="Designing experimental systems for modern brand storytelling."
      />

      <CaseStudySection
        index="01"
        label="Innovation Philosophy"
        heading="Experiments are how brands stay current with their own future."
        body={[
          "B2B marketing rewards consistency and punishes risk. The Innovation Lab was built as a controlled venue for the opposite: small, intentional experiments that test what a modern technology brand can do once it stops asking permission from its own playbook.",
          "Every experiment is built with the same rule: ship something a category leader could credibly release tomorrow, not something that looks like an agency reel.",
        ]}
        image="/innovation-framework.webp"
        imageAlt="The innovation framework: three pillars of AI-led experiences, AR storytelling, and interactive systems, under one shipping rule."
        placeholder="Shipping artefacts from the future."
      />

      <PullStatement>
        Brands do not become modern by talking about the future. They become
        modern by shipping artefacts from it.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="AI-Led Experiences"
        heading="Interfaces that read, write, and reason with the audience."
        body={[
          "Conversational research agents, AI-generated executive briefings, and personalised narrative engines were built and tested with real audiences.",
          "The work was less about novelty and more about establishing the brand as a credible operator of AI surfaces, not a commentator on them.",
        ]}
        image="/innovation-ai-led.webp"
        imageAlt="Merlin, a multilingual conversational AI assistant, live in the product."
        placeholder="A conversational AI surface in production."
        reverse
      />

      <CaseStudySection
        index="03"
        label="AR Storytelling"
        heading="Stories that live in physical rooms."
        body={[
          "AR layers were designed for events, executive briefings, and printed artefacts so a one-page document could open into a deeper story when scanned, without requiring an app.",
          "The intent was always continuity: a single narrative that gracefully expanded across paper, screen, and room.",
        ]}
        image="/innovation-ar.webp"
        imageAlt="A Smarter with AI launch panel designed to open into a deeper AR story when scanned."
        placeholder="Print that opens into an AR story."
      />

      <CaseStudySection
        index="04"
        label="Interactive Systems"
        heading="Tools the audience uses, not assets they consume."
        body={[
          "Calculators, configurators, benchmarking instruments, and interactive frameworks were treated as primary brand surfaces.",
          "Where most B2B content asks to be read, these systems asked to be used. The brand was felt through the interaction, not declared in the copy.",
        ]}
        video="/innovation-interactive.mp4"
        poster="/innovation-interactive-poster.webp"
        imageAlt="An interactive sales-intelligence dashboard the audience uses rather than reads."
        placeholder="A tool the audience uses, not reads."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Future Exploration"
        heading="A standing programme, not a one-off campaign."
        body="The Lab is structured as a continuous practice with quarterly themes, prototype cycles, and documented learnings. Some experiments graduate into the brand. Some are retired. Both outcomes are valuable, and both are designed for."
        image="/innovation-roadmap.webp"
        imageAlt="A standing quarterly practice with prototype cycles where experiments either graduate into the brand or are retired."
        placeholder="A standing quarterly practice."
      />

      <CaseStudyOutcomes
        index="06"
        outcomes={[
          { metric: "12+", label: "Shipped Experiments" },
          { metric: "4", label: "Quarterly Themes Operating" },
          { metric: "3", label: "Graduated into Core Brand" },
          { metric: "∞", label: "Curiosity Compounding" },
        ]}
      />

      <NextCaseStudy
        number="01 / 08"
        route="/work/fss-transformation"
        title="Repositioning FSS for the AI Era"
      />
    </CaseStudyPage>
  );
}
