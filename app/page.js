"use client";
import ThreeDPreview from "@/components/ThreeDPreview";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Diamond } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity and movement for text elements based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  
  const detailOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 1, 0]);
  const detailX = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);

  const landingOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const landingY = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  // 3D Model stays fully visible behind the footer
  const canvasOpacity = 1;

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <main className="relative bg-background">
      {/* 3D Model Container - Fixed & Behind everything */}
      <motion.div style={{ opacity: canvasOpacity }}>
        <ThreeDPreview scrollProgress={scrollYProgress} />
      </motion.div>

      <div className="h-300vh relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section className="h-screen flex items-center pt-32 relative pointer-events-auto">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="container"
          >
            <h1 className="hero-title mb-8">
              Pure Light <br />
              <span className="text-silver">Pure Silver</span>
            </h1>
            <p className="text-lg md-text-xl text-muted max-w-xl leading-relaxed font-light mb-12">
              A masterpiece of refractive geometry, handcrafted to capture every ray of light. Minimalist design meets maximum brilliance.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="text-xs tracking-cinematic text-silver-mid uppercase"
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </section>

        {/* Detail Section */}
        <section className="h-screen flex items-center justify-end relative pointer-events-auto text-right">
          <motion.div 
            style={{ opacity: detailOpacity, x: detailX }}
            className="container"
          >
            <h2 className="detail-title mb-6">
              Precision <br /><span className="text-silver">Faceting</span>
            </h2>
            <p className="text-lg text-muted max-w-md ml-auto leading-relaxed font-light">
              Each gemstone is cut with high-segment precision, creating a complex internal structure that bends light with pure brilliance.
            </p>
          </motion.div>
        </section>

        {/* Final Landing Section */}
        <section className="h-screen flex items-center relative pointer-events-auto">
          <motion.div 
            style={{ opacity: landingOpacity, y: landingY }}
            className="container"
          >
            <div className="glass p-12 md-p-20 max-w-2xl border border-glass-border">
              <h2 className="text-4xl md-text-6xl mb-6">Aura <span className="text-silver">Teardrop</span></h2>
              <p className="text-lg text-muted mb-12 leading-relaxed font-light">
                Hand-forged .925 Sterling Silver meets a brilliant-cut deep sapphire gemstone. A timeless exclamation point for your collection.
              </p>
              <div className="flex flex-col sm-flex-row gap-10 items-start sm-items-center">
                <Link href="/shop" className="btn-premium">
                  Purchase Piece
                </Link>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-silver-mid mb-1">Elite Edition</span>
                  <span className="text-3xl text-silver">$345.00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Craftsmanship Section */}
      <section className="section-padding bg-accent relative z-20">
        <div className="container">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl mb-6">Crafted for <span className="text-silver">Eternity</span></h2>
            <p className="text-muted text-lg font-light">
              We don't just make jewelry; we engineer light. Our process combines ancient smithing techniques with modern geometric calculations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Pure .925 Silver", desc: "Sourced from ethical mines and refined to the highest purity standards for lasting shine." },
              { icon: Diamond, title: "Precision Cut", desc: "Every facet is measured to the micron to ensure optimal light refraction and brilliance." },
              { icon: Zap, title: "Lifelong Warranty", desc: "A masterpiece deserves protection. We stands by every piece with a lifetime guarantee." }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="glass p-10 hover-bg-white-5 transition-all group"
              >
                <feature.icon className="w-10 h-10 mb-8 text-silver-mid group-hover-silver transition-all" />
                <h3 className="text-xl mb-4 uppercase tracking-wider font-medium">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .h-300vh { height: 300vh; }
        .hero-title { font-size: clamp(3.5rem, 10vw, 7rem); line-height: 0.9; }
        .detail-title { font-size: clamp(2.5rem, 8vw, 5rem); line-height: 1.1; }
        .border-glass-border { border-color: var(--glass-border); }
        .bg-accent { background-color: rgba(26, 26, 28, 0.3); }
        .hover-bg-white-5:hover { background-color: rgba(255, 255, 255, 0.05); }
        .group:hover .group-hover-silver { color: var(--silver-pure); }
        .group:hover .group-hover-translate-x { transform: translateX(4px); }
        .aspect-3-4 { aspect-ratio: 3 / 4; }
        .group-hover-scale:hover { transform: scale(1.1); }
        .bg-overlay-transparent { background-color: rgba(0, 0, 0, 0.2); }
        .group-hover-bg-transparent:hover { background-color: transparent; }
        .object-cover { object-fit: cover; }
      `}</style>
    </main>
  );
}
