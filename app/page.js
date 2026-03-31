"use client";
import ThreeDPreview from "@/components/ThreeDPreview";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity and movement for text elements based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  const detailOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const detailX = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);

  const landingOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const landingY = useTransform(scrollYProgress, [0.8, 0.95], [50, 0]);

  return (
    <main style={{ position: 'relative', height: '300vh' }}>
      {/* Fixed 3D Canvas Background */}
      <ThreeDPreview />

      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, paddingLeft: '1rem' }}
          className="container"
        >
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: '1', marginBottom: '1.5rem', fontWeight: '500' }}>
            Pure Light <br />
            <span className="text-silver">Pure Silver</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.7, maxWidth: '550px', lineHeight: '1.7', fontWeight: '300' }}>
            A masterpiece of refractive geometry, handcrafted to capture every ray of light.
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ marginTop: '4rem', fontSize: '0.7rem', letterSpacing: '0.3rem', opacity: 0.4, textTransform: 'uppercase' }}
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* Detail Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: detailOpacity, x: detailX, paddingRight: '2rem', textAlign: 'right' }}
          className="container"
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Precision <br /><span className="text-silver">Faceting</span>
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.6, maxWidth: '420px', marginLeft: 'auto', lineHeight: '1.9', fontWeight: '300' }}>
            Each gemstone is cut with high-segment precision, creating a complex internal structure that bends light with pure brilliance.
          </p>
        </motion.div>
      </section>

      {/* Final Landing Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: landingOpacity, y: landingY, paddingLeft: '1rem' }}
          className="container"
        >
          <div className="glass" style={{ padding: '3.5rem', maxWidth: '550px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '1.2rem', fontWeight: '500' }}>Aura <span className="text-silver">Teardrop</span></h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', lineHeight: '1.8', fontWeight: '300' }}>
              Hand-forged .925 Sterling Silver meets a brilliant-cut deep sapphire gemstone. A timeless exclamation point for your collection.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <Link href="/shop" className="btn-premium">Purchase Piece</Link>
              <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--silver)', letterSpacing: '0.05em' }}>$345</div>
            </div>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        body {
          overflow-x: hidden;
          background: #0a0a0c;
        }
        .text-silver {
          background: linear-gradient(
            to bottom,
            #ffffff 0%,
            #f0f0f0 15%,
            #999999 45%,
            #ffffff 50%,
            #888888 55%,
            #e0e0e0 85%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
      `}</style>
    </main>
  );
}
