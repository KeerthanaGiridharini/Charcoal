"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Users, Clock, Sparkles, CheckCircle2, Award, ChevronRight, X } from "lucide-react";
import confetti from "canvas-confetti";
import { DINING_SPACES, RESTAURANT_INFO } from "@/lib/data";

export default function ReservationSection() {
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("07:30 PM");
  const [space, setSpace] = useState("omakase");
  const [occasion, setOccasion] = useState("Anniversary / Special Celebration");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    guests: string;
    date: string;
    time: string;
    space: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const randomCode = "CH-" + Math.floor(100000 + Math.random() * 900000);
      const selectedSpaceName = DINING_SPACES.find((s) => s.id === space)?.name || "Main Dining Room";

      setConfirmedBooking({
        code: randomCode,
        guests,
        date,
        time,
        space: selectedSpaceName,
      });

      // Trigger Luxury Gold Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#BA8060", "#231F62", "#FFFFFF", "#E8D3C5"],
        });
      } catch {
        // ignore fallback
      }
    }, 1200);
  };

  return (
    <section id="reservations" className="relative py-28 md:py-36 bg-[#0E1020] overflow-hidden">
      {/* Background Photography with Ambient Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=90"
          alt="CHARCOAL Luxury Omakase Dining Counter"
          fill
          className="object-cover filter brightness-[0.25] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1020] via-[#0E1020]/80 to-[#070811]" />
        <div className="absolute inset-0 bg-radial-glow-secondary opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-[#BA8060] mb-3"
          >
            Exclusive Table Booking
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight"
          >
            Reserve Your Experience
          </motion.h2>
          <p className="max-w-md font-sans text-sm text-white/60 font-light mt-4">
            Due to our intimate 24-seat counter layout, reservations are recommended up to 30 days in advance.
          </p>
          <div className="w-12 h-[1px] bg-[#BA8060]/50 mt-6" />
        </div>

        {/* Floating Glass Booking Suite Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-amber rounded-3xl p-8 sm:p-12 border border-[#BA8060]/30 shadow-2xl relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Dining Zone Selector Tabs */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold block mb-4">
                1. Select Dining Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DINING_SPACES.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSpace(sp.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                      space === sp.id
                        ? "bg-[#231F62]/90 border-[#BA8060] shadow-[0_0_20px_rgba(186,128,96,0.25)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-serif text-lg text-white font-medium block">
                      {sp.name}
                    </span>
                    <span className="text-[10px] text-white/50 font-sans tracking-wide mt-2">
                      {sp.capacity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Inputs: Guests, Date, Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Guests */}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold flex items-center gap-2 mb-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#161A2D] border border-white/15 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#BA8060] transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} className="bg-[#0E1020] text-white">
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold flex items-center gap-2 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#161A2D] border border-white/15 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#BA8060] transition-colors"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Seating Time</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#161A2D] border border-white/15 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#BA8060] transition-colors"
                >
                  <option value="05:30 PM" className="bg-[#0E1020]">05:30 PM (Early Dinner)</option>
                  <option value="07:30 PM" className="bg-[#0E1020]">07:30 PM (Prime Omakase)</option>
                  <option value="09:30 PM" className="bg-[#0E1020]">09:30 PM (Late Tasting)</option>
                </select>
              </div>
            </div>

            {/* Special Occasion & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold block mb-2">
                  Special Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#161A2D] border border-white/15 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#BA8060] transition-colors"
                >
                  <option value="Anniversary" className="bg-[#0E1020]">Anniversary Celebration</option>
                  <option value="Birthday" className="bg-[#0E1020]">Birthday Dinner</option>
                  <option value="Business" className="bg-[#0E1020]">Executive Business Dinner</option>
                  <option value="Casual" className="bg-[#0E1020]">Casual Fine Dining</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[#BA8060] font-sans font-semibold block mb-2">
                  Dietary Restrictions / Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gluten-free, Shellfish allergy"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#161A2D] border border-white/15 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#BA8060] transition-colors placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor-text="Confirm"
              className="w-full py-5 rounded-full bg-[#BA8060] text-[#0E1020] font-sans font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-[0_0_35px_rgba(186,128,96,0.6)] hover:scale-[1.01] flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Your Table...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation Pass</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Confirmation Pass Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedBooking(null)}
              className="fixed inset-0 bg-[#070811]/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel-amber p-8 rounded-3xl border border-[#BA8060]/50 shadow-2xl z-10 text-center"
            >
              <button
                onClick={() => setConfirmedBooking(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#BA8060]/20 border border-[#BA8060] flex items-center justify-center mx-auto mb-6 text-[#BA8060]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-[#BA8060] font-sans font-semibold">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl text-white font-normal mt-2 mb-6">
                We Await Your Presence
              </h3>

              <div className="p-6 rounded-2xl bg-[#0E1020]/90 border border-white/10 text-left font-sans text-sm flex flex-col gap-3 mb-6">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Pass Code:</span>
                  <span className="font-mono font-bold text-[#BA8060]">{confirmedBooking.code}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Dining Zone:</span>
                  <span className="text-white font-medium">{confirmedBooking.space}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Party Size:</span>
                  <span className="text-white font-medium">{confirmedBooking.guests} Guests</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Date & Time:</span>
                  <span className="text-white font-medium">{confirmedBooking.date} @ {confirmedBooking.time}</span>
                </div>
              </div>

              <p className="text-xs text-white/50 font-sans mb-6">
                A confirmation SMS and calendar invite have been sent. Please notify us 24 hours prior for any seating alterations.
              </p>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-3.5 rounded-full bg-[#BA8060] text-[#0E1020] font-sans font-semibold text-xs uppercase tracking-widest"
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
