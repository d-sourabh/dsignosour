import {
  CaseStudyPage,
  CaseStudyOpening,
  CaseStudySection,
  CaseStudyOutcomes,
  PullStatement,
  NextCaseStudy,
} from "@/components/CaseStudyLayout";

export default function SimplyPayments() {
  return (
    <CaseStudyPage>
      <CaseStudyOpening
        index="03 / 04"
        eyebrow="Case Study · Simply Payments"
        meta="Executive Marketing · Community · Events · Narrative Strategy"
        statement="Building an executive fintech narrative platform from the ground up."
      />

      <CaseStudySection
        index="01"
        label="Origin Story"
        heading="A closed-door room of 18 CXOs that wanted to become a category."
        body={[
          "Simply Payments started as a small, by-invitation evening for senior banking leaders. The room produced the kind of conversation that does not survive panel formats: candid, slow, and consequential.",
          "The brief became to keep that intimacy intact while scaling it into a recognised industry narrative platform.",
        ]}
        placeholder="Placeholder for executive storytelling visuals."
      />

      <PullStatement>
        Communities scale by depth, not by attendance. The smallest rooms tend
        to produce the loudest signals.
      </PullStatement>

      <CaseStudySection
        index="02"
        label="CXO Experience Design"
        heading="The stacked day as the unit of memory."
        body={[
          "Each Simply Payments edition was built as a stacked day: a working session in the morning, a closed-room conversation through the afternoon, a passion-led evening of cricket, golf, ghazals, or performing arts.",
          "The format respected how senior leaders actually choose to spend a day, and let relationships form across moments rather than across business cards.",
        ]}
        placeholder="Placeholder for stacked-day experience map."
        reverse
      />

      <CaseStudySection
        index="03"
        label="Narrative Strategy"
        heading="An editorial perspective the industry kept quoting."
        body={[
          "Simply Payments was given the voice of an editorial property, not an event series. Themes were chosen the way magazines choose covers: against the current, ahead of the conversation, worth disagreeing with.",
          "The result was a platform that senior buyers attended for the thinking, and journalists tracked for the agenda.",
        ]}
        placeholder="Placeholder for narrative system diagram."
      />

      <CaseStudySection
        index="04"
        label="Media Amplification"
        heading="The room as the source. The world as the audience."
        body={[
          "Every edition was rebuilt downstream as a media artefact: long-form essays, executive interviews, podcast threads, and short-form social drops.",
          "What happened in the room set the agenda. What followed it carried the agenda into the rest of the market.",
        ]}
        placeholder="Placeholder for media amplification flow."
        reverse
      />

      <CaseStudySection
        index="05"
        label="Community Building"
        heading="A returning audience, not a guest list."
        body="The community was designed to compound. Each edition expanded the list with intent rather than volume. Returning attendance became the real metric, with peer-led nominations replacing outbound invitations over time."
        placeholder="Placeholder for community engagement system."
      />

      <CaseStudySection
        index="06"
        label="Dubai Expansion"
        heading="A second city, the same intimacy."
        body={[
          "Dubai was approached as a sister edition rather than a duplicate. The format stayed, the cast changed, the conversation re-localised.",
          "The expansion proved the platform was portable: a system, not a venue.",
        ]}
        placeholder="Placeholder for Dubai expansion narrative."
        reverse
      />

      <CaseStudyOutcomes
        index="07"
        outcomes={[
          { metric: "2", label: "Cities Operationalised" },
          { metric: "100+", label: "CXOs in Active Community" },
          { metric: "60%+", label: "Returning Attendance" },
          { metric: "12+", label: "Earned Media Features" },
        ]}
      />

      <NextCaseStudy
        number="04 / 04"
        route="/work/innovation-lab"
        title="Designing Experimental Brand Experiences"
      />
    </CaseStudyPage>
  );
}
