import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EditorialPlaceholder from "./EditorialPlaceholder";
import { cn } from "@/lib/utils";

export interface CaseStudyPreviewProps {
  number: string;
  route: string;
  title: string;
  description: string;
  metadata: string;
  placeholder: string;
  alignment?: "left" | "right";
}

export default function CaseStudyPreview({
  number,
  route,
  title,
  description,
  metadata,
  placeholder,
  alignment = "left",
}: CaseStudyPreviewProps) {
  const isLeft = alignment === "left";

  return (
    <section className="relative px-6 py-32 sm:py-40 max-w-7xl mx-auto">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center",
          !isLeft && "lg:[&>*:first-child]:order-2"
        )}
      >
        {/* Media side */}
        <div className="lg:col-span-7">
          <EditorialPlaceholder label={placeholder} index={number} aspect="wide" />
        </div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-5 flex flex-col"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            {number} · Case Study
          </span>

          <h3
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-1.5px] text-balance"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {title}
          </h3>

          <p className="text-muted-foreground text-base sm:text-lg mt-8 leading-relaxed max-w-md">
            {description}
          </p>

          <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mt-10">
            {metadata}
          </p>

          <Link
            to={route}
            className="inline-flex items-center gap-3 mt-12 text-sm text-foreground hover:opacity-70 transition-opacity group w-fit"
          >
            <span>View Case Study</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
