"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowUp } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/data";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#070811] pt-28 pb-16 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-[#231F62]/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Live Open Status Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#231F62]/60 border border-[#BA8060]/30 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(186,128,96,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-emerald-300">
              Open Tonight • Dinner Service Active
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight"
          >
            Contact & Location
          </motion.h2>
          <div className="w-12 h-px bg-[#BA8060]/50 mt-6" />
        </div>

        {/* 3-Column Glass Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Column 1: Contact Info & Address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-[#BA8060]/40 flex items-center justify-center bg-[#231F62]">
                  <span className="font-serif font-bold text-lg text-[#BA8060]">C</span>
                </div>
                <span className="font-serif text-2xl text-white font-normal tracking-wider">
                  CHARCOAL
                </span>
              </div>

              <p className="font-sans text-xs text-white/60 leading-relaxed font-light mb-8">
                An enclave of Japanese culinary mastery, charcoal hearth craftsmanship, and discreet luxury in the heart of New York.
              </p>

              <div className="flex flex-col gap-5 text-xs font-sans text-white/80">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#BA8060] shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{RESTAURANT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Phone className="w-4 h-4 text-[#BA8060] shrink-0" />
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#BA8060] transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3.5">
                  <Mail className="w-4 h-4 text-[#BA8060] shrink-0" />
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#BA8060] transition-colors">
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#BA8060] hover:border-[#BA8060] transition-all"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#BA8060] hover:border-[#BA8060] transition-all"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Hours & Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-[#BA8060]" />
                <h3 className="font-serif text-2xl text-white font-normal">
                  Service Hours
                </h3>
              </div>

              <div className="flex flex-col gap-4 text-xs font-sans mb-8">
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-white/80 font-medium">{h.day}</span>
                    <div className="text-right">
                      <span className="text-[#BA8060] font-medium block">{h.dinner}</span>
                      {h.lunch !== "Closed" && (
                        <span className="text-white/40 text-[10px] block">Lunch: {h.lunch}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dress Code Notice */}
              <div className="p-4 rounded-2xl bg-[#231F62]/40 border border-[#BA8060]/30">
                <span className="text-[10px] uppercase tracking-widest text-[#BA8060] font-semibold block mb-1">
                  Dress Code Policy
                </span>
                <p className="text-xs text-white/70 font-sans font-light">
                  Elegant Eveningwear / Smart Formal. Gentlemen are kindly asked to wear collared shirts and closed-toe footwear.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Newsletter & Interactive Map Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-2xl text-white font-normal mb-2">
                Private Guest List
              </h3>
              <p className="font-sans text-xs text-white/60 font-light mb-6">
                Subscribe for priority seasonal reservations, vintage sake releases, and chef invitation events.
              </p>

              <form onSubmit={handleNewsletter} className="flex flex-col gap-3 mb-8">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#161A2D] border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#BA8060] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-[#BA8060] text-[#0E1020] text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <span className="text-xs text-emerald-400 font-sans font-medium text-center">
                    ✓ Welcome to CHARCOAL Private Guest List.
                  </span>
                )}
              </form>
            </div>

            {/* Dark Styled Map Card */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 group">
              <iframe
                title="CHARCOAL Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215707164101!2d-73.973789!3d40.755490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a4e2ef5b%3A0xe7a5a8f5b89a8e0!2sImperial%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/40">
          <p>© {new Date().getFullYear()} CHARCOAL Fine Dining LLC. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#BA8060] hover:underline cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
