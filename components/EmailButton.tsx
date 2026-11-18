"use client";

import { useState } from "react";

// mailto: links silently do nothing when the visitor has no mail app set up.
// So: copy the address (works for everyone) and open a Gmail draft in a new tab.
export function EmailButton({ email, className, children }: { email: string; className?: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Hi Jeevan")}`;

  async function onClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard can be blocked; the Gmail tab still opens */
    }
  }

  return (
    <a className={className} href={gmail} target="_blank" rel="noopener" onClick={onClick} title={`Email ${email}`}>
      {copied ? "✓ Address copied" : children}
    </a>
  );
}

// Small "copy" link next to the plain email address.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
