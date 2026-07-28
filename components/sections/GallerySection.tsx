"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/lib/data";
import LightboxModal from "@/components/ui/LightboxModal";

export default function GallerySection() {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#070811] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#231F62]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-[#BA8060] mb-3"
          >
            Visual Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight"
          >
            The Atmosphere & Artistry
          </motion.h2>
          <div className="w-12 h-[1px] bg-[#BA8060]/50 mt-6" />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
          {[
            { id: "all", label: "All Imagery" },
            { id: "culinary", label: "Culinary Art" },
            { id: "atmosphere", label: "Dining Spaces" },
            { id: "cocktails", label: "Mixology" },
            { id: "kitchen", label: "Behind the Hearth" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                filter === tab.id
                  ? "bg-[#231F62] text-white border border-[#BA8060] shadow-[0_0_15px_rgba(186,128,96,0.3)]"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setLightboxIndex(index)}
                data-cursor-text="Expand"
                className={`relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer glass-card-hover ${
                  item.aspect === "tall"
                    ? "aspect-[3/4]"
                    : item.aspect === "wide"
                    ? "aspect-[16/10]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.85] group-hover:brightness-[1]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1020] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Top Corner Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-[#BA8060]" />
                </div>

                {/* Bottom Caption Glass Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#BA8060] font-sans font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-white font-normal mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-white/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
