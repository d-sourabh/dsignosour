import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function ContentEngine() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="07 / 09"
        eyebrow="Case Study · Content Ecosystem"
        meta="Content Strategy · Product Marketing · Social Media · Demand Generation"
        statement="Building a scalable content ecosystem that unified strategy, storytelling, design, distribution, and performance into one continuous operating system."
      />

      <CaseStudySection
        index="01"
        label="Context"
        heading="FSS needed a content engine capable of supporting both perception and growth at scale."
        body={[
          "As FSS expanded across payments, banking infrastructure, platform products, and AI-led transformation initiatives, the demand for content increased across every business function simultaneously. Product teams needed sharper positioning. Sales teams required stronger collateral. Leadership wanted visibility in conversations around AI, digital transformation, and modern payments. Social channels demanded a constant stream of relevant and high-quality storytelling.",
          "The challenge was not simply producing more assets. It was creating a connected ecosystem where every blog, website page, whitepaper, campaign, sales deck, and social post strengthened the same strategic narrative. The organisation needed a content system that could move seamlessly between thought leadership, product marketing, demand generation, and brand storytelling without becoming fragmented.",
        ]}
        placeholder="Fragmented versus unified content ecosystem."
      />

      <PullStatement>
        The strongest content ecosystems are built when strategy, storytelling,
        design, and distribution operate as one integrated function.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="Strategic Shift"
        heading="Content was restructured from a production pipeline into a full-funnel operating layer."
        body={[
          "Instead of treating content as isolated deliverables owned by separate teams, the entire system was redesigned around continuity and compounding value. Long-form assets such as whitepapers, reports, and thought leadership pieces became foundational narrative sources that could evolve into blogs, social campaigns, videos, carousels, website experiences, sales assets, and paid media campaigns.",
          "This shift also required collapsing the distance between strategy and execution. Writing, visual storytelling, motion design, campaign execution, and distribution were treated as interconnected responsibilities instead of siloed functions. The objective was to create a faster, more adaptive content ecosystem capable of supporting launches, sales conversations, leadership visibility, and demand generation simultaneously.",
          "The result was a system where content no longer behaved like marketing support. It became an active business growth layer.",
        ]}
        placeholder="The end-to-end content workflow and distribution flywheel."
        reverse
      />

      <CaseStudySection
        index="03"
        label="Product Storytelling"
        heading="Complex fintech platforms were translated into clear, modern, and commercially relevant narratives."
        body={[
          "A significant part of the work involved rewriting how FSS communicated its products, platforms, and transformation story across digital and sales channels. Website content, solution pages, brochures, pitch decks, campaign messaging, explainer narratives, and product launches were rebuilt with stronger positioning clarity and sharper narrative structures.",
          "Instead of relying on infrastructure-heavy language, the storytelling shifted toward outcomes, platform thinking, AI readiness, operational transformation, and customer impact. Technical systems were reframed through simpler and more modern narratives without losing domain depth or credibility.",
          "This included end-to-end ownership across writing, narrative structuring, visual direction, presentation storytelling, and execution support across multiple fintech categories.",
        ]}
        placeholder="Website content systems, product pages, and platform messaging."
      />

      <CaseStudySection
        index="04"
        label="Publishing Engine"
        heading="A continuous multi-format publishing system was established across the organisation."
        body={[
          "The ecosystem operated across blogs, SEO content, subject matter articles, whitepapers, case studies, reports, leadership narratives, press releases, sales enablement assets, and campaign-led storytelling. Publishing systems were established to coordinate contributions from SMEs, leadership teams, agencies, and internal stakeholders without slowing down execution speed.",
          "Long-form strategic content became the source layer for continuous repurposing. A single whitepaper or industry report could evolve into social media carousels, short-form videos, LinkedIn campaigns, website stories, executive talking points, event content, and paid promotions. This created significantly higher content velocity while maintaining narrative consistency across channels.",
          "The system also improved operational clarity by establishing ownership models across in-house teams, agencies, and leadership contributors.",
        ]}
        placeholder="Editorial workflows, publishing systems, and content repurposing."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Social and Growth"
        heading="Social media evolved into a high-frequency brand and demand generation channel."
        body={[
          "Social media management extended beyond scheduling and publishing into complete campaign ownership. This included content ideation, copywriting, creative direction, carousel design, short-form video production, audience targeting, ad execution, performance optimisation, and channel management across LinkedIn and other digital platforms.",
          "The focus was on making fintech storytelling more engaging without sacrificing strategic depth. Technical subjects such as AI in banking, payment modernisation, platform transformation, and digital infrastructure were translated into formats optimised for discoverability, retention, and audience interaction.",
          "Because strategy, design, and execution existed within the same operating layer, campaigns could move rapidly from insight to production to distribution without fragmentation between teams.",
        ]}
        placeholder="LinkedIn campaigns, ad creatives, and social performance."
      />

      <CaseStudySection
        index="06"
        label="Operating Model"
        heading="The ecosystem depended on hybrid ownership across strategy, creation, execution, and coordination."
        body={[
          "The role evolved into a full-stack content function operating across multiple disciplines simultaneously. Strategy development, writing, visual storytelling, video execution, campaign management, stakeholder coordination, and channel operations were handled as part of one integrated workflow.",
          "An optimised outsourcing structure was also created to coordinate agency teams, in-house contributors, SMEs, and leadership stakeholders across varying content categories and production frequencies. The marketing function acted as the orchestration layer between internal expertise and external execution support.",
          "This operating model enabled the organisation to scale content output significantly while maintaining consistency in narrative quality, positioning, and execution standards.",
        ]}
        placeholder="The hybrid in-house and outsourced content operating model."
        reverse
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          {
            metric: "End-to-End",
            label: "Ownership across strategy, creation, distribution, and performance",
          },
          {
            metric: "Multi-Format",
            label: "Publishing ecosystem spanning product, social, leadership, and sales content",
          },
          {
            metric: "Always-On",
            label: "Continuous content engine supporting launches, campaigns, and brand visibility",
          },
          {
            metric: "Full-Stack",
            label: "Execution across writing, design, video production, and channel management",
          },
        ]}
      />

      <NextCaseStudy
        number="01 / 09"
        route="/work/fss-transformation"
        title="Repositioning FSS for the AI Era"
      />
    </CaseStudyPage>
  );
}
