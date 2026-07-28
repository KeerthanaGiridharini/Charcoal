"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/data";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reservations", href: "#reservations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0E1020]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => scrollToSection(e, "#top")}
          >
            <div className="w-10 h-10 rounded-full border border-[#BA8060]/40 flex items-center justify-center bg-[#231F62]/40 group-hover:border-[#BA8060] transition-colors duration-300">
              <span className="font-serif font-bold text-lg text-[#BA8060]">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold tracking-[0.25em] text-xl text-white group-hover:text-[#BA8060] transition-colors duration-300">
                CHARCOAL
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 -mt-1 font-sans">
                Fine Dining
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/10 p-1.5 rounded-full backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[#231F62]/80 border border-[#BA8060]/50 rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#reservations"
              onClick={(e) => scrollToSection(e, "#reservations")}
              className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-[#BA8060] text-[#0E1020] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,128,96,0.5)] hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full border border-white/10 bg-white/5 text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E1020]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.1 }}
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="font-serif text-3xl text-white/90 hover:text-[#BA8060] transition-colors border-b border-white/5 pb-4 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#BA8060]">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <a
                href="#reservations"
                onClick={(e) => scrollToSection(e, "#reservations")}
                className="w-full py-4 text-center rounded-full bg-[#BA8060] text-[#0E1020] font-semibold text-xs uppercase tracking-[0.2em]"
              >
                Reserve a Table
              </a>
              <div className="text-center text-xs text-white/40 font-sans tracking-widest pt-2">
                {RESTAURANT_INFO.address}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
