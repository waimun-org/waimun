import { useEffect, useMemo, useState } from "react";

export type CountdownParts = {
  totalMilliseconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getCountdownParts(
  targetDateTime: string | Date,
  now = new Date(),
): CountdownParts {
  const target =
    targetDateTime instanceof Date ? targetDateTime : new Date(targetDateTime);
  const targetTime = target.getTime();
  const diff = Number.isNaN(targetTime)
    ? 0
    : Math.max(0, targetTime - now.getTime());

  return {
    totalMilliseconds: diff,
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    isExpired: diff === 0,
  };
}

export function useCountdown(targetDateTime: string | Date): CountdownParts {
  const targetTime = useMemo(
    () =>
      targetDateTime instanceof Date
        ? targetDateTime.getTime()
        : new Date(targetDateTime).getTime(),
    [targetDateTime],
  );

  const [parts, setParts] = useState(() =>
    getCountdownParts(new Date(targetTime)),
  );

  useEffect(() => {
    if (Number.isNaN(targetTime)) {
      setParts(getCountdownParts(new Date(Number.NaN)));
      return;
    }

    const update = () => setParts(getCountdownParts(new Date(targetTime)));
    update();

    const interval = window.setInterval(update, SECOND);
    return () => window.clearInterval(interval);
  }, [targetTime]);

  return parts;
}
