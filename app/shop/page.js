"use client";
import { motion } from "framer-motion";

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
  return (
    <main className="section-padding" style={{ background: '#0a0a0c' }}>
      <div className="container" style={{ marginTop: '4rem' }}>
        <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>The <span className="text-silver">Collection</span></h1>
          <p style={{ opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Discover our handcrafted sterling silver pendants</p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2.5rem',
          gridAutoFlow: 'dense'
        }}>
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
              className="glass"
              style={{ padding: '1rem', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative', background: '#121214', borderRadius: '2px' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '400' }}>{product.name}</h3>
                  <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.1em' }}>PURE SILVER .925</p>
                </div>
                <p style={{ color: 'var(--silver)', fontWeight: '500' }}>{product.price}</p>
              </div>
              <button 
                className="btn-premium" 
                style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem', fontSize: '0.7rem' }}
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
