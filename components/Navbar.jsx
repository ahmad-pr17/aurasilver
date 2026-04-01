"use client";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className={`container mx-auto transition-all duration-500 ${
        scrolled ? 'glass py-3 px-8' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium tracking-wider font-serif hover:opacity-80 transition-all">
            AURA<span className="text-silver">SILVER</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md-flex items-center gap-12">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-6 ml-4 border-l border-glass-border pl-8">
              <div className="relative group cursor-pointer">
                <ShoppingBag size={20} className="text-silver-mid group-hover:text-foreground transition-all" />
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md-hidden cursor-pointer z-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-overlay z-overlay flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link 
                  href={link.href} 
                  className="text-4xl font-serif tracking-widest uppercase hover:text-silver transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .border-glass-border {
          border-color: var(--glass-border);
        }
        @media (min-width: 768px) {
          .pl-8 { padding-left: 2rem; }
          .border-l { border-left: 1px solid; }
        }
        .nav-link {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--silver-mid);
          transition: all 0.3s ease;
          position: relative;
          font-weight: 500;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          width: 0;
          height: 1px;
          background: var(--silver-bright);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(-50%);
        }
        .nav-link:hover {
          color: var(--foreground);
        }
        .nav-link:hover:after {
          width: 24px;
        }
      `}</style>
    </nav>
  );
}
