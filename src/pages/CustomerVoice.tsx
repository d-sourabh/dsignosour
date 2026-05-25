import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function CustomerVoice() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="07 / 09"
        eyebrow="Case Study · Customer Voice & CXX Week"
        meta="CSAT & NPS · Qualtrics · Customer Analytics · Executive Engagement"
        statement="Turning scattered customer feedback into a system that leadership could act on."
      />

      <CaseStudySection
        index="01"
        label="Context"
        heading="FSS knew its customers had opinions. It had no system to hear them at scale."
        body={[
          "For a company powering payments across banks in India, the Middle East, and Africa, customer sentiment lived in scattered places: support tickets, account manager conversations, the occasional escalation that reached leadership. There was no structured, repeatable way to measure how customers actually felt, or to turn that feeling into action.",
          "The brief was to build a customer listening system from the ground up: define the methodology, instrument it in Qualtrics, run it across the portfolio, and turn raw responses into something a CXO could read in five minutes and act on the same day.",
        ]}
      />

      <CaseStudySection
        index="02"
        label="The System"
        heading="One methodology, three survey types, a single scoring spine."
        body={[
          "The program measured satisfaction across leadership stakeholders (AGM, DGM, GM, Directors, AVP, VP, CEO, CTO, CPO) plus project managers and owners, delivered over email and instrumented in Qualtrics.",
          "Three survey types ran in parallel: quarterly manual CSAT for the core product lines (PayTech, CashTech, ETS), automated on-the-go surveys triggered by change requests, and a quarterly NPS track. Every response sat on a single 0-to-5 scoring spine, with any score below the satisfaction threshold automatically flagged for root-cause analysis. The structure meant a one-off complaint and a systemic pattern could be told apart.",
        ]}
      />

      <CaseStudySection
        index="03"
        label="Listening at Scale"
        heading="182 surveys sent. 65 leaders responded. Every comment read."
        body={[
          "The first full cycle reached 182 stakeholders and returned 65 responses, a 36% response rate that is unusually high for B2B executive surveys. PayTech returned a 3.50 average CSAT; ETS, 4.39. Combined CSAT settled at 3.95 with a blended NPS of 7.8.",
          "But the numbers were the smaller half of the story. The qualitative responses, dozens of verbatim comments from leaders at Punjab & Sind Bank, Kotak, SBI, BOB, Bandhan, Magnati, ADCB, Comera, and others, were where the real signal lived. Reading them in aggregate surfaced patterns no single ticket ever could.",
        ]}
      />

      <CaseStudySection
        index="04"
        label="From Comments to Themes"
        heading="Eleven recurring themes, separated from one-off noise."
        body={[
          "Hundreds of lines of free-text feedback were coded into eleven recurring themes spanning the response set: support quality and turnaround, communication and coordination, delivery timelines, resource and staffing constraints, feature gaps, quality and stability, modernization requests (microservices, STP), and pricing.",
          "The coding revealed what mattered most. Customer Support and Communication scored lowest (3.42 of 5), making it the single biggest retention risk. Modernization requests, microservices architecture, straight-through processing, tokenization, multicurrency, came up repeatedly as the things customers wanted next. The themes turned a wall of text into a prioritized action list.",
        ]}
      />

      <PullStatement>
        A score tells you how a customer feels. A verbatim comment tells you
        why. The system was built to capture both, and to make leadership act on
        them.
      </PullStatement>

      <CaseStudySection
        index="05"
        label="The Observability Dashboard"
        heading="A single screen where leadership could see every account, score, and verbatim."
        body={[
          "The insight that mattered: a survey result that sits in a slide deck dies in a slide deck. So the analysis became a live observability dashboard, the FSS Customer Voice Dashboard, built to be read by executives, not analysts.",
          "Four views (Overall, PayTech, ETS, and a Journey track for accounts surveyed more than once) let anyone filter all 34 accounts by region, product, source, and account health. Each account carried a health classification, from Champion to Critical, and clicking any row expanded the full merged verbatim feedback behind the score. The dashboard surfaced the things leadership needed to act on immediately: two critical accounts (Comera and Network International Jordan) flagged for executive escalation, four Champion accounts (BOB, PNB RRBs, CBI, DrukPNB), and the structural finding that ETS health was materially stronger than PayTech (66% promoters versus 22%).",
        ]}
        image="/csat-dashboard.webp"
        imageAlt="The FSS Customer Voice Dashboard showing combined CSAT, respondent counts, account health distribution, survey coverage, PayTech versus ETS comparison, account quadrants, NPS by region, and the sortable account table with merged verbatim feedback."
        placeholder="The FSS Customer Voice Dashboard, built for executives."
      />

      <CaseStudySection
        index="06"
        label="CXX Week"
        heading="Closing the loop in person, not just on a dashboard."
        body={[
          "Measurement only matters if customers see something change. CXX Week turned the listening program into an engagement moment: a dedicated week inviting customers into continuous dialogue with FSS, anchored in the company's founding commitment to understanding Indian banks better than global competitors could.",
          "The week ran customer testimonials (Central Bank of India on the interoperable cash deposit GFF rollout, BRAC Bank on swift settlement resolution, Punjab National Bank on a 30-year partnership), a video montage tracing FSS's customer-centricity story across Cashtech, ETS, and delivery, and a photobooth and social moment under #FSSCXXWeek2025. Feedback gathered during the week fed straight back into the same system, closing the loop between hearing customers and showing them they had been heard.",
        ]}
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          { metric: "36%", label: "Executive response rate" },
          { metric: "65", label: "Leaders heard" },
          { metric: "34", label: "Accounts on a live dashboard" },
          { metric: "11", label: "Themes turned into action" },
        ]}
      />

      <NextCaseStudy
        number="08 / 09"
        route="/work/content-engine"
        title="Building a Full-Stack Content Engine"
      />
    </CaseStudyPage>
  );
}
