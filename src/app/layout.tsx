import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/navigation/BottomNav";

export const metadata: Metadata = {
  title: "TransitPulse",
  description: "Real-time transit info for your commute",
  // TODO: Add manifest, icons, and og:image for PWA/share previews
};

export const viewport: Viewport = {
  // Mobile-first viewport. Inputs use font-size ≥ 16px to prevent iOS auto-zoom.
  width: "device-width",
  initialScale: 1,
  // Support iOS safe areas (notch, home indicator)
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-50 dark:bg-slate-950 font-sans">
        {/* Max-width container centers content on large screens while keeping mobile full-width */}
        <div className="relative mx-auto max-w-md min-h-screen bg-white dark:bg-slate-900 shadow-sm">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
