import { useCountdown } from "@/hooks/use-countdown";
import type { Countdown as CountdownType } from "@/sanity/types";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CountdownProps = {
  block: CountdownType;
};

type UnitProps = {
  value: number | null;
  label: string;
};

const numberFormatter = new Intl.NumberFormat("en-NZ", {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0,
});

function CountdownUnit({ value, label }: UnitProps) {
  const formatted = value === null ? "--" : numberFormatter.format(value);

  return (
    <div className="bg-background flex min-w-0 flex-col items-center justify-center gap-1 rounded-md border py-3 md:py-4">
      <span className="sr-only">
        {value === null ? "Loading" : `${value} ${label}`}
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
  const [mounted, setMounted] = useState(false);
  const countdown = useCountdown(block.date);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (countdown.isExpired && mounted) {
    return null;
  }

  return (
    <section className="bg-muted">
      <div className="container flex flex-col items-center gap-3 py-6 text-center md:py-8">
        <p className="text-base font-medium text-balance md:text-lg">
          {block.title}
        </p>

        <div
          className="grid w-full max-w-md grid-cols-4 gap-2"
          aria-label={
            mounted
              ? `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds remaining`
              : "Countdown loading"
          }
        >
          <CountdownUnit value={mounted ? countdown.days : null} label="days" />
          <CountdownUnit
            value={mounted ? countdown.hours : null}
            label="hours"
          />
          <CountdownUnit
            value={mounted ? countdown.minutes : null}
            label="mins"
          />
          <CountdownUnit
            value={mounted ? countdown.seconds : null}
            label="secs"
          />
        </div>

        {block.link && (
          <Button variant="link" asChild>
            <a
              href={block.link.url}
              target={block.link.url.startsWith("http") ? "_blank" : undefined}
              rel={block.link.url.startsWith("http") ? "noreferrer" : undefined}
            >
              {block.link.text}
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}
