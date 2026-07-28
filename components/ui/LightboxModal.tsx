"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GalleryItem } from "@/lib/data";

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 select-none">
        {/* Dark blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070811]/95 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 text-white hover:bg-[#BA8060] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0E1020]/80 border border-white/10 text-white/80 hover:text-white hover:border-[#BA8060] transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0E1020]/80 border border-white/10 text-white/80 hover:text-white hover:border-[#BA8060] transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image View */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Caption Glass Bar */}
          <div className="mt-4 w-full glass-panel p-4 rounded-2xl border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#BA8060] font-sans font-semibold">
                {currentItem.category}
              </span>
              <h4 className="font-serif text-xl text-white font-normal">
                {currentItem.title}
              </h4>
            </div>
            <p className="text-xs text-white/60 font-sans font-light max-w-md text-right">
              {currentItem.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
