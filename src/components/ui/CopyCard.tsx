"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCardProps {
  label: string;
  value: string;
  copyText: string;
}

/** Click-to-copy contact card with a confirmation state. */
export default function CopyCard({ label, value, copyText }: CopyCardProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — leave the card as-is
    }
  };

  return (
    <button
      onClick={onCopy}
      className="group flex flex-col gap-3 border border-border bg-surface p-6 text-left transition-colors hover:border-fg"
    >
      <span className="mono-label text-muted">{label}</span>
      <span className="flex items-center justify-between gap-3">
        <span className="truncate text-base text-fg md:text-lg">{value}</span>
        {copied ? (
          <Check size={16} strokeWidth={1.5} className="shrink-0 text-accent-ink" />
        ) : (
          <Copy
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-muted transition-colors group-hover:text-fg"
          />
        )}
      </span>
      <span className="mono-label text-accent-ink">
        {copied ? "COPIED ✓" : "CLICK TO COPY"}
      </span>
    </button>
  );
}
