"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1.5rem 0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '500', fontFamily: 'var(--font-serif)', letterSpacing: '0.1em' }}>
          AURA<span style={{ color: 'var(--silver)' }}>SILVER</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }} className="desktop-menu">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '2rem' }}>
            <ShoppingBag size={20} style={{ cursor: 'pointer', color: 'var(--silver)' }} />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer', zIndex: 1101 }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        style={{
          display: isOpen ? 'flex' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 10, 12, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 1100,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem'
        }}
      >
        <Link href="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/shop" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Shop</Link>
        <Link href="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
      </motion.div>

      <style jsx>{`
        .nav-link {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--silver);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: var(--silver);
        }
        .nav-link:hover:after {
          width: 100%;
        }
        .mobile-nav-link {
          font-size: 1.8rem;
          font-family: var(--font-serif);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
