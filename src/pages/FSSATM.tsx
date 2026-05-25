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
        index="06 / 09"
        eyebrow="Case Study · FSS ATM"
        meta="Product Marketing · Category Narrative · Positioning · Sales Enablement"
        statement="Building a growth story for a saturated ATM managed-services business that had stopped growing, by turning a commoditised, price-driven category into a four-part transformation banks would invest in."
      />

      <CaseStudySection
        index="01"
        label="The Growth Problem"
        heading="A mature business that had stopped growing, defending share in a price war."
        body={[
          "ATM managed services had matured into a saturated, slow-growth business. The market was crowded and commoditised, a field of vendors competing largely on price and headcount, and FSS's own ATM line, around 25,000 ATMs and roughly 12% market share as one of India's largest providers, had plateaued along with it. For banks the ATM had quietly become a cost centre and a compliance liability, downtime penalties, RBI mandates, cash-out risk, and fraud exposure, which only deepened the pressure to spend less rather than invest more.",
          "Defending share in a price war was not a growth plan. This was a positioning problem before it was a demand problem: FSS could not grow by being cheaper. The work was to reframe the category itself, moving the conversation from \u201Cwho manages our ATMs for less\u201D to \u201Cwho turns our ATM estate from a cost centre into a customer delight centre,\u201D and to give that reframe a structure that reopened a growth conversation a bank would invest in.",
        ]}
        image="/atm-overview.webp"
        imageAlt="Composite overview of the Indian ATM market, the downtime and cost-centre problem, and the technology layers combating it."
        placeholder="The Indian ATM market, the downtime problem, and the technology answering it."
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
        image="/atm-4pronged.webp"
        imageAlt="The four-pronged ATM strategy mapping Process, Preventive, Proactive, and Predictive to active device monitoring, hypercare, EJ pulling, intelligent surveillance, and IoT."
        placeholder="The four-pronged strategy: Process, Preventive, Proactive, Predictive."
        reverse
      />

      <CaseStudySection
        index="03"
        label="The Differentiator"
        heading="The sharpest claim: we stopped watching the ATM and started watching the whole site."
        body={[
          "Every competitor monitored the ATM. The differentiating story was that traditional monitoring was effectively blind. It could not see a power problem, a network outage, or a failing battery, so trouble surfaced only as downtime, after the fact. FSS's answer was to go beyond the machine and instrument every component of the site, air conditioning, UPS, router, modem, lobby lights, and power, through an IoT controller that talks to each device directly.",
          "That unlocked the line that made the positioning concrete: two-way action. Where monitoring had only ever observed, the IoT layer could now act, restarting a router, switching signage off in daylight to save billing units, sounding a hooter against intrusion, and restarting the ATM itself. The story moved from watching a machine to operating an entire site.",
        ]}
        image="/atm-iot-site.webp"
        imageAlt="An IoT-based 24x7 ATM site with every component instrumented, including AC, UPS, router, modem, lighting, power, sensors, and an IoT controller box."
        placeholder="The IoT-based 24x7 ATM site, instrumented end to end."
      />

      <CaseStudySection
        index="04"
        label="Proactive Intelligence"
        heading="A third eye on the site, and a layer that acts before fraud does."
        body={[
          "On top of the instrumented site sat the proactive layer. AI-based intelligent surveillance, a third eye trained on millions of ATM-site images, automatically flags a compromised or unclean site and runs it through a closed workflow, from detection to vendor dispatch to verified closure, at better than 95% accuracy.",
          "Alongside it, real-time, on-demand EJ pulling retrieved electronic journals the moment they were needed rather than on a fixed cycle, turning fraud response from a forensic exercise into a near-live one. Together they completed the shift the positioning promised: detect, decide, and act before a bank has to raise a ticket.",
        ]}
        image="/atm-surveillance.webp"
        imageAlt="AI-based intelligent surveillance detecting an unclean ATM site through an automated workflow at over 95% accuracy."
        placeholder="A third eye: AI-based intelligent site surveillance."
        reverse
      />

      <CaseStudySection
        index="05"
        label="The Human Layer"
        heading="Technology made the promise. A local field force made it credible."
        body={[
          "Predictive intelligence is only as good as the hands that act on it. The story paired the IoT and AI layers with FSS SwiftReach: an app-driven, hyperlocal field operation of 400+ business champions, roughly one dedicated guardian for every 30 ATMs across 3,850+ locations. Preventive maintenance was reframed from a checkbox into a disciplined, app-tracked routine: quarterly inspections logged rather than rushed, electronic reports run through software to verify whether consumable parts were actually replaced, and root-cause analysis on chronic and hardware failures tracked to closure.",
          "This answered the unspoken bank objection that technology is easy to demo and hard to operate at national scale. By naming the field model, the manpower ratio, and the coverage that runs in parallel to existing vendors, the story made the framework feel operational rather than aspirational.",
        ]}
        image="/atm-swiftreach.webp"
        imageAlt="FSS SwiftReach: 400+ on-field business champions, one for every 30 ATMs across 3,850+ locations, running app-driven preventive maintenance."
        placeholder="FSS SwiftReach and the on-field business champions."
      />

      <CaseStudySection
        index="06"
        label="Sales Enablement"
        heading="A story built to be carried into a bank, backed by proof a buyer could not argue with."
        body={[
          "The framework was packaged into a CXO-ready narrative that opened on the market shift and the cost-centre problem, walked the four-part maturity arc, and closed on the transformation to a branch in a box. Every claim was anchored to evidence: roughly 25,000 ATMs managed, around 12% market share, 17+ years in ATM managed services, 65+ OEM and vendor partners under end-to-end contract, and a vendor-agnostic system-integrator position that let FSS sit above the partner ecosystem rather than inside it.",
          "The proof points were chosen to retire risk, not to boast: trusted by SBI, Bank of Baroda, ICICI, HDFC, PNB, and other leading banks, a lineage of firsts in Indian payments, and live operating metrics that turned the framework's promises into numbers a procurement committee could defend internally.",
        ]}
        image="/atm-specialists.webp"
        imageAlt="FSS positioned as the ATM specialist with end-to-end contracts management, 65+ OEM and vendor partners, 17+ years of managed services, and a vendor-agnostic system-integrator role."
        placeholder="The ATM specialist: end-to-end contracts and partner ecosystem."
        reverse
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          { metric: "4", label: "Maintenance Pillars, One Narrative" },
          { metric: "25K", label: "ATMs Under Managed Services" },
          { metric: "12%", label: "National ATM Market Share" },
          { metric: "6/10", label: "Outages Resolved Without a Field Visit" },
        ]}
      />

      <NextCaseStudy
        number="07 / 09"
        route="/work/customer-voice"
        title="Building a Customer Voice System Across 34 Accounts"
      />
    </CaseStudyPage>
  );
}
