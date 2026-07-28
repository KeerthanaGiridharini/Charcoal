"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Flame, Utensils, Star, Quote } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#0E1020] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#231F62]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-[#BA8060]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-[#BA8060] mb-3"
          >
            Philosophy & Mastery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight"
          >
            Where Ancient Charcoal <br className="hidden sm:inline" /> Meets Modern Precision
          </motion.h2>
          <div className="w-12 h-[1px] bg-[#BA8060]/50 mt-6" />
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Immersive Chef Imagery with Floating Glass Badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85"
                alt="Chef Kenzo Takahashi Plating Fine Dining Dish"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1020] via-transparent to-transparent opacity-80" />

              {/* Floating Michelin Star Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 glass-panel-amber p-4 rounded-2xl border border-[#BA8060]/30 shadow-2xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#BA8060]/20 border border-[#BA8060]/40 flex items-center justify-center text-[#BA8060]">
                  <Star className="w-5 h-5 fill-[#BA8060]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#BA8060] fill-[#BA8060]" />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/80 font-medium">
                    3 Michelin Stars
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Abstract Decorative Line / Floating Leaf Detail */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[#BA8060]/20 pointer-events-none hidden sm:block" />
          </motion.div>

          {/* Right Column: Floating Glass Story Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            {/* Glass Panel Story Card */}
            <div className="glass-panel p-8 sm:p-12 rounded-3xl relative border border-white/10">
              <span className="font-serif italic text-[#BA8060] text-xl block mb-2">
                The Heritage & Vision
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-6">
                Culinary Art Born from Flame & Discipline
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light mb-6">
                Founded in 2012 by Executive Chef Kenzo Takahashi after two decades in Kyoto and Paris, CHARCOAL is built upon the sacred synergy between authentic Kishu Binchotan oak coals and seasonal micro-harvests.
              </p>

              <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8">
                Every dish is cooked over smokeless, chemical-free charcoal burning at precisely 1,000°C—sealing in rich umami juices while infusing subtle notes of white oak smoke.
              </p>

              {/* Signature Quote Card */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <Quote className="w-8 h-8 text-[#BA8060] shrink-0 mt-1 opacity-70" />
                <div>
                  <p className="font-serif italic text-white/90 text-base sm:text-lg leading-snug">
                    "True fine dining is not merely about taste—it is a reverent communion of heat, silence, craftsmanship, and gratitude."
                  </p>
                  <span className="font-sans text-xs uppercase tracking-widest text-[#BA8060] font-semibold block mt-3">
                    — Executive Chef Kenzo Takahashi
                  </span>
                </div>
              </div>
            </div>

            {/* Excellence Statistics Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-2xl text-center border border-white/5">
                <span className="font-serif text-3xl sm:text-4xl text-white font-semibold block text-gradient-gold">
                  14+
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-sans mt-1 block">
                  Years Excellence
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl text-center border border-white/5">
                <span className="font-serif text-3xl sm:text-4xl text-white font-semibold block text-gradient-gold">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-sans mt-1 block">
                  Sustainable Sourcing
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl text-center border border-white/5">
                <span className="font-serif text-3xl sm:text-4xl text-white font-semibold block text-gradient-gold">
                  24
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-sans mt-1 block">
                  Omakase Seats
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
