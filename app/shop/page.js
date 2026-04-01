"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

const products = [
  { id: 1, name: "Sapphire Sterling Pendant", price: "$249", image: "/images/WhatsApp Image 2026-03-31 at 2.19.57 PM (1).jpeg" },
  { id: 2, name: "Emerald Silver Charm", price: "$299", image: "/images/WhatsApp Image 2026-03-31 at 2.19.57 PM.jpeg" },
  { id: 3, name: "Ruby Teardrop Pendant", price: "$325", image: "/images/WhatsApp Image 2026-03-31 at 2.19.58 PM (1).jpeg" },
  { id: 4, name: "Amethyst Silver Knot", price: "$180", image: "/images/WhatsApp Image 2026-03-31 at 2.19.58 PM (2).jpeg" },
  { id: 5, name: "Crystal Prism Pendant", price: "$210", image: "/images/WhatsApp Image 2026-03-31 at 2.19.58 PM.jpeg" },
  { id: 6, name: "Obsidian Hex Pendant", price: "$275", image: "/images/WhatsApp Image 2026-03-31 at 2.19.59 PM (1).jpeg" },
  { id: 7, name: "Topaz Silver Oval", price: "$195", image: "/images/WhatsApp Image 2026-03-31 at 2.19.59 PM (2).jpeg" },
  { id: 8, name: "Turquoise Artisan Round", price: "$160", image: "/images/WhatsApp Image 2026-03-31 at 2.19.59 PM.jpeg" },
  { id: 9, name: "Garnet Silver Square", price: "$230", image: "/images/WhatsApp Image 2026-03-31 at 2.20.00 PM (1).jpeg" },
  { id: 10, name: "Peridot Silver Star", price: "$145", image: "/images/WhatsApp Image 2026-03-31 at 2.20.00 PM.jpeg" },
];

export default function Shop() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <main className="pb-24 pt-32 min-h-screen">
      <div className="container">
        <header className="mb-20 text-center max-w-2xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="text-[10px] uppercase tracking-[0.4em] text-silver-mid mb-4 block">Limited Editions</span>
            <h1 className="text-5xl md:text-7xl mb-6">The <span className="text-silver">Collection</span></h1>
            <div className="w-24 h-px bg-silver-mid mx-auto mb-8 opacity-30" />
            <p className="text-muted font-light leading-relaxed">
              Discover our handcrafted sterling silver pendants, where each piece is a geometric exploration of light and form.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              {...fadeIn}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden relative glass mb-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <button className="w-10 h-10 glass flex-center rounded-full hover:bg-white/10 transition-colors">
                    <Heart size={16} className="text-silver-bright" />
                  </button>
                  <button className="w-10 h-10 glass flex-center rounded-full hover:bg-white/10 transition-colors">
                    <ShoppingCart size={16} className="text-silver-bright" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start px-1">
                <div>
                  <h3 className="text-sm uppercase tracking-widest mb-1 group-hover:text-silver-bright transition-colors">{product.name}</h3>
                  <p className="text-[10px] text-muted tracking-[0.2em] uppercase">925 Sterling Silver</p>
                </div>
                <p className="text-silver-bright font-serif text-lg">{product.price}</p>
              </div>
              
              <button className="btn-premium w-full mt-6 py-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .gap-8 { gap: 2rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-20 { margin-bottom: 5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mt-6 { margin-top: 1.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .pb-24 { padding-bottom: 6rem; }
        .pt-32 { padding-top: 8rem; }
        .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
        .min-h-screen { min-height: 100vh; }
        .aspect-\[4\/5\] { aspect-ratio: 4 / 5; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .flex { display: flex; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .flex-col { flex-direction: column; }
        .gap-2 { gap: 0.5rem; }
        .w-10 { width: 2.5rem; }
        .h-10 { height: 2.5rem; }
        .w-24 { width: 6rem; }
        .h-px { height: 1px; }
        .rounded-full { border-radius: 9999px; }
        .overflow-hidden { overflow: hidden; }
        .object-cover { object-fit: cover; }
        
        @media (min-width: 640px) {
          .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (min-width: 1280px) {
          .xl\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
    </main>
  );
}
