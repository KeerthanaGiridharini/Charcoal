"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create soft ambient audio synth generator using Web Audio API so it plays without external asset dependencies!
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();

        // Create warm ambient low synth drone (432Hz harmonic warmth)
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(108, audioCtx.currentTime); // Deep warm low A note

        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 2); // Soft subtle volume

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
      } catch (err) {
        console.warn("Web Audio API unavailable", err);
      }
    }

    return () => {
      if (gainNode && audioCtx) {
        try {
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
          setTimeout(() => {
            oscillator?.stop();
            audioCtx?.close();
          }, 500);
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={toggleSound}
        data-cursor-text={isPlaying ? "Mute" : "Sound"}
        className="glass-panel group relative flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 text-xs tracking-wider uppercase text-white/80 hover:text-white hover:border-[#BA8060]/50 transition-all duration-300 shadow-xl"
        title="Toggle Ambient Lounge Soundscape"
      >
        <div className="flex items-center gap-1 h-3.5 w-4 justify-center">
          {isPlaying ? (
            <>
              <motion.span
                animate={{ height: ["4px", "14px", "6px", "12px"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-[2px] bg-[#BA8060] rounded-full"
              />
              <motion.span
                animate={{ height: ["12px", "4px", "14px", "8px"] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }}
                className="w-[2px] bg-[#BA8060] rounded-full"
              />
              <motion.span
                animate={{ height: ["6px", "14px", "4px", "10px"] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.4 }}
                className="w-[2px] bg-[#BA8060] rounded-full"
              />
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-white/40 group-hover:text-[#BA8060]" />
          )}
        </div>

        <span className="font-medium text-[11px] tracking-widest">
          {isPlaying ? "Ambient Sound On" : "Soundscape Off"}
        </span>
      </button>
    </div>
  );
}
