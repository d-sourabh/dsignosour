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
        index="01 / 04"
        eyebrow="Case Study · FSS"
        meta="Brand Strategy · Website Transformation · Content Ecosystem · Martech"
        statement="Transforming a legacy fintech company into a modern AI-first platform brand."
      />

      <CaseStudySection
        index="01"
        label="Context"
        heading="A three-decade payments company rediscovering its category."
        body={[
          "FSS had spent decades quietly powering payments infrastructure for banks across India, the Middle East, Africa, and APAC. The category had moved on, the buyers had changed, and the brand still sounded like a back-office vendor in a foundation-model era.",
          "The work began with a single question: what does FSS look like when it is rebuilt for the next decade rather than maintained for the last one?",
        ]}
        placeholder="Placeholder for positioning framework visualization."
      />

      <PullStatement>
        The challenge was not visibility. It was relevance in an AI-shaped
        market.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="Strategic Shift"
        heading="From product surface area to platform conviction."
        body={[
          "The brand had been speaking in product names. The market was listening for platform thinking. We rebuilt the narrative around three pillars: Protect, Grow, Create, mapped to the actual modernization decisions banking CIOs and CTOs were making.",
          "Every artefact downstream, from positioning to website to content, was tested against a single rule: does this sound like a platform company building the next era of payments, or a vendor renewing a contract?",
        ]}
        placeholder="Placeholder for Protect, Grow, Create narrative framework."
        reverse
      />

      <CaseStudySection
        index="03"
        label="Website Transformation"
        heading="An editorial system, not a brochure."
        body={[
          "The site moved from feature lists to story architectures. Each product page became an argument: who this is for, what is changing in their world, and why FSS is the platform shaped for that change.",
          "Content modules, hero systems, and templates were rebuilt so marketing could ship narrative at the pace of the market, not the pace of quarterly cycles.",
        ]}
        placeholder="Placeholder for SEO and AEO growth visualization."
      />

      <CaseStudySection
        index="04"
        label="Content Ecosystem"
        heading="A library that compounds."
        body={[
          "We treated content as a system, not a calendar. Pillar narratives, executive POVs, podcast episodes, and CXO briefings were threaded into one ecosystem so every piece reinforced the next.",
          "The result was a content engine where Payments Unheard, the FSS AI Masterclass, and original research kept pulling the same audience deeper into the platform story.",
        ]}
        placeholder="Placeholder for content ecosystem diagram."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Audience Growth"
        heading="Compounding presence with the buyer."
        body="LinkedIn moved from a publishing channel to an audience asset. CXO-grade thought leadership, narrative drops, and editorial campaigns built a community of senior banking buyers who returned for the writing, not the promotion."
        placeholder="Placeholder for LinkedIn community growth curve."
      />

      <CaseStudySection
        index="06"
        label="Martech Infrastructure"
        heading="An operating layer underneath the narrative."
        body={[
          "Brand work only travels as far as the system carrying it. The team rebuilt the martech stack around buyer intelligence, account scoring, and orchestration so every campaign could move from broad reach to named-account precision.",
          "This is where storytelling stopped being a deliverable and became a function with measurable pipeline behind it.",
        ]}
        placeholder="Placeholder for martech automation architecture."
        reverse
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          { metric: "#1", label: "Media Share of Voice" },
          { metric: "100%+", label: "Organic Traffic Growth" },
          { metric: "75K+", label: "LinkedIn Community" },
          { metric: "500Cr+", label: "Influenced Pipeline" },
        ]}
      />

      <NextCaseStudy
        number="02 / 04"
        route="/work/gtm-narratives"
        title="Building GTM Narratives Across a Payments Ecosystem"
      />
    </CaseStudyPage>
  );
}
