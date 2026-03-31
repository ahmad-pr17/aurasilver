import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MetaPixel from "@/components/MetaPixel";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aura Silver | Pure Silver & Real Gemstone Pendants",
  description: "Exquisite handcrafted silver pendants featuring real gemstones. Modern elegance for the sophisticated soul.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <Suspense fallback={null}>
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        </Suspense>
        <Navbar />
        {children}
        <footer className="glass section-padding" style={{ borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 style={{ letterSpacing: '0.2rem' }}>AURA SILVER</h2>
            <div style={{ display: 'flex', gap: '2rem', opacity: 0.7 }}>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
            <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>© 2026 Aura Silver. Handcrafted with precision.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
