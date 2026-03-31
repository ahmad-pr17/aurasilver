"use client";
import ThreeDPreview from "@/components/ThreeDPreview";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity and movement for text elements based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  
  const detailOpacity = useTransform(scrollYProgress, [0.35, 0.65, 0.85], [0, 1, 0]);
  const detailY = useTransform(scrollYProgress, [0.35, 0.65], [100, 0]);

  const landingOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const landingY = useTransform(scrollYProgress, [0.75, 1], [100, 0]);

  return (
    <main style={{ position: 'relative', height: '300vh' }}>
      {/* Fixed 3D Canvas Background */}
      <ThreeDPreview />

      {/* Hero Section (0-100% scroll) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="container"
        >
          <h1 style={{ fontSize: '5.5rem', lineHeight: '1.05', marginBottom: '2rem' }}>
            Pure Light <br />
            <span className="text-silver">Pure Silver</span>
          </h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.8, maxWidth: '500px', lineHeight: '1.6' }}>
            A masterpiece of refractive geometry, handcrafted to capture every ray of light.
          </p>
          <div style={{ marginTop: '3rem', fontSize: '0.8rem', letterSpacing: '0.2rem', opacity: 0.5 }}>
            SCROLL TO EXPLORE
          </div>
        </motion.div>
      </section>

      {/* Detail Section (100-200% scroll) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: detailOpacity, y: detailY, textAlign: 'right' }}
          className="container"
        >
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Precision <br /><span className="text-silver">Faceting</span></h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '400px', marginLeft: 'auto', lineHeight: '1.8' }}>
            Each gemstone is cut with high-segment precision, creating a complex internal structure that bends light with pure brilliance.
          </p>
        </motion.div>
      </section>

      {/* Final Landing Section (200-300% scroll) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div 
          style={{ opacity: landingOpacity, y: landingY }}
          className="container"
        >
          <div className="glass" style={{ padding: '4rem', maxWidth: '500px', borderRadius: '4px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Aura <span className="text-silver">Teardrop</span></h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: '1.6' }}>
              Hand-forged .925 Sterling Silver meets a brilliant-cut deep sapphire gemstone.
            </p>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link href="/shop" className="btn-premium">Purchase Piece</Link>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--silver)' }}>$345</div>
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
          background: linear-gradient(135deg, #a0a0a0 0%, #ffffff 50%, #808080 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </main>
  );
}
