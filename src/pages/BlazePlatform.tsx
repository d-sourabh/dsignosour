import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
  CaseStudyVideo,
  CaseStudyImage,
  CaseStudyCarousel,
  CaseStudyBrochure,
} from "@/components/CaseStudyLayout";

export default function BlazePlatform() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="02 / 09"
        eyebrow="Case Study · FSS BLAZE Platform GTM"
        meta="Product Marketing · Positioning · Brand Architecture · Sales Enablement"
        statement="Taking a microservices payments platform no one understood, and turning it into a category banks wanted to buy into."
      />

      <CaseStudySection
        index="01"
        label="The Positioning Problem"
        heading="The product was modern. The positioning was stuck in the last decade."
        body={[
          "FSS BLAZE was a cloud-native payments platform built on microservices, engineered for 20,000+ transactions per second and go-live in under three months. The capability was genuinely modern. The market frame was not: after three decades, banks still filed FSS under legacy infrastructure, and the \"you must modernize\" message had been worn flat by every vendor and analyst in the category.",
          "This was a positioning problem before it was a demand problem. No volume of campaign spend fixes a product the buyer has mentally mis-filed. The first job was to define what BLAZE was, who it was for, and why it was different, in a way that separated FSS from both its own legacy reputation and a crowded field of modernization pitches.",
        ]}
      />

      <CaseStudySection
        index="02"
        label="Architecting the Portfolio"
        heading="A branded house that turned one complex platform into four sellable stories."
        body={[
          "A platform spanning low-code, integration, data, and AI is nearly impossible to sell as a single SKU; buyers cannot hold it in their heads. So the core decision was structural: BLAZE as the master brand, with four independently positioned pillars, each with its own value proposition, ideal customer profile, and proof points.",
          "Studio, the low-code application builder (prototype in a week, go live in three months). Integrator, connecting modern and legacy systems with intelligent data routing. Oasis, the unified data intelligence stack turning conversations into insights. And Cosmos, the AI and ML core powering generative and predictive intelligence across the platform. Each pillar could enter a different buying conversation and land with a different stakeholder, while every sale reinforced the platform. A \"Powered by BLAZE\" endorsement system then re-positioned the entire existing product portfolio under the new architecture, so legacy products became proof of the platform rather than evidence of the old reputation.",
        ]}
        image="/blaze-anatomy.webp"
        imageAlt="The FSS BLAZE platform: products now built on BLAZE, with composable reusable architecture, faster development, 20,000+ TPS scalable on demand, microservices for plug-and-play integration, and infused intelligence (GenAI, NLP, ML, automations), shown above the four pillars Studio, Oasis, Integrator, and Cosmos over the layered Business, Domain, and Framework Components architecture."
        placeholder="The BLAZE branded house: four pillars, one platform."
      />

      <CaseStudyCarousel
        index="02"
        label="One Pager Per Pillar"
        items={[
          {
            src: "/blaze-onepager-studio.webp",
            alt: "FSS BLAZE Studio one pager: low-code development for rapid innovation.",
            caption: "Studio",
          },
          {
            src: "/blaze-onepager-integrator.webp",
            alt: "FSS BLAZE Integrator one pager: seamless integrations with legacy and modern systems.",
            caption: "Integrator",
          },
          {
            src: "/blaze-onepager-oasis.webp",
            alt: "FSS BLAZE Oasis one pager: data to intelligent insights from spoken language.",
            caption: "Oasis",
          },
          {
            src: "/blaze-onepager-cosmos.webp",
            alt: "FSS BLAZE Cosmos one pager: generative intelligence powered by an AI and ML core, with AI at scale, smart insights, faster development, and flexible future-ready solutions.",
            caption: "Cosmos",
          },
          {
            src: "/blaze-onepager-studiodev.webp",
            alt: "FSS BLAZE Studio for developers one pager: low-code platform to build enterprise-grade payment apps faster.",
            caption: "Studio for Developers",
          },
        ]}
      />

      <CaseStudySection
        index="03"
        label="The Messaging"
        heading="Translating a microservices platform into language a bank CXO would act on."
        body={[
          "The audience, CXOs, VPs, and heads of technology across India, the Middle East, and Africa, is technical enough to dismiss marketing fluff and busy enough to ignore complexity. The messaging had to be both credible and effortless to consume, and tuned to three regions at different maturity levels.",
          "The cornerstone was a deliberate messaging decision: let the people bankers already trust deliver the story, unscripted. A video series with the CEO, Chief Architect, and VP Strategy each framed BLAZE from the business, technical, and product angle, the three lenses a buying committee actually splits along. Around it sat a full messaging system: website, brochure, a category-defining whitepaper reframing payments through proven platform companies, and a modular library of infographics and carousels that broke the platform down by benefit and use case.",
        ]}
      />

      <CaseStudyVideo
        index="03"
        label="Platform Teaser"
        caption="03 · The FSS BLAZE launch teaser, built to stop a banker mid-scroll."
        src="/blaze-ad-teaser.mp4"
        poster="/blaze-ad-poster.webp"
        maxWidth={680}
      />

      <CaseStudyImage
        index="03"
        label="Print Campaign"
        caption="The FSS BLAZE print ad. Now arriving at leading banks in UAE."
        src="/blaze-printad-full.webp"
        alt="FSS BLAZE print advertisement: 20,000+ transactions per second, zero compromises, with the four pillar marks above the layered platform render and feature pills."
      />

      <CaseStudySection
        index="04"
        label="Enabling the Revenue Motion"
        heading="Marketing the sales team could actually carry into the room."
        body={[
          "The launch was sequenced as an integrated motion, not a broadcast: PR to establish category credibility, the video series to build understanding, targeted social to extend reach, and a drip email program carrying individually framed BLAZE messaging to named decision-makers at major banks.",
          "The critical layer sat underneath: equipping FSS sales and BD teams with the narrative, the videos, and the pillar-level stories to share directly with prospects and live accounts. The messaging was not an artifact that died at the top of funnel; it was built to be carried into deals. Sustained over three years with LinkedIn performance campaigns, user-generated content, and a dedicated developer-marketing track aimed at the technical evaluators who actually approve a microservices platform.",
        ]}
      />

      <CaseStudyVideo
        index="04"
        label="Developer Marketing"
        caption="04 · BLAZE Studio for Developers, aimed at the engineers who evaluate the platform."
        src="/blaze-studio-teaser.mp4"
        poster="/blaze-studio-poster.webp"
      />

      <PullStatement>
        Good product marketing does not make a product louder. It makes it
        understood, differentiated, and easy to say yes to.
      </PullStatement>

      <CaseStudySection
        index="05"
        label="Proving It Through Experience"
        heading="Simply Payments turned positioning into a room full of qualified conversations."
        body={[
          "Positioning is theory until a buyer tests it. BLAZE became the central narrative of Simply Payments, FSS's flagship CXO event, where senior banking leaders engaged with the platform in depth, surfaced objections directly, and revealed what their own modernization actually required, intelligence that fed straight back into sharpening the positioning and messaging.",
          "A dedicated experience-centre showcase and a product roadshow across industry events extended that hands-on proof beyond a single room, turning the launch from a campaign into a felt experience.",
        ]}
      />

      <CaseStudySection
        index="06"
        label="Tied to Pipeline"
        heading="The work was built to move banks from monolith to platform, and to move pipeline."
        body={[
          "Every layer of the GTM fed one commercial objective: accelerate FSS's transition from legacy monolithic deployments to the BLAZE platform. The strategy targeted a 500+ crore BLAZE pipeline across 38 deals and six Tier-1 banks including SBI, HDFC, and IndusInd.",
          "Documented campaign results backed the motion: more than 30 banks entering transformation conversations, over 10,000 bank decision-makers reached, and content engagement at a 6.2% rate against a 23% newsletter open rate, strong signals for a niche enterprise audience. Awareness was never the goal. Qualified pipeline was.",
        ]}
      />

      <CaseStudyBrochure
        index="07"
        label="The Collateral"
        caption="Powered by FSS BLAZE. The full platform brochure. Swipe or use the arrows."
        pageCount={14}
        basePath="/blaze-brochure"
      />

      <CaseStudyOutcomes
        index="08"
        outcomes={[
          { metric: "Rs.500+ Cr", label: "Pipeline targeted" },
          { metric: "6", label: "Tier-1 banks engaged" },
          { metric: "4", label: "Pillars under one platform" },
          { metric: "30+", label: "Banks in transformation talks" },
        ]}
      />

      <NextCaseStudy
        number="03 / 09"
        route="/work/gtm-narratives"
        title="Building GTM Narratives Across a Payments Ecosystem"
      />
    </CaseStudyPage>
  );
}
