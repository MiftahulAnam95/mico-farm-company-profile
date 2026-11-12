import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light,
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          data-reveal
          className={cn("eyebrow mb-5", align === "center" && "justify-center", light && "text-sage before:bg-sage")}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        data-reveal
        data-delay="0.08"
        className={cn(
          "text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          data-reveal
          data-delay="0.16"
          className={cn("mt-6 text-base leading-relaxed sm:text-lg", light ? "text-white/80" : "text-charcoal/70")}
        >
          {description}
        </p>
      )}
    </div>
  );
}
