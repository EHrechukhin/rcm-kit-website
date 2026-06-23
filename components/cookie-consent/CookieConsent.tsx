"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "./useCookieConsent";

export function CookieConsent() {
  const { shown, acceptAll, declineAll } = useCookieConsent();

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-[200] w-[calc(100%-2rem)] max-w-md -translate-x-1/2"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div
            className="rounded-2xl overflow-hidden p-5"
            style={{
              background: "linear-gradient(155deg, rgba(26,26,32,0.98) 0%, rgba(18,18,24,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand,var(--primary))]/10 text-[var(--brand,var(--primary))]">
                <Cookie className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  We use cookies
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  We use cookies to improve your experience and analyze site
                  traffic. Read our{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={declineAll}
              >
                Essential only
              </Button>
              <Button
                variant="brand"
                size="sm"
                className="flex-1"
                onClick={acceptAll}
              >
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
