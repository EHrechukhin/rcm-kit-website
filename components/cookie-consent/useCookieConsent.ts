"use client";

import { useEffect, useState } from "react";
import type { ConsentState } from "./cookie-consent.types";

const STORAGE_KEY = "cookie-consent";

export function useCookieConsent() {
  const [shown, setShown] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShown(true);
    } else {
      setConsent(JSON.parse(stored));
    }
  }, []);

  function acceptAll() {
    const state: ConsentState = { analytics: true, marketing: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setConsent(state);
    setShown(false);
  }

  function declineAll() {
    const state: ConsentState = { analytics: false, marketing: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setConsent(state);
    setShown(false);
  }

  return { shown, consent, acceptAll, declineAll };
}
