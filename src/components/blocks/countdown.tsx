import type { Countdown as CountdownType } from "@/sanity/types";
import { useCountdown } from "@/hooks/use-countdown";
import { PortableText } from "@portabletext/react";
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

function formatTargetDate(targetDateTime: string, timeZone: string) {
  const target = new Date(targetDateTime);

  if (Number.isNaN(target.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-NZ", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  }).format(target);
}

function CountdownUnit({ value, label }: UnitProps) {
  const formatted = numberFormatter.format(value);

  return (
    <div className="bg-background flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border px-3 py-4 md:px-5 md:py-6">
      <span className="sr-only">
        {value} {label}
      </span>
      <span
        key={formatted}
        aria-hidden="true"
        className="animate-countdown-change text-4xl font-bold tracking-tight tabular-nums md:text-6xl"
      >
        {formatted}
      </span>
      <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase md:text-sm">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ block }: CountdownProps) {
  const countdown = useCountdown(block.targetDateTime);
  const timeZone = block.timeZone ?? "Pacific/Auckland";
  const targetLabel = formatTargetDate(block.targetDateTime, timeZone);
  const title =
    countdown.isExpired && block.expiredText ? block.expiredText : block.title;

  return (
    <section className="bg-muted/30">
      <div className="container flex flex-col items-center gap-8 py-12 text-center md:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-balance md:text-5xl">
            {title}
          </h2>

          {block.text && (
            <div className="prose prose-lg max-w-none text-balance">
              <PortableText value={block.text} />
            </div>
          )}

          {targetLabel && (
            <p className="text-muted-foreground text-sm">
              Counting down to {targetLabel}
            </p>
          )}
        </div>

        <div
          className="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
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
            className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            {block.link.text}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
