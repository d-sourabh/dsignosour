import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialPlaceholderProps {
  label: string;
  index?: string;
  className?: string;
  aspect?: "wide" | "cinema" | "portrait" | "square";
}

const aspectMap: Record<NonNullable<EditorialPlaceholderProps["aspect"]>, string> = {
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export default function EditorialPlaceholder({
  label,
  index,
  className,
  aspect = "cinema",
}: EditorialPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "editorial-placeholder relative w-full",
        aspectMap[aspect],
        className
      )}
    >
      {/* Corner marks for editorial framing */}
      <span className="corner-mark border-t border-l top-4 left-4" />
      <span className="corner-mark border-t border-r top-4 right-4" />
      <span className="corner-mark border-b border-l bottom-4 left-4" />
      <span className="corner-mark border-b border-r bottom-4 right-4" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
        {index && (
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70 mb-6">
            {index}
          </span>
        )}
        <span
          className="text-muted-foreground/70 text-sm sm:text-base max-w-md"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
