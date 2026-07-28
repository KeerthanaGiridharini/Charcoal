"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Eye, ChevronRight } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from "@/lib/data";
import DishModal from "@/components/ui/DishModal";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("signatures");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleReserveDish = (dishName: string) => {
    const el = document.getElementById("reservations");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="menu" className="relative py-28 md:py-36 bg-[#070811] overflow-hidden">
      {/* Background Lighting & Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#231F62]/20 rounded-full blur-[160px] pointer-events-none" />
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
            Seasonal Gastronomy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight"
          >
            The Culinary Collection
          </motion.h2>
          <p className="max-w-xl font-sans text-sm text-white/60 font-light mt-4">
            Curated daily by Chef Kenzo Takahashi. Each creation celebrates hyper-seasonal ingredients, oak wood smoke, and Kyoto aesthetic purity.
          </p>
          <div className="w-12 h-[1px] bg-[#BA8060]/50 mt-6" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-6 mb-16 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all duration-300 shrink-0 whitespace-nowrap ${
                  isActive
                    ? "text-[#0E1020] font-semibold"
                    : "text-white/70 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#BA8060]/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMenuCategory"
                    className="absolute inset-0 bg-[#BA8060] rounded-full shadow-[0_0_20px_rgba(186,128,96,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Alternate Left/Right Editorial Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="wait">
            {filteredItems.map((dish, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedDish(dish)}
                  data-cursor-text="Inspect"
                  className="glass-panel glass-card-hover rounded-3xl overflow-hidden border border-white/10 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161A2D] via-transparent to-transparent opacity-90" />

                    {/* Price Tag Overlay */}
                    <div className="absolute top-4 right-4 glass-panel-amber px-4 py-1.5 rounded-full border border-[#BA8060]/40 shadow-xl">
                      <span className="font-serif font-bold text-lg text-[#BA8060]">
                        {dish.price}
                      </span>
                    </div>

                    {/* Japanese Name Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#BA8060] font-sans font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        {dish.japaneseName}
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-[#231F62]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BA8060] text-[#0E1020] text-xs uppercase tracking-widest font-semibold">
                        <Eye className="w-4 h-4" />
                        <span>Inspect Dish</span>
                      </span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#BA8060] transition-colors duration-300 mb-3">
                        {dish.name}
                      </h3>
                      <p className="font-sans text-sm text-white/65 font-light leading-relaxed mb-6">
                        {dish.description}
                      </p>
                    </div>

                    {/* Footer Tags & Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {dish.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#BA8060] group-hover:bg-[#BA8060] group-hover:text-[#0E1020] transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dish Detail Modal */}
      <DishModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserveDish={handleReserveDish}
      />
    </section>
  );
}
