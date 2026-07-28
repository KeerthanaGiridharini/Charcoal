"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, input, select, textarea, [data-cursor="interactive"]'
      );
      const cursorTextEl = target.closest('[data-cursor-text]') as HTMLElement | null;

      if (cursorTextEl) {
        setIsHovered(true);
        setHoverText(cursorTextEl.getAttribute("data-cursor-text") || "");
      } else if (interactiveEl) {
        setIsHovered(true);
        setHoverText("");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#BA8060] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Luxury Outer Ring / Hover Follower */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center text-[10px] uppercase tracking-widest font-sans font-semibold text-[#0E1020]"
        style={{
          border: isHovered ? "1px solid rgba(186, 128, 96, 0.8)" : "1px solid rgba(186, 128, 96, 0.35)",
          backgroundColor: isHovered ? "rgba(186, 128, 96, 0.9)" : "transparent",
          backdropFilter: isHovered ? "blur(4px)" : "none",
        }}
        animate={{
          x: mousePosition.x - (isHovered ? 36 : 18),
          y: mousePosition.y - (isHovered ? 36 : 18),
          width: isHovered ? 72 : 36,
          height: isHovered ? 72 : 36,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-1 text-center font-bold text-[10px] leading-tight"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
