import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  light?: boolean;
}

/** Original Mico Farm mark: a sprout growing from a gentle hill / leaf cup. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.12" />
      <path
        d="M10 33c4-6 10-8 14-8s10 2 14 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M24 27V15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M24 19c0-5-3.5-8-9-8 0 5 3.5 8 9 8Z"
        fill="currentColor"
      />
      <path
        d="M24 16c0-5 3.5-8 9-8 0 5-3.5 8-9 8Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export default function Logo({ className, light }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", light ? "text-white" : "text-forest", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="font-heading leading-none">
        <span className="block text-[1.35rem] font-extrabold tracking-tight">Mico Farm</span>
        <span className={cn("block text-[0.6rem] font-medium uppercase tracking-[0.28em]", light ? "text-white/70" : "text-leaf")}>
          Agribisnis & Peternakan
        </span>
      </span>
    </span>
  );
}
