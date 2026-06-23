import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/security", label: "Security" },
  { href: "/integrations", label: "Integrations" },
  { href: "/roi-estimator", label: "ROI Estimator" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] text-zinc-500 text-sm">
      <div className="max-w-none mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-white font-bold text-base tracking-tight">
            RCM<span style={{ color: "var(--brand)" }}>Kit</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            18 AI agents purpose-built for healthcare revenue cycle management.
          </p>
          <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-zinc-700">
            Human-in-the-loop · Auditable · Built for healthcare
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-700 mb-4">Product</p>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors duration-150">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-700 mb-4">Legal</p>
          <p className="text-xs leading-relaxed">
            ©{" "}
            <time dateTime="2026">2026</time> RCM Kit. All rights reserved.
          </p>
          <p className="text-xs leading-relaxed text-zinc-700">
            HIPAA-compliant infrastructure. SOC 2 Type II in progress.
          </p>
        </div>
      </div>
    </footer>
  );
}
