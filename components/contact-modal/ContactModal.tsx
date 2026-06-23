"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useContactModal } from "./useContactModal";

const ease = [0.16, 1, 0.3, 1] as const;

export function ContactModal() {
  const { isOpen, content, title, close } = useContactModal();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Centering wrapper */}
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={title ?? "Dialog"}
              className="relative w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, rgba(7,13,11,0.98) 0%, rgba(4,9,8,1) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 32px 90px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.3, ease }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.08]">
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {title ?? "Get in touch"}
                </p>
                <button
                  onClick={close}
                  className="p-1.5 -mr-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {content}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
