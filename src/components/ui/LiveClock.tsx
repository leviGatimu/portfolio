"use client";

import { useEffect, useState } from "react";

/** "HH:MM:SS" for a fixed UTC offset. SSR renders a placeholder. */
function cityTime(utcOffset: number) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + utcOffset * 3600000).toLocaleTimeString("en-GB");
}

export default function LiveClock({
  utcOffset,
  className,
}: {
  utcOffset: number;
  className?: string;
}) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTime(cityTime(utcOffset));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  );
}
