import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MetaPixel from "@/components/MetaPixel";
import { Suspense } from "react";
import Link from "next/link";
import { Instagram, Twitter, Send, Linkedin } from "lucide-react";

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
        <footer className="pt-24 pb-12 relative z-20 overflow-hidden">
          {/* Solid background background */}

          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

          <div className="container">
            <div className="grid grid-cols-1 md-grid-cols-12 gap-16 mb-20">
              {/* Brand Column */}
              <div className="md-col-span-4">
                <Link href="/" className="text-3xl font-serif tracking-widest mb-8 block group">
                  AURA<span className="text-silver group-hover-silver-bright transition-all">SILVER</span>
                </Link>
                <p className="text-muted leading-relaxed font-light mb-10 max-w-sm">
                  Engineering light through geometric precision. Each Aura Silver piece is a handcrafted fusion of .925 sterling silver and high-segment brilliant cut gemstones.
                </p>
                <div className="flex gap-6">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Linkedin, label: "Linkedin" }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="w-10 h-10 glass flex-center rounded-full hover-bg-white-10 transition-all text-silver-mid hover-text-silver-bright"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="md-col-span-2 md-col-start-6">
                <h4 className="text-xs uppercase tracking-cinematic font-medium mb-8 text-silver-bright">Collection</h4>
                <ul className="space-y-4 text-sm font-light text-muted">
                  <li><Link href="/shop" className="hover-text-silver transition-all">Limited Edition</Link></li>
                  <li><Link href="/shop" className="hover-text-silver transition-all">Geometric Series</Link></li>
                  <li><Link href="/shop" className="hover-text-silver transition-all">Custom Orders</Link></li>
                  <li><Link href="/about" className="hover-text-silver transition-all">Material Ethics</Link></li>
                </ul>
              </div>

              <div className="md-col-span-2">
                <h4 className="text-xs uppercase tracking-cinematic font-medium mb-8 text-silver-bright">House</h4>
                <ul className="space-y-4 text-sm font-light text-muted">
                  <li><Link href="/about" className="hover-text-silver transition-all">Philosophy</Link></li>
                  <li><Link href="/contact" className="hover-text-silver transition-all">Care Guide</Link></li>
                  <li><Link href="/contact" className="hover-text-silver transition-all">Concierge</Link></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="md-col-span-3">
                <h4 className="text-xs uppercase tracking-cinematic font-medium mb-8 text-silver-bright">Newsletter</h4>
                <p className="text-xs text-muted leading-loose mb-6 font-light uppercase tracking-widest">
                  Join for exclusive early access to new drops.
                </p>
                <form className="relative group">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="w-full bg-transparent border-b border-glass-border py-3 text-xs tracking-widest outline-none focus-border-silver transition-all placeholder-silver-mid/30"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-silver-mid hover-text-silver-bright transition-all">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-10 border-t border-glass-border/30 flex flex-col md-flex-row justify-between items-center gap-6">
              <p className="text-[10px] uppercase tracking-widest text-silver-mid/60">
                © 2026 AURA SILVER. CRAFTED BY HAND.
              </p>
              <div className="flex gap-10 text-[10px] uppercase tracking-widest text-silver-mid/60">
                <a href="#" className="hover-text-silver transition-all">Privacy</a>
                <a href="#" className="hover-text-silver transition-all">Terms</a>
                <a href="#" className="hover-text-silver transition-all">Shipping</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
