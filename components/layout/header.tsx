"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MegaMenu } from "./mega-menu";
import SearchBar from "@/components/search-bar";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/contact-modal/useContactModal";
import { ContactForm } from "@/components/contact-modal/ContactForm";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/security", label: "Security" },
  { href: "/integrations", label: "Integrations" },
  { href: "/roi-estimator", label: "ROI" },
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href !== "/" && (pathname === href || pathname.startsWith(href + "/"));

  const { open } = useContactModal();
  const openContact = () => open(<ContactForm />, "Contact us");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSolutions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  };

  const closeSolutions = () => {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 140);
  };

  const closeSolutionsImmediate = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolutionsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!solutionsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSolutionsImmediate();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [solutionsOpen, closeSolutionsImmediate]);

  useEffect(() => {
    if (!solutionsOpen) return;
    const menu = document.getElementById("solutions-menu");
    if (!menu) return;
    const firstFocusable = menu.querySelector<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }, [solutionsOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/6" : "bg-transparent",
      )}
      style={scrolled ? {
        background: "linear-gradient(155deg, rgba(7,13,11,0.97) 0%, rgba(4,9,8,0.99) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      } : undefined}
    >
      <div className="max-w-none mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
          <span className="text-white font-bold text-lg tracking-tight">
            RCM
            <span
              className="transition-colors"
              style={{ color: "var(--brand)" }}
            >
              Kit
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-0.5 flex-1 justify-center"
          aria-label="Main navigation"
        >
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-2 text-sm transition-colors duration-150 rounded-md",
                isActive(link.href)
                  ? "text-white bg-white/[0.08]"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Solutions mega-menu */}
          <div
            ref={solutionsRef}
            className="relative"
            onMouseEnter={openSolutions}
            onMouseLeave={closeSolutions}
          >
            <button
              ref={triggerRef}
              className={cn(
                "flex items-center gap-1 px-3.5 py-2 text-sm transition-colors duration-150 rounded-md",
                solutionsOpen || isActive("/solutions")
                  ? "text-white bg-white/6"
                  : "text-zinc-400 hover:text-white hover:bg-white/5",
              )}
              aria-expanded={solutionsOpen}
              aria-haspopup="dialog"
              aria-controls="solutions-menu"
              onClick={() => (solutionsOpen ? closeSolutionsImmediate() : openSolutions())}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  openSolutions();
                }
              }}
            >
              Solutions
              <motion.span
                animate={{ rotate: solutionsOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.span>
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.985,
                    transition: { duration: 0.14 },
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <MegaMenu
                    onClose={closeSolutionsImmediate}
                    onMouseEnter={openSolutions}
                    onMouseLeave={closeSolutions}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-2 text-sm transition-colors duration-150 rounded-md",
                isActive(link.href)
                  ? "text-white bg-white/[0.08]"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <SearchBar />
          <button onClick={openContact} className="btn-nav">
            Contact →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:hidden overflow-hidden bg-[#0d0d10] border-t border-white/6"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm py-2.5 px-3 rounded-lg transition-colors",
                    isActive(link.href)
                      ? "text-white bg-white/[0.08]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/solutions"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm py-2.5 px-3 rounded-lg transition-colors",
                  isActive("/solutions")
                    ? "text-white bg-white/[0.08]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                Solutions
              </Link>
              <div className="pt-3">
                <button
                  onClick={() => { openContact(); setMobileOpen(false); }}
                  className="block text-center btn-nav w-full rounded-lg!"
                >
                  Contact →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
