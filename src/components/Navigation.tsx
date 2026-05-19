import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Mail, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Thinking", href: "/thinking", isRoute: true },
  { label: "Experiments", href: "/experiments", isRoute: true },
  { label: "Contact", href: "/#contact" },
];

interface NavigationProps {
  variant?: "transparent" | "solid";
}

export default function Navigation({ variant = "transparent" }: NavigationProps) {
  return (
    <nav
      className={cn(
        "relative z-20 flex flex-row justify-between items-center px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto",
        variant === "solid" && "bg-background/40 backdrop-blur-md"
      )}
    >
      <Link to="/" className="flex flex-col leading-none group min-w-0">
        <span
          className="text-2xl sm:text-3xl tracking-tight text-foreground leading-none truncate"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Dhavala Sourabh
        </span>
        <span className="text-[10px] sm:text-xs tracking-wide text-muted-foreground uppercase mt-1">
          dsignosour
        </span>
      </Link>

      <div className="hidden md:flex flex-row gap-8">
        {NAV_LINKS.map((link) =>
          'isRoute' in link && link.isRoute ? (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          )
        )}
      </div>

      <div className="flex flex-row items-center gap-2 sm:gap-3 shrink-0">
        <a
          href="mailto:srbhdhavala@gmail.com"
          aria-label="Email"
          className="liquid-glass rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-foreground hover:scale-[1.03] transition-transform duration-300 shrink-0"
        >
          <Mail size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/dhavala-sourabh/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="liquid-glass rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-foreground hover:scale-[1.03] transition-transform duration-300 shrink-0"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://wa.link/tf9g4j"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 whitespace-nowrap shrink-0"
        >
          Say Hi
        </a>
      </div>
    </nav>
  );
}
