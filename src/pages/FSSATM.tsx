import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function FSSATM() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="05 / 09"
        eyebrow="Case Study · FSS ATM"
        meta="Product Marketing · Category Narrative · Positioning · Sales Enablement"
        statement="Repositioning ATM managed services from a reactive cost centre into a four-part transformation story that banks could buy into."
      />

      <CaseStudySection
        index="01"
        label="The Category Problem"
        heading="ATM managed services had become a price conversation. The story had to change the question."
        body={[
          "For most banks the ATM had quietly turned into a cost centre and a compliance liability: downtime penalties, RBI mandates, cash-out risk, and fraud exposure. The managed-services market serving them was crowded and commoditised, a field of vendors competing largely on price and headcount. FSS held real strength, around 25,000 ATMs and roughly 12% market share as one of India's largest providers, but the category rewarded whoever was cheaper, not whoever was better.",
          "This was a positioning problem before it was a demand problem. FSS could not win a race to the bottom on a service line. The work was to reframe the category itself: move the conversation from \u201Cwho manages our ATMs for less\u201D to \u201Cwho turns our ATM estate from a cost centre into a customer delight centre,\u201D and to give that reframe a structure a bank could follow and a sales team could carry.",
        ]}
        placeholder="The ATM as a cost centre: the category problem."
      />

      <PullStatement>
        The category sold maintenance. The story had to sell the outcome: an ATM
        that stops being a cost and starts behaving like a branch.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="Narrative Architecture"
        heading="Four words turned a scattered service list into a single maturity story."
        body={[
          "FSS's capabilities were real but fragmented: monitoring, cash management, first and second level maintenance, EJ pulling, surveillance, and field services. To a buyer that read as a price list, not a point of view. The organising idea was a four-part framework, Process, Preventive, Predictive, and Proactive, that arranged every capability along one arc: from automating manual operations, to catching small problems early, to predicting failure from live equipment data, to acting on the root cause before a breakdown occurs.",
          "The framework did the work a narrative is supposed to do. It let a conversation begin wherever the bank sat on the maturity curve and show the path forward, it gave each capability a place in a story rather than a line in a catalogue, and it resolved on a single business reframe: optimising the ATM from a cost centre into a customer delight centre. The same spine compressed into a one-page model a CXO could absorb at a glance.",
        ]}
        placeholder="The four-part maturity framework."
        reverse
      />

      <CaseStudySection
        index="03"
        label="The Differentiator"
        heading="The sharpest claim: we stopped watching the ATM and started watching the whole site."
        body={[
          "Every competitor monitored the ATM. The differentiating story was that traditional monitoring was effectively blind. It could not see a power problem, a network outage, or a failing battery, so trouble surfaced only as downtime, after the fact. FSS's answer was to go beyond the machine and instrument every component of the site, air conditioning, UPS, router, modem, lobby lights, and power, through an IoT controller that talks to each device directly.",
          "That unlocked the line that made the positioning concrete: two-way action. Where monitoring had only ever observed, the IoT layer could now act, restarting a router, switching signage off in daylight to save billing units, sounding a hooter against intrusion, and restarting the ATM itself. Paired with AI-based intelligent surveillance that flags a compromised or unclean site automatically, and real-time, on-demand EJ pulling for faster fraud response, the message moved from \u201Cwe watch your ATMs\u201D to \u201Cwe run your estate end to end, and act before you have to ask.\u201D",
        ]}
        placeholder="Beyond the machine: the instrumented ATM site."
      />

      <CaseStudySection
        index="04"
        label="The Human Layer"
        heading="Technology made the promise. A local field force made it credible."
        body={[
          "Predictive intelligence is only as good as the hands that act on it. The story paired the IoT and AI layers with FSS SwiftReach: an app-driven, hyperlocal field operation of 400+ business champions, roughly one dedicated guardian for every 30 ATMs across 3,850+ locations. Preventive maintenance was reframed from a checkbox into a disciplined, app-tracked routine: quarterly inspections logged rather than rushed, electronic reports run through software to verify whether consumable parts were actually replaced, and root-cause analysis on chronic and hardware failures tracked to closure.",
          "This answered the unspoken bank objection that technology is easy to demo and hard to operate at national scale. By naming the field model, the manpower ratio, and the coverage that runs in parallel to existing vendors, the story made the four-part framework feel operational rather than aspirational.",
        ]}
        placeholder="SwiftReach: the hyperlocal field force."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Sales Enablement"
        heading="A story built to be carried into a bank, backed by proof a buyer could not argue with."
        body={[
          "The framework was packaged into a CXO-ready narrative that opened on the market shift and the cost-centre problem, walked the four-part maturity arc, and closed on the transformation to a branch in a box. Every claim was anchored to evidence: roughly 25,000 ATMs managed, around 12% market share, 17+ years in ATM managed services, 65+ OEM and vendor partners under end-to-end contract, and a vendor-agnostic system-integrator position that let FSS sit above the partner ecosystem rather than inside it.",
          "The proof points were chosen to retire risk, not to boast: trusted by SBI, Bank of Baroda, ICICI, HDFC, PNB, and other leading banks, a lineage of firsts in Indian payments, and live operating metrics that turned the framework's promises into numbers a procurement committee could defend internally.",
        ]}
        placeholder="The CXO sales narrative and proof."
      />

      <CaseStudyOutcomes
        index="06"
        outcomes={[
          { metric: "4", label: "Maintenance Pillars, One Narrative" },
          { metric: "25K", label: "ATMs Under Managed Services" },
          { metric: "12%", label: "National ATM Market Share" },
          { metric: "6/10", label: "Outages Resolved Without a Field Visit" },
        ]}
      />

      <NextCaseStudy
        number="06 / 09"
        route="/work/customer-voice"
        title="Building a Customer Voice System Across 34 Accounts"
      />
    </CaseStudyPage>
  );
}
