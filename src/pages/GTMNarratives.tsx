import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function GTMNarratives() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="02 / 08"
        eyebrow="Case Study · GTM"
        meta="GTM · Positioning · Sales Enablement · Product Marketing"
        statement="Building product narratives across a complex payments ecosystem."
      />

      <CaseStudySection
        index="01"
        label="Product Ecosystem"
        heading="One company. Many products. A single connected argument."
        body={[
          "Payment gateway, card management, reconciliation, switching, and platform products had each grown their own language over the years. To a buyer evaluating modernization, the portfolio sounded like five companies sharing a logo.",
          "The work was to find the shared narrative spine and let each product speak inside that spine with its own voice intact.",
        ]}
        image="/gtm-architecture.webp"
        imageAlt="FSS payments ecosystem architecture showing the issuer stack, payment processing, merchant and acquirer stack, monitoring and reconciliation, and digital security layers connected through the Cosmos AI core and FSS Blaze platform."
        placeholder="The connected FSS payments ecosystem, built on FSS Blaze."
      />

      <PullStatement>
        Great positioning is not what a product is. It is the decision the buyer
        makes after reading it.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="Positioning Systems"
        heading="Frameworks the field could actually carry."
        body={[
          "Each product was rebuilt with a positioning canvas: category frame, ideal buyer, competitive contrast, proof points, and the single sentence the sales team would say in a hallway.",
          "These were not slides. They became operating documents that decided what the website said, what the deck opened with, and what the analyst briefing emphasised.",
        ]}
        placeholder="Placeholder for positioning canvas system."
        reverse
      />

      <CaseStudySection
        index="03"
        label="Persona Mapping"
        heading="Four archetypes that decided how stories were told."
        body={[
          "Buyer intelligence surfaced four recurring archetypes across Indian banking: the PSB Visionary, the Digital-Native CIO, the Transaction Operator, and the Builder-Banker.",
          "Each had its own pace, vocabulary, and political reality. Every narrative was then tested against the archetype most likely to sponsor the deal, not the audience that liked the deck.",
        ]}
        placeholder="Placeholder for buyer archetype map."
      />

      <CaseStudySection
        index="04"
        label="Sales Enablement"
        heading="The deck stopped being the message."
        body={[
          "Decks were rebuilt around argument arcs rather than feature inventories. Each slide had to advance a decision, not describe a capability.",
          "Battlecards, objection libraries, executive briefings, and one-pagers were redesigned around the same arc so the field always told a continuous story across stages.",
        ]}
        placeholder="Placeholder for sales enablement asset system."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Regional GTM Adaptation"
        heading="One story. Three regional accents."
        body="India, the Middle East, and APAC are not the same buyer with a different timezone. Each region got an adapted narrative layer addressing local regulation, market maturity, and competitive set, while preserving the platform spine that made the brand recognisable."
        placeholder="Placeholder for regional narrative adaptation map."
      />

      <CaseStudyOutcomes
        index="06"
        outcomes={[
          { metric: "5", label: "Product Lines Repositioned" },
          { metric: "3", label: "Regional GTM Playbooks" },
          { metric: "4", label: "Buyer Archetypes Operationalised" },
          { metric: "12+", label: "Priority Bank Pipelines Activated" },
        ]}
      />

      <NextCaseStudy
        number="03 / 08"
        route="/work/simply-payments"
        title="Building an Industry Narrative Platform"
      />
    </CaseStudyPage>
  );
}
