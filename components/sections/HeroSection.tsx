"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const emberParticles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      width: ((i * 3 + 2) % 4) + 2 + "px",
      height: ((i * 3 + 2) % 4) + 2 + "px",
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      duration: ((i * 7) % 6) + 6,
      delay: (i * 0.4) % 5,
    }));
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Slow Zoom & Parallax */}
      <div className="absolute inset-0 z-0 select-none">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=90"
            alt="CHARCOAL Michelin Star Interior Atmosphere"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
        </motion.div>

        {/* Multi-layered Gradient Overlays for Cinematic Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070811] via-[#0E1020]/60 to-[#231F62]/40" />
        <div className="absolute inset-0 bg-radial-hero opacity-90" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Floating Ember Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {emberParticles.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#BA8060]/40 blur-[1px]"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [-20, -120, -220],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center py-16">
        {/* Top Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#231F62]/60 border border-[#BA8060]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(186,128,96,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#BA8060]" />
          <span className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#E8D3C5]">
            Three Michelin Stars • Kyoto & Tokyo Heritage
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-white mb-6"
        >
          A Symphony of <br className="hidden sm:inline" />
          <span className="italic font-light text-gradient-gold">Binchotan & Omakase</span>
        </motion.h1>

        {/* Story Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="max-w-2xl text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed mb-10 tracking-wide"
        >
          Where 1,000°C Kishu white charcoal meets pristine Toyosu seafood and centuries of Japanese culinary artistry. Experience fine dining elevated to an immersive sensory journey.
        </motion.p>

        {/* Dual Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("reservations")}
            data-cursor-text="Book"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#BA8060] text-[#0E1020] font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_35px_rgba(186,128,96,0.6)] hover:scale-105"
          >
            Reserve a Table
          </button>

          <button
            onClick={() => scrollToSection("menu")}
            data-cursor-text="View"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/[0.04] border border-white/20 text-white font-sans font-medium text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-[#BA8060]/50 hover:scale-105"
          >
            Explore Menu
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-[#BA8060] transition-colors">
          Scroll to Discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-hover:border-[#BA8060] group-hover:text-[#BA8060] transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
