import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CookieConsent } from "@/components/cookie-consent/CookieConsent";
import { ContactModalProvider } from "@/components/contact-modal/useContactModal";
import { ContactModal } from "@/components/contact-modal/ContactModal";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "RCM Kit — AI Revenue Cycle Management",
  description:
    "18 AI agents purpose-built for healthcare revenue cycle management. Automate payment posting, denials, A/R follow-up, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0d0d10] text-[var(--foreground)]">
        <ThemeProvider>
          <ContactModalProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <ThemeSwitcher />
            <ContactModal />
          </ContactModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
