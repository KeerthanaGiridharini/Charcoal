"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wine, Info } from "lucide-react";
import Image from "next/image";
import { MenuItem } from "@/lib/data";

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onReserveDish: (dishName: string) => void;
}

export default function DishModal({ item, onClose, onReserveDish }: DishModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070811]/85 backdrop-blur-2xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-3xl glass-panel-amber rounded-3xl overflow-hidden border border-[#BA8060]/30 shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#0E1020]/70 text-white/80 hover:text-white border border-white/10 hover:border-[#BA8060] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Image Column */}
            <div className="md:col-span-6 relative aspect-square md:aspect-auto h-64 md:h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1020] via-transparent to-transparent opacity-80 md:hidden" />
            </div>

            {/* Content Column */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Japanese Name & Price */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#BA8060] font-sans font-semibold">
                    {item.japaneseName}
                  </span>
                  <span className="font-serif text-2xl text-[#BA8060] font-bold">
                    {item.price}
                  </span>
                </div>

                {/* English Name */}
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                  {item.name}
                </h3>

                {/* Tag Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/80 font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-white/70 leading-relaxed font-light mb-6">
                  {item.description}
                </p>

                {/* Chef Note */}
                {item.chefNote && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4 flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#BA8060] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#BA8060] font-semibold block">
                        Chef&apos;s Preparation Note
                      </span>
                      <p className="font-sans text-xs text-white/80 leading-normal mt-1">
                        {item.chefNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sommelier Pairing */}
                {item.pairing && (
                  <div className="p-4 rounded-xl bg-[#231F62]/40 border border-[#BA8060]/30 mb-6 flex items-start gap-3">
                    <Wine className="w-4 h-4 text-[#BA8060] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#BA8060] font-semibold block">
                        Recommended Sommelier Pairing
                      </span>
                      <p className="font-sans text-xs text-white/90 leading-normal mt-1 font-medium">
                        {item.pairing}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reserve Button */}
              <button
                onClick={() => {
                  onReserveDish(item.name);
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#BA8060] text-[#0E1020] font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,128,96,0.5)] hover:scale-[1.02]"
              >
                Book Table For This Dish
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
