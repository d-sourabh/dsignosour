const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Video background: provides all atmosphere, no overlays */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-screen">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-balance"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Turning complex payments platforms into stories banks buy into.
        </h1>

        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          Product marketing for fintech and payments infrastructure, across{" "}
          <em className="not-italic text-foreground/80">India, the Middle East, Africa,</em>{" "}
          and <em className="not-italic text-foreground/80">APAC.</em>
        </p>

        <a
          href="#work"
          className="animate-fade-rise-delay-2 liquid-glass rounded-full px-10 sm:px-14 py-4 sm:py-5 text-sm sm:text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer transition-transform duration-300 whitespace-nowrap"
        >
          Select Work
        </a>
      </div>
    </section>
  );
}
