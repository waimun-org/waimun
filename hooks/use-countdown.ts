"use client";

import { useCallback, useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseCountdownOptions {
  endDateTime: string;
}

interface UseCountdownReturn {
  timeLeft: TimeLeft;
  isCompleted: boolean;
  totalTimeLeft: number;
}

export function useCountdown({
  endDateTime,
}: UseCountdownOptions): UseCountdownReturn {
  const calculateTimeLeft = useCallback((endDateTime: string): TimeLeft => {
    const endDate = new Date(endDateTime);
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, []);

  const initialTimeLeft = calculateTimeLeft(endDateTime);
  const initialIsCompleted =
    initialTimeLeft.days +
      initialTimeLeft.hours +
      initialTimeLeft.minutes +
      initialTimeLeft.seconds ===
    0;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  useEffect(() => {
    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(endDateTime);
      setTimeLeft(newTimeLeft);

      const total =
        newTimeLeft.days +
        newTimeLeft.hours +
        newTimeLeft.minutes +
        newTimeLeft.seconds;
      if (total === 0 && !isCompleted) {
        setIsCompleted(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDateTime, isCompleted, calculateTimeLeft]);

  const totalTimeLeft =
    timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds;

  return {
    timeLeft,
    isCompleted,
    totalTimeLeft,
  };
}
