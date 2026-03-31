"use client";
import ThreeDPreview from "@/components/ThreeDPreview";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem', zIndex: 10 }}>
          <div className="reveal">
            <h1 style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '2rem' }}>
              Timeless <br />
              <span className="text-silver">Elegance</span>
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem', maxWidth: '500px', lineHeight: '1.6' }}>
              Handcrafted in pure .925 sterling silver, our pendants feature rare gemstones that capture the essence of light and grace.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/shop" className="btn-premium">Explore Collection</Link>
              <Link href="/about" style={{ alignSelf: 'center', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.7 }}>Our Story</Link>
            </div>
          </div>
        </div>
        
        {/* 3D Model Container */}
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '60%', height: '80vh', zIndex: 1 }}>
          <ThreeDPreview />
        </div>
      </section>

      {/* Featured Quote */}
      <section className="section-padding" style={{ background: '#070708' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            "Jewelry is the exclamation point of a woman's outfit."
          </h2>
          <p style={{ marginTop: '2rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.9rem', color: 'var(--silver)' }}>— Tamara Mellon</p>
        </div>
      </section>

      {/* Materials Showcase */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div className="glass" style={{ height: '500px', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              {/* Using one of the provided images for focus */}
              <img 
                src="/images/WhatsApp Image 2026-03-31 at 2.19.59 PM (1).jpeg" 
                alt="Craftsmanship" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>The <span className="text-silver">Art</span> of Silver</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.7, lineHeight: '1.8', marginBottom: '2rem' }}>
                Every piece in our collection is forged from pure silver, meticulously polished to achieve a mirror-like finish that reflects the quality of our craftsmanship.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ width: '30px', height: '1px', background: 'var(--silver)' }}></span>
                  <span>925 Sterling Silver Guarantee</span>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ width: '30px', height: '1px', background: 'var(--silver)' }}></span>
                  <span>Ethically Sourced Real Gemstones</span>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ width: '30px', height: '1px', background: 'var(--silver)' }}></span>
                  <span>Artisan Handcrafted in Small Batches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          animation: slideUp 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        @media (max-width: 992px) {
          section { height: auto !important; padding: 10rem 0 5rem 0 !important; }
          .container { grid-template-columns: 1fr !important; gap: 4rem !important; }
          h1 { fontSize: 3.5rem !important; }
          div[style*="position: absolute"] { position: relative !important; width: 100% !important; height: 50vh !important; right: 0 !important; top: 0 !important; transform: none !important; }
        }
      `}</style>
    </main>
  );
}
