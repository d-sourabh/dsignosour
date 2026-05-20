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
        placeholder="Placeholder for innovation experimentation framework."
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
        placeholder="Placeholder for AI-powered experience showcase."
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
        placeholder="Placeholder for AR storytelling demonstration."
      />

      <CaseStudySection
        index="04"
        label="Interactive Systems"
        heading="Tools the audience uses, not assets they consume."
        body={[
          "Calculators, configurators, benchmarking instruments, and interactive frameworks were treated as primary brand surfaces.",
          "Where most B2B content asks to be read, these systems asked to be used. The brand was felt through the interaction, not declared in the copy.",
        ]}
        placeholder="Placeholder for interactive systems showcase."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Future Exploration"
        heading="A standing programme, not a one-off campaign."
        body="The Lab is structured as a continuous practice with quarterly themes, prototype cycles, and documented learnings. Some experiments graduate into the brand. Some are retired. Both outcomes are valuable, and both are designed for."
        placeholder="Placeholder for future exploration roadmap."
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
        number="05 / 08"
        route="/work/customer-voice"
        title="Building a Customer Voice System Across 34 Accounts"
      />
    </CaseStudyPage>
  );
}
