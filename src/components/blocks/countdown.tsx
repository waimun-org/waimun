import type { Countdown as CountdownType } from "@/sanity/types";
import { useCountdown } from "@/hooks/use-countdown";
import { ArrowRightIcon } from "lucide-react";

type CountdownProps = {
  block: CountdownType;
};

type UnitProps = {
  value: number;
  label: string;
};

const numberFormatter = new Intl.NumberFormat("en-NZ", {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0,
});

function CountdownUnit({ value, label }: UnitProps) {
  const formatted = numberFormatter.format(value);

  return (
    <div className="bg-background flex min-w-0 flex-col items-center justify-center gap-1 rounded-md border py-3 md:py-4">
      <span className="sr-only">
        {value} {label}
      </span>
      <span
        aria-hidden="true"
        className="text-2xl font-semibold tabular-nums md:text-3xl"
      >
        {formatted}
      </span>
      <span className="text-muted-foreground text-xs uppercase">{label}</span>
    </div>
  );
}

export function Countdown({ block }: CountdownProps) {
  const countdown = useCountdown(block.date);

  if (countdown.isExpired) {
    return null;
  }

  return (
    <section className="bg-muted/30">
      <div className="container flex flex-col items-center gap-3 py-6 text-center md:py-8">
        <p className="text-sm font-medium text-balance md:text-base">
          {block.title}
        </p>

        <div
          className="grid w-full max-w-md grid-cols-4 gap-2 md:gap-3"
          aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds remaining`}
        >
          <CountdownUnit value={countdown.days} label="days" />
          <CountdownUnit value={countdown.hours} label="hours" />
          <CountdownUnit value={countdown.minutes} label="mins" />
          <CountdownUnit value={countdown.seconds} label="secs" />
        </div>

        {block.link && (
          <a
            href={block.link.url}
            target={block.link.url.startsWith("http") ? "_blank" : undefined}
            rel={block.link.url.startsWith("http") ? "noreferrer" : undefined}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium underline-offset-4 hover:underline"
          >
            {block.link.text}
            <ArrowRightIcon className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
