"use client";

import type { Countdown } from "@/sanity/types";
import { useCountdown } from "@/hooks/use-countdown";
import { Card } from "../ui/card";

export type CountdownProps = {
  block: Countdown;
};

export function Countdown({ block }: CountdownProps) {
  const { timeLeft, isCompleted } = useCountdown({
    endDateTime: block.endDateTime,
  });

  if (isCompleted) {
    return null;
  }

  return (
    <section>
      <div className="container space-y-8 py-8 text-center">
        {block.title && (
          <h3 className="font-medium text-balance">{block.title}</h3>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <CountdownItem label="Days" value={timeLeft.days} />
          <CountdownItem label="Hours" value={timeLeft.hours} />
          <CountdownItem label="Minutes" value={timeLeft.minutes} />
          <CountdownItem label="Seconds" value={timeLeft.seconds} />
        </div>
      </div>
    </section>
  );
}

function CountdownItem({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <div className="flex flex-col items-center gap-1">
        <div className="text-4xl font-bold" suppressHydrationWarning>
          {value}
        </div>
        <div className="text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}
