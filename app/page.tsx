"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Menu as MenuIcon,
  X,
  Flame,
  ChevronLeft,
  ChevronRight,
  GlassWater,
} from "lucide-react";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TiktokIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16.5 2.5c.1 1.7.8 3.3 2 4.5 1.2 1.2 2.8 1.9 4.5 2v3.2c-1.9-.1-3.7-.8-5-2-1.4-1.3-2.2-3-2.3-4.9h-2.2v10.7a4.6 4.6 0 0 1-1.5 3.4 4.8 4.8 0 0 1-3.4 1.5 4.9 4.9 0 0 1-4.9-4.9 4.9 4.9 0 0 1 4.9-4.9h.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const HERO_SLIDES = [
  
  {
    img: "https://charcoalbkk.com/wp-content/uploads/2023/09/Charcaol-May-22-2023-84-scaled.jpg",
    caption: "Smoke, spice, ceremony",
  },
  {
    img: "https://charcoalbkk.com/wp-content/uploads/2023/09/Add-on-edits-96-scaled.jpg",
    caption: "Every plate, fire-kissed",
  },
  {
    img: "https://charcoalbkk.com/wp-content/uploads/2025/10/halal-vs-non-halal.webp",
    caption: "100% halal, zero compromise",
  },
  {
    img: '/hero1.jpg',
    caption: "The tandoor never sleeps",
  },
];

const GALLERY_LEFT = [
  "/gallery/a1.jpg",
  "/gallery/a3.jpg",
  "/gallery/a5.jpg",
  "/gallery/a7.jpg",
  "/gallery/a9.jpg",
  "/gallery/a11.jpg",
  "/gallery/a13.jpg",
];

const GALLERY_RIGHT = [
  "/gallery/a2.jpg",
  "/gallery/a4.jpg",
  "/gallery/a6.jpg",
  "/gallery/a8.jpg",
  "/gallery/a10.jpg",
  "/gallery/a12.jpg",
  "/gallery/a14.jpg",
];

const NAV = [
  { id: "about", label: "About" },
  { href: "https://charcoal-tandoor-fire-grill.happychimps.com/digital-menu?branch=199&menu=digital_menu&sub_menu=digital_menu", label: "Menu" },
  { href: "https://charcoal-tandoor-fire-grill.happychimps.com/deals?branch=199&menu=meal_deal&sub_menu=meal_deal", label: "Deals & Offers" },
  { id: "gallery", label: "Gallery" },
  { id: "private-dining", label: "Private Dining" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function useReveal(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Jagged "scorched edge" clip-paths — the site's signature motif */
const BURN_CLIPS = [
  "polygon(2% 4%, 14% 0%, 28% 3%, 40% 0%, 55% 2%, 68% 0%, 82% 3%, 98% 0%, 100% 12%, 97% 26%, 100% 40%, 96% 55%, 100% 70%, 97% 84%, 100% 96%, 86% 100%, 72% 97%, 58% 100%, 44% 98%, 30% 100%, 16% 97%, 3% 100%, 0% 86%, 3% 70%, 0% 55%, 4% 40%, 0% 26%, 3% 12%)",
  "polygon(0% 6%, 12% 2%, 24% 5%, 38% 1%, 52% 4%, 66% 1%, 80% 4%, 94% 0%, 100% 10%, 96% 24%, 100% 38%, 95% 52%, 100% 66%, 96% 80%, 100% 94%, 88% 100%, 74% 96%, 60% 100%, 46% 97%, 32% 100%, 18% 96%, 4% 100%, 0% 88%, 4% 74%, 0% 60%, 5% 46%, 0% 32%, 4% 18%)",
];

interface ScorchFrameProps {
  src: string;
  alt: string;
  className?: string;
  variant?: number;
  children?: React.ReactNode;
}

function ScorchFrame({ src, alt, className = "", variant = 0, children }: ScorchFrameProps) {
  return (
    <div
      className={`scorch-frame relative ${className}`}
      style={{ clipPath: BURN_CLIPS[variant % BURN_CLIPS.length] }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized />
      {children}
    </div>
  );
}

function Embers({ count = 22 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (i * 137.5) % 100,
        size: 2 + ((i * 29) % 5),
        delay: (i * 0.53) % 8,
        duration: 7 + ((i * 17) % 6),
        drift: ((i * 53) % 60) - 30,
      })),
    [count]
  );
  return (
    <div className="embers" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Trigger nav-solid when scrolling past the hero and into the middle of the about section (~1.3x viewport height)
      setScrolled(window.scrollY > window.innerHeight * 1.3);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-solid" : ""}`}>
      <div className="nav-inner">
        <div className="nav-brand-block">
          <button className="wordmark" onClick={() => goTo("hero")}>
            <Image src="/CC-logo.webp" alt="Charcoal logo" width={56} height={56} className="wordmark-logo" />
          </button>

          <nav className="nav-links">
            {NAV.map((n, i) => (
              n.href ? (
                <a key={i} href={n.href} target="_blank" rel="noreferrer">
                  {n.label}
                </a>
              ) : (
                <button key={i} onClick={() => goTo(n.id as string)}>
                  {n.label}
                </button>
              )
            ))}
            <a
              className="btn-ember btn-sm"
              href="https://book.bistrochat.com/charcoal-sri-lanka"
              target="_blank"
              rel="noreferrer"
            >
              Make a Reservation
            </a>
          </nav>
        </div>

        <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <div className={`nav-mobile ${open ? "nav-mobile-open" : ""}`}>
        {NAV.map((n, i) => (
          n.href ? (
            <a key={i} href={n.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ) : (
            <button key={i} onClick={() => goTo(n.id as string)}>
              {n.label}
            </button>
          )
        ))}
        <a
          className="btn-ember btn-sm"
          href="https://charcoal-tandoor-fire-grill.happychimps.com/reservation?branch=199&menu=book_a_table&sub_menu=book_a_table"
          target="_blank"
          rel="noreferrer"
        >
          Reserve a Table
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (dir: number) => {
    if (timer.current) clearInterval(timer.current);
    setIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
  };

  return (
    <section id="hero" className="hero">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.img}
          className={`hero-slide ${i === index ? "hero-slide-active" : ""}`}
          style={{ backgroundImage: `url(${s.img})` }}
        />
      ))}
      <div className="hero-scrim" />
      <Embers count={26} />

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Capitol TwinPeaks &nbsp;·&nbsp; Colombo</p>
        <h1 className="hero-title">
          Fire is the <em>oldest</em>
          <br />
          language we speak
        </h1>
        <p className="hero-sub">
          Halal-certified tandoor cooking, born of live charcoal and centuries of
          North Indian craft — reimagined for Colombo.
        </p>
        <div className="hero-actions">
          <a
            className="btn-ember"
            href="https://charcoal-tandoor-fire-grill.happychimps.com/reservation?branch=199&menu=book_a_table&sub_menu=book_a_table"
            target="_blank"
            rel="noreferrer"
          >
            Reserve a Table
          </a>
          <a className="btn-ghost" href="tel:+94777600611">
            <Phone size={16} /> +94 777 600 611
          </a>
        </div>
      </div>

      <div className="hero-controls">
        <button onClick={() => go(-1)} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot dot-active" : "dot"}
              onClick={() => {
                if (timer.current) clearInterval(timer.current);
                setIndex(i);
              }}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="hero-caption">{HERO_SLIDES[index].caption}</div>
      <div className="scroll-cue">
        <span />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="section about">
      <Reveal className="about-intro">
        <p className="eyebrow">Who We Are</p>
        <h2 className="section-title">
          Cooked over live coal, <br />
          not shortcuts
        </h2>
        <p className="about-intro-text">
          Welcome to Charcoal, where centuries-old Indian culinary traditions are perfected for a new era. We are proud to be <span className="accent">100% halal-certified</span>, a commitment that guarantees the integrity of our ingredients and reflects our deep respect for a variety of cultures.
        </p>
      </Reveal>

      <div className="about-showcase">
        <Reveal className="about-note" delay={100}>
          <p className="body-text">
            At the heart of our craft is the traditional tandoor, a fiery clay oven whose intense heat creates a signature smoky flavor and an unparalleled succulence that modern methods simply can’t replicate.
          </p>
          <p className="body-text">
            Our chefs use this ancient art to create signature dishes like the fiery Murgh Angaar, the tender Charcoal Lamb Chops, and our rich, aromatic Biryanis. It’s an intoxicating fusion of heritage and innovation, set within a sleek, vibrant, and social environment. The aromas of our spices and smoky charcoal fill the air, inviting you to share a memorable meal and savor every moment of an unforgettable journey into India’s rich culinary history.
          </p>
          {/* <div className="about-signature">
            <span className="signature-script">Aakash Rao</span>
            <span className="signature-label">Aakash Rao — Head Chef</span>
          </div>*/}

          <ScorchFrame
            className="about-image about-image--small"
            src="/map-charcoal.png"
            alt="Charcoal Colombo location map"
            variant={2}
          />
        </Reveal>

        <Reveal className="about-image about-image--tall" delay={150}>
          <ScorchFrame
            src="https://charcoalbkk.com/wp-content/uploads/2023/09/Image-23-1.jpg"
            alt="Charcoal Colombo dining room"
            variant={0}
          />
        </Reveal>

        <Reveal className="about-info" delay={200}>
          <div className="about-info-block">
            <h3>Dinner Service</h3>
            <p>Tuesday to Sunday</p>
            <p>5.00 pm – 12.00 am</p>
          </div>
          <span className="about-info-divider" aria-hidden="true">
            ◆
          </span>
          <div className="about-info-block">
            <h3>Contact Us</h3>
            <p>50th Floor, 24 Staple St,</p>
            <p>Colombo 00200,</p>
            <p>Sri Lanka</p>
            <p>+94 11 234 5678</p>
            <p>hello@charcoalcolombo.com</p>
          </div>

          <div className="about-stats about-stats-centered">
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Halal-Certified</span>
            </div>
            <div className="stat">
              <span className="stat-num">12+</span>
              <span className="stat-label">Signature Dishes</span>
            </div>
            <div className="stat">
              <span className="stat-num">5–12</span>
              <span className="stat-label">Open Nightly, Tue–Sun</span>
            </div>
            <div className="stat">
              <span className="stat-num">1</span>
              <span className="stat-label">Live Tandoor Flame</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SIGNATURE DISH                                                     */
/* ------------------------------------------------------------------ */
const Menu = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const counterRotate = useTransform(scrollYProgress, [0, 1], [60, -120]);

  const featuredItems = [
    {
      name: "Kakori Kebab",
      desc: "Smoked minced lamb",
      img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop",
      pos: { top: '15%', left: '50%' }
    },
    {
      name: "Tandoori Jhinga",
      desc: "Jumbo prawns, yellow chili",
      img: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop",
      pos: { top: '75%', left: '85%' }
    },
    {
      name: "Dal Charcoal",
      desc: "Overnight slow-cooked lentils",
      img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
      pos: { top: '75%', left: '15%' }
    }
  ];

  return (
<section
  id="menu"
  ref={containerRef}
  className="relative overflow-hidden min-h-[135vh] flex items-center justify-center py-24"
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('/Charcoal-2-opt.jpeg')",
    }}
  />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(39,26,107,0.35),rgba(11,9,8,0.82))]" />
  <div className="absolute inset-0 bg-black/25" />

  <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">

    {/* Heading */}
    <div className="mb-16 md:mb-20">
      <SectionHeading
        subtitle="Culinary Journey"
        title="Featured Signatures"
      />
    </div>

    <div className="relative w-full max-w-6xl flex items-center justify-center">
      {/* Orbit Container */}
      <div
        className="
          relative
          w-85
          h-125
          md:w-150
          md:h-185
          flex
          items-center
          justify-center
          mx-10 lg:mx-24 xl:mx-55 2xl:mx-70
          rounded-full
        "
      >
      {/* Orbit Rings */}
      <div className="absolute w-75 h-75 md:w-115 md:h-115 rounded-full border border-dashed border-[#C69C6D]/20 animate-[spin_40s_linear_infinite]" />

      <div className="absolute w-55 h-55 md:w-90 md:h-90 rounded-full border border-[#C69C6D]/10" />

      {/* Center */}
      <div className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#121212] border border-[#C69C6D]/30 shadow-[0_0_50px_rgba(198,156,109,0.08)]">
        <Flame className="text-[#A66543] mb-2" size={24} />

        <span className="font-serif text-2xl md:text-3xl italic text-[#C69C6D]">
          Taste
        </span>

        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mt-1">
          The Moghul Era
        </span>
      </div>

      {/* Rotating Orbit */}
      <motion.div
        style={{ rotate }}
        className="absolute inset-0"
      >
        {featuredItems.map((item, idx) => (
          <div
            key={idx}
            className="absolute flex justify-center w-47.5 md:w-60"
            style={{
              top: item.pos.top,
              left: item.pos.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              style={{ rotate: counterRotate }}
              className="flex flex-col items-center"
            >
              {/* Image */}
              <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#C69C6D]/40 shadow-xl mb-4">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-110"
                  unoptimized
                />
              </div>

              {/* Card */}
              <div className="w-45 md:w-57.5 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-white/5 shadow-xl text-center px-4 py-3">
                <h4 className="font-serif text-white text-lg mb-1">
                  {item.name}
                </h4>

                <p className="uppercase tracking-wider text-[#C69C6D] text-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
      </div>

    </div>

    {/* Bottom Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-14"
    >
      <a
        className="btn-ember"
        href="https://charcoal-tandoor-fire-grill.happychimps.com/menu?branch=199&menu=mobile_table_order&sub_menu=digital_menu"
        target="_blank"
        rel="noreferrer"
      >
        Explore Menu
      </a>

      <a
        className="btn-ghost flex items-center gap-2"
        href="https://charcoal-tandoor-fire-grill.happychimps.com/deals?branch=199&menu=meal_deal&sub_menu=meal_deal"
        target="_blank"
        rel="noreferrer"
      >
        <GlassWater size={18} />
        Deals &amp; Offers
      </a>
    </motion.div>
  </div>
</section>
  );
};

/* ------------------------------------------------------------------ */
/*  GALLERY                                                            */
/* ------------------------------------------------------------------ */

function Gallery() {
  // Create a block of 12 elements (4 unique elements repeated 3 times)
  // 12 is a multiple of cardSizes.length (6), ensuring seamless looping
  const leftBlock = [...GALLERY_LEFT, ...GALLERY_LEFT, ...GALLERY_LEFT];
  const rightBlock = [...GALLERY_RIGHT, ...GALLERY_RIGHT, ...GALLERY_RIGHT];

  const marqueeRows = [
    { items: [...leftBlock, ...leftBlock], direction: "left" as const },
    { items: [...rightBlock, ...rightBlock], direction: "right" as const },
  ];

  const cardSizes = [
    "w-[min(220px,42vw)] h-[280px]",
    "w-[min(260px,46vw)] h-[220px]",
    "w-[min(200px,38vw)] h-[320px]",
    "w-[min(240px,44vw)] h-[200px]",
    "w-[min(210px,40vw)] h-[300px]",
    "w-[min(250px,45vw)] h-[240px]",
  ];

  return (
    <section id="gallery" className="section gallery">
      <Reveal className="gallery-head">
        <p className="eyebrow">Inside Charcoal</p>
        <h2 className="section-title">The Room, The Fire, The Table</h2>
      </Reveal>

      <div className="gallery-marquee-stack">
        {marqueeRows.map((row, rowIndex) => (
          <div key={rowIndex} className="gallery-marquee-row">
            <div className={`gallery-marquee-track ${row.direction === "left" ? "gallery-marquee-left" : "gallery-marquee-right"}`}>
              {row.items.map((src, i) => {
                const sizeClass = cardSizes[i % cardSizes.length];

                return (
                  <Reveal
                    key={`${rowIndex}-${i}`}
                    delay={i * 40}
                    className={`gallery-marquee-card relative ${sizeClass}`}
                  >
                    <Image src={src} alt={`Charcoal Colombo ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Reveal className="gallery-follow">
        <a href="https://www.instagram.com/charcoal_cmb" target="_blank" rel="noreferrer">
          <InstagramIcon size={16} /> @charcoal_cmb
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRIVATE DINING / CTA BAND                                          */
/* ------------------------------------------------------------------ */

function PrivateDining() {
  return (
    <section id="private-dining" className="section private-dining">
      <Embers count={14} />
      <Reveal className="pd-content">
        <p className="eyebrow">For Larger Occasions</p>
        <h2 className="section-title">Private Dining &amp; Celebrations</h2>
        <p className="body-text">
          Birthdays, corporate dinners, or a table for the whole family — our
          team will build a set menu around the tandoor for groups of any size.
          Reserve your table and we&apos;ll take it from there.
        </p>
        <div className="pd-actions">
          <a className="btn-ember" href="https://book.bistrochat.com/charcoal-sri-lanka" target="_blank" rel="noreferrer">
            Book Your Table
          </a>
          <a className="btn-ghost" href="https://charcoal-tandoor-fire-grill.happychimps.com/digital-menu?branch=199&menu=digital_menu&sub_menu=digital_menu">
             View menu
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RESERVE BANNER                                                     */
/* ------------------------------------------------------------------ */

/*function ReserveBanner() {
  return (
    <section className="reserve-banner">
      <div
        className="reserve-bg"
        style={{
          backgroundImage:
            "url(https://charcoalbkk.com/wp-content/uploads/2023/09/Image-185-1.jpg)",
        }}
      />
      <div className="reserve-scrim" />
      <Reveal className="reserve-content">
        <h2 className="section-title">Book Your Table</h2>
        <a
          className="btn-ember"
          href="https://book.bistrochat.com/charcoal-sri-lanka"
          target="_blank"
          rel="noreferrer"
        >
          Online Booking
        </a>
      </Reveal>
    </section>
  );
}
*/

/* ------------------------------------------------------------------ */

/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [
    {
      question: "What type of cuisine does Charcoal Colombo serve?",
      answer: "Charcoal Colombo celebrates the bold flavors of North Indian cuisine, specializing in halal-certified tandoor-grilled meats, aromatic biryanis, and refined cocktails. From smoky kebabs to rich biryanis, every dish reflects India’s culinary heritage with a touch of Colombo’s vibrant flair.",
    },
    {
      question: "Where is Charcoal Colombo located?",
      answer: "You’ll find us at Capitol TwinPeaks in the heart of Colombo, offering a stylish dining destination that blends contemporary elegance with warm hospitality.",
    },
    {
      question: "What are the restaurant’s operating hours?",
      answer: "Charcoal welcomes guests daily from 5 PM until 12 AM, Tuesday to Sunday (closed Monday), making it perfect for evening outings, celebrations, and relaxed weekend dining.",
    },
    {
      question: "Do I need a reservation to dine in, and how can I make one?",
      answer: "Reservations are recommended for the best dining experience. You can book directly through our website or contact us to secure your table. Walk-ins are also welcome, subject to availability.",
    },
    {
      question: "Is Charcoal halal?",
      answer: "Yes. Every dish at Charcoal is prepared with 100% halal-certified ingredients, ensuring quality, authenticity, and adherence to halal standards.",
    },
    {
      question: "Does Charcoal offer vegetarian or vegan options?",
      answer: "Absolutely. Alongside our signature kebabs and biryanis, we offer a range of vegetarian and vegan dishes such as Paneer Tikka, Tandoori Broccoli, and seasonal plant-based creations.",
    },
    {
      question: "How can I contact the restaurant for general inquiries?",
      answer: "You can reach our team via phone or through Instagram at @charcoal_cmb. We’re happy to assist with reservations, private dining, and menu-related queries.",
    },
    {
      question: "What is the dress code?",
      answer: "Our dress code is smart casual. We encourage guests to dress comfortably yet stylishly to match our upscale yet welcoming atmosphere.",
    },
    {
      question: "What safety or hygiene protocols are in place?",
      answer: "We maintain strict halal standards along with international hygiene practices. From ingredient sourcing to kitchen operations, every step is designed to ensure food safety, cleanliness, and a seamless dining experience.",
    },
  ];

  return (
    <section id="faq" className="section faq-section">
      <Reveal className="faq-head">
        <p className="eyebrow">Frequently Asked</p>
        <h2 className="section-title">Questions</h2>
        <p className="body-text faq-intro-text">
          Everything you need to know before settling in for a night by the fire.
        </p>
      </Reveal>

      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <Reveal key={item.question} delay={index * 70} className="faq-item">
              <button
                className={`faq-question ${isOpen ? "faq-open" : ""}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/*  FOOTER / CONTACT                                                   */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-panel">
        <Reveal className="footer-intro">
          <div className="wordmark footer-wordmark">
            <Image src="/CC-logo.webp" alt="Charcoal logo" width={1} height={1} className="wordmark-flame" />
          </div>
          <p className="eyebrow">Contact & Visit</p>
          <h3 className="footer-title">A table by the flame, a room built for evenings.</h3>
          <p className="body-text small">
            Halal-certified tandoor fire grill at Capitol TwinPeaks, Colombo.
          </p>
          <div className="socials">
            <a href="https://www.instagram.com/charcoal_cmb" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href="https://www.facebook.com/charcoalcolombo/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon size={18} />
            </a>
            <a href="https://www.tiktok.com/@charcoal.cmb" target="_blank" rel="noreferrer" aria-label="TikTok">
              <TiktokIcon size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="footer-details">
          <div className="footer-card">
            <h4>Visit</h4>
            <p className="footer-line whitespace-pre-line">
              <MapPin size={15} /> 50th Floor, 24 Staple St, Colombo 00200, Sri Lanka
            </p>
            <p className="footer-line">
              <Clock size={15} /> 5pm – 12am · Tue – Sun (closed Mon)
            </p>
            <p className="footer-line">
              <Phone size={15} /> +94 777 600 611
            </p>
          </div>
        </Reveal>

        <Reveal delay={160} className="footer-map">
          <iframe
            title="Charcoal Colombo location"
            src="https://maps.google.com/maps?q=50th%20Floor%2C%2024%20Staple%20St%2C%20Colombo%2000200%2C%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </Reveal>
      </div>
      <div className="footer-brand-strip">
        <p className="brand-strip-title">Discover our restaurants &amp; bars</p>
        <div className="brand-logos" aria-label="Restaurant brands">
          <a href="https://cantinabkk.com/" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Charcoal restaurant">
            <Image src="/footer_logos/6-LOGOS_W-Cantina.webp" alt="Charcoal restaurant logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" unoptimized />
          </a>
          <a href="https://charcoalbkk.com/?_gl=1%2Akc9t1e%2A_ga%2AMTM1ODI4MTY3NC4xNzg1MTczMTc5%2A_ga_CCH8BZ2GCW%2AczE3ODUyMjYzODckbzEyJGcxJHQxNzg1MjI3ODc2JGozMCRsMCRoMA..%2A_gcl_au%2AMTk1ODAxMzU3OS4xNzg1MTczMTc5%2A_ga_QQYPN7L5X2%2AczE3ODUyMjYzODckbzEyJGcxJHQxNzg1MjI3ODc2JGozMCRsMCRoOTIwMjk0Njg5" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Soho restaurant">
            <Image src="/footer_logos/above.webp" alt="Soho restaurant logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover scale-75" unoptimized />
          </a>
          <a href="facebook.com/havanasocialbkk" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Ember bar">
            <Image src="/footer_logos/6-LOGOS_W-Havana.webp" alt="Ember bar logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" unoptimized />
          </a>
          <a href="https://yankiirestaurant.com/" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Roast restaurant">
            <Image src="/footer_logos/Yankii.webp" alt="Roast restaurant logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" unoptimized />
          </a>
          <a href="https://www.sohopizza.co.th/" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Vintage bar">
            <Image src="/footer_logos/SohoPizza.webp" alt="Vintage bar logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" unoptimized />
          </a>
          <a href="https://apt101club.com/" target="_blank" rel="noreferrer" className="brand-logo-card" aria-label="Flame restaurant">
            <Image src="/footer_logos/APT101_Logo_2.webp" alt="Flame restaurant logo" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" unoptimized />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Charcoal Colombo. All rights reserved.</span>
        <a href="https://sohohospitality.com" target="_blank" rel="noreferrer" className="footer-soho-link">
          <Image src="/footer_logos/Soho-logo.webp" alt="Soho Hospitality Logo" width={180} height={80} className="footer-soho-logo" unoptimized />
        </a>
      </div>
    </footer>
  );
}

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12">
    <h3 className="text-[#C69C6D] uppercase tracking-[0.2em] text-xs md:text-sm mb-4">{subtitle}</h3>
    <h2 className="font-serif text-3xl md:text-5xl text-white">{title}</h2>
  </div>
);

/* ------------------------------------------------------------------ */
/*  ROOT                                                               */
/* ------------------------------------------------------------------ */

export default function CharcoalSite() {
  return (
    <div className="charcoal-app">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <PrivateDining />
      <FAQSection />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap');

.charcoal-app {
  --ink: #0b0908;
  --char: #17130f;
  --char-2: #1f1a14;
  --primary: #271a6b;
  --primary-deep: #0b0717;
  --line: rgba(245,237,227,0.10);
  --ember: #BA8060;
  --ember-deep: #8D5E3C;
  --gold: #d4a24c;
  --smoke: #a89e93;
  --cream: #f5ede3;
  font-family: 'Manrope', sans-serif;
  background: linear-gradient(180deg, var(--ink) 0%, #0e0a1b 100%);
  color: var(--cream);
  overflow-x: hidden;
  position: relative;
}

.charcoal-app * { box-sizing: border-box; }
button, a, [role="button"] {
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  outline: none !important;
}
button:focus-visible, a:focus-visible, [role="button"]:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
button:hover, a:hover, [role="button"]:hover {
  outline: none !important;
  box-shadow: none !important;
}
button::-moz-focus-inner, a::-moz-focus-inner, [role="button"]::-moz-focus-inner {
  border: 0;
}

.eyebrow {
  font-family: 'Manrope', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 12px;
  font-weight: 700;
  color: var(--gold);
  margin: 0 0 14px;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: clamp(30px, 4.2vw, 52px);
  line-height: 1.08;
  margin: 0 0 20px;
  color: var(--cream);
}

.section-title em { color: var(--ember); font-style: italic; }

.body-text {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--smoke);
  margin: 0 0 16px;
  max-width: 46ch;
}
.body-text.small { font-size: 14px; max-width: 34ch; }

.section { padding: 110px 8vw; position: relative; background: linear-gradient(180deg, rgba(39,26,107,0.16) 0%, rgba(11,9,8,0.03) 55%, transparent 100%); }
@media (max-width: 800px) { .section { padding: 80px 6vw; } }

/* ---------- reveal on scroll ---------- */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(.22,.61,.36,1), transform 0.8s cubic-bezier(.22,.61,.36,1); }
.reveal-in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

/* ---------- buttons ---------- */
.btn-ember, .btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 2px;
  font-size: 13.5px; font-weight: 700; letter-spacing: 0.04em;
  text-decoration: none; cursor: pointer; border: none;
  transition: transform 0.35s cubic-bezier(.22,.61,.36,1), box-shadow 0.35s ease, background 0.35s ease;
}
.btn-ember {
  background: linear-gradient(135deg, var(--ember), var(--ember-deep));
  color: #17130f;
  box-shadow: 0 8px 24px -8px rgba(255,107,53,0.55);
}
.btn-ember:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -8px rgba(255,107,53,0.7); }
.btn-ghost {
  background: transparent; color: var(--cream); border: 1px solid var(--line);
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
.btn-sm { padding: 9px 18px; font-size: 12px; }

/* ---------- nav ---------- */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
  background: transparent;
}
.nav-solid { background: linear-gradient(to bottom, rgba(39, 26, 107, 0.95) 0%, rgba(11, 9, 8, 0.98) 100%); backdrop-filter: blur(10px); box-shadow: 0 1px 0 var(--line); }
.nav-inner {
  max-width: 1280px; margin: 0 auto; padding: 18px 6vw;
  display: flex; align-items: center; justify-content: center;
  gap: 20px;
}
.nav-brand-block {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  width: 100%;
}
.wordmark {
  display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer;
  padding: 0;
}
.wordmark-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  filter: drop-shadow(0 6px 20px rgba(186, 128, 96, 0.2));
}
.accent-text { color: var(--ember); font-style: italic; }
.nav-links { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.nav-links button {
  background: none; border: none; color: var(--cream); font-size: 13.5px; font-weight: 600;
  letter-spacing: 0.02em; cursor: pointer; position: relative; padding: 4px 0;
  outline: none;
  box-shadow: none;
}
.nav-links button:hover,
.nav-links button:focus,
.nav-links button:active {
  background: transparent;
  box-shadow: none;
  outline: none;
}
.nav-links button::after {
  content: ""; position: absolute; left: 0; bottom: -2px; height: 1px; width: 0%;
  background: var(--ember); transition: width 0.3s ease;
  border-radius: 0;
}
.nav-links button:hover::after { width: 100%; }
.burger { display: none; background: none; border: none; color: var(--cream); }
.nav-mobile { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: rgba(11,9,8,0.97); }
.nav-mobile-open { max-height: 400px; }
.nav-mobile button, .nav-mobile a { display: block; width: 100%; text-align: left; padding: 14px 6vw; background: none; border: none; color: var(--cream); font-size: 15px; border-top: 1px solid var(--line); }

@media (max-width: 860px) {
  .nav-links { display: none; }
  .burger { display: block; }
}

/* ---------- embers ---------- */
.embers { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
.ember {
  position: absolute; bottom: -10px; border-radius: 50%;
  background: radial-gradient(circle, #ffd8a8 0%, var(--ember) 55%, transparent 75%);
  opacity: 0; animation: rise linear infinite;
  box-shadow: 0 0 6px 1px rgba(255,140,60,0.7);
}
@keyframes rise {
  0% { transform: translate(0,0) scale(0.6); opacity: 0; }
  10% { opacity: 0.9; }
  50% { transform: translate(var(--drift), -55vh) scale(1); }
  90% { opacity: 0.5; }
  100% { transform: translate(calc(var(--drift) * 1.6), -95vh) scale(0.3); opacity: 0; }
}

/* ---------- hero ---------- */
.hero { position: relative; height: 100vh; min-height: 620px; overflow: hidden; }
.hero-slide {
  position: absolute; inset: 0; background-size: cover; background-position: center;
  opacity: 0; transition: opacity 1.4s ease; transform: scale(1.06);
}
.hero-slide-active { opacity: 1; animation: kenburns 8s ease-out forwards; }
@keyframes kenburns { from { transform: scale(1.12); } to { transform: scale(1.0); } }
.hero-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(11,9,8,0.55) 0%, rgba(11,9,8,0.35) 40%, rgba(11,9,8,0.9) 100%);
  z-index: 1;
}
.hero-content {
  position: relative; z-index: 3; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 0 6vw;
}
.hero-eyebrow { color: var(--gold); }
.hero-title {
  font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(38px, 7vw, 84px);
  line-height: 1.04; margin: 0 0 22px; max-width: 16ch;
}
.hero-title em { color: var(--ember); font-style: italic; }
.hero-sub { color: var(--smoke); font-size: 16px; max-width: 46ch; margin: 0 0 34px; line-height: 1.7; }
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.hero-controls {
  position: absolute; bottom: 42px; left: 50%; transform: translateX(-50%); z-index: 3;
  display: flex; align-items: center; gap: 18px;
}
.hero-controls button { background: rgba(245,237,227,0.08); border: 1px solid var(--line); color: var(--cream); border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s ease; }
.hero-controls button:hover { background: rgba(255,107,53,0.25); }
.hero-dots { display: flex; gap: 8px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(245,237,227,0.3); cursor: pointer; transition: all 0.3s ease; }
.dot-active { background: var(--ember); width: 22px; border-radius: 4px; }
.hero-caption {
  position: absolute; bottom: 100px; right: 6vw; z-index: 3; font-family: 'Fraunces', serif;
  font-style: italic; color: var(--smoke); font-size: 14px;
}
.scroll-cue { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 3; width: 22px; height: 36px; border: 1px solid var(--line); border-radius: 12px; }
.scroll-cue span { display: block; width: 3px; height: 8px; background: var(--ember); border-radius: 2px; margin: 6px auto; animation: scrollcue 1.8s ease infinite; }
@keyframes scrollcue { 0% { transform: translateY(0); opacity: 1; } 70% { opacity: 0; } 100% { transform: translateY(12px); opacity: 0; } }

/* ---------- scorch frames (signature) ---------- */
.scorch-frame { position: relative; overflow: hidden; }
.scorch-frame img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 1.1s cubic-bezier(.22,.61,.36,1); }
.scorch-frame:hover img { transform: scale(1.08); }

/* ---------- about ---------- */
.about {
  background: linear-gradient(180deg, rgba(11,9,8,0.97) 0%, rgba(26,18,14,0.93) 50%, rgba(11,9,8,0.98) 100%),
              url('https://charcoalbkk.com/wp-content/uploads/2023/09/DSCF2084-1-scaled.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.about-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 8vw; align-items: center; }
.about-image .scorch-frame { aspect-ratio: 4/5; }
.about-stats { display: flex; gap: 34px; margin-top: 30px; flex-wrap: wrap; }
.about-stats-centered { justify-content: center; align-items: center; text-align: center; margin-top: 24px; }
.about-stats > div { display: flex; flex-direction: column; }
.stat-num { font-family: 'Fraunces', serif; font-size: 30px; color: var(--ember); }
.stat-label { font-size: 12px; color: var(--smoke); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 4px; max-width: 12ch; }
@media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; } .about-image { order: -1; } }

/* ---------- signature dish ---------- */
.signature { background: linear-gradient(135deg, rgba(39,26,107,0.18) 0%, var(--char) 100%); }
.signature-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 8vw; align-items: center; }
.signature-image .scorch-frame { aspect-ratio: 5/4; }
.link-arrow { color: var(--gold); text-decoration: none; font-weight: 700; font-size: 14px; }
.link-arrow:hover { color: var(--ember); }
@media (max-width: 860px) { .signature-grid { grid-template-columns: 1fr; } }

/* ---------- menu ---------- */
.menu-head { text-align: center; margin-bottom: 30px; }
.menu-head .eyebrow, .menu-head .section-title { text-align: center; }
.menu-tabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 50px; }
.tab { background: transparent; border: 1px solid var(--line); color: var(--smoke); padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 700; letter-spacing: 0.03em; cursor: pointer; transition: all 0.3s ease; }
.tab-active { background: var(--ember); border-color: var(--ember); color: #17130f; }
.menu-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; }
.menu-item { padding: 22px 0; border-bottom: 1px solid var(--line); }
.menu-item-top { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; }
.menu-item-top h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 20px; margin: 0; color: var(--cream); }
.menu-price { color: var(--gold); font-weight: 700; font-size: 14px; white-space: nowrap; }
.menu-item p { color: var(--smoke); font-size: 14px; margin: 6px 0 0; max-width: 60ch; }

/* ---------- gallery ---------- */
.gallery { background: linear-gradient(180deg, rgba(39,26,107,0.92) 0%, rgba(11,9,8,0.24) 100%); }
.gallery-head { text-align: center; margin-bottom: 40px; }
.gallery-head .eyebrow, .gallery-head .section-title { text-align: center; }
.gallery-marquee-stack { display: flex; flex-direction: column; gap: 18px; overflow: hidden; }
.gallery-marquee-row { overflow: hidden; }
.gallery-marquee-track { display: flex; width: max-content; gap: 14px; padding: 4px 0; will-change: transform; }
.gallery-marquee-left { animation: gallery-marquee-left 70s linear infinite; }
.gallery-marquee-right { animation: gallery-marquee-right 70s linear infinite; }
.gallery-marquee-card { flex: 0 0 auto; overflow: hidden; border-radius: 8px; border: 1px solid rgba(245,237,227,0.08); box-shadow: 0 12px 28px rgba(0,0,0,0.25); }
.gallery-marquee-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.9s cubic-bezier(.22,.61,.36,1), filter 0.5s ease; filter: grayscale(15%) brightness(0.92); }
.gallery-marquee-card:hover img { transform: scale(1.16); filter: grayscale(0%) brightness(1); }
.gallery-follow { text-align: center; margin-top: 34px; }
.gallery-follow a { color: var(--gold); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
.gallery-follow a:hover { color: var(--ember); }
@keyframes gallery-marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes gallery-marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
@media (max-width: 760px) {
  .gallery-marquee-card { width: min(200px, 58vw); }
}

/* ---------- private dining ---------- */
.private-dining {
  background: #0f0c0b;
  text-align: center; position: relative; isolation: isolate; overflow: hidden;
  transition: transform 0.35s ease;
}
.private-dining:hover { transform: translateY(-2px); }
.private-dining::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('https://charcoalbkk.com/wp-content/uploads/2023/09/image-35.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.95;
  filter: saturate(1.25) contrast(1.05) brightness(1.3);
  z-index: -1;
}
.pd-content {
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  padding: 60px 45px;
}
.pd-content::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse at center, rgba(15, 12, 11, 0.88) 0%, rgba(15, 12, 11, 0.45) 70%, transparent 100%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 30px;
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, rgba(0, 0, 0, 0.85) 70%, transparent 100%);
  mask-image: radial-gradient(ellipse at center, black 30%, rgba(0, 0, 0, 0.85) 70%, transparent 100%);
}
@media (max-width: 640px) {
  .pd-content {
    padding: 40px 24px;
    margin: 0 16px;
  }
}
.pd-content .eyebrow, .pd-content .section-title, .pd-content .body-text { text-align: center; margin-left: auto; margin-right: auto; }
.pd-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }

/* ---------- reserve banner ---------- */
.reserve-banner { position: relative; padding: 130px 6vw; text-align: center; overflow: hidden; }
.reserve-bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; }
.reserve-scrim { position: absolute; inset: 0; background: rgba(11,9,8,0.78); }
.reserve-content { position: relative; z-index: 2; }
.reserve-content .section-title { text-align: center; }

/* ---------- footer ---------- */
.faq-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-top: 20px;
}
.faq-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(180deg, rgba(39, 26, 107, 0.72) 0%, rgba(11, 9, 8, 0.96) 100%), url('/faq1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.95;
  z-index: -1;
}
.faq-head { max-width: 760px; margin: 0 auto 32px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.faq-intro-text { margin-left: auto; margin-right: auto; text-align: center; }
.faq-list { display: grid; gap: 14px; max-width: 900px; margin: 0 auto; }
.faq-item { border: 1px solid var(--line); border-radius: 16px; background: linear-gradient(135deg, rgba(39,26,107,0.80), rgba(11,9,8,0.82)); overflow: hidden; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
.faq-item:hover { transform: translateY(-2px); border-color: rgba(186, 128, 96, 0.45); box-shadow: 0 16px 34px rgba(0,0,0,0.18); }
.faq-question { width: 100%; background: none; border: none; color: var(--cream); padding: 20px 22px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 700; text-align: left; cursor: pointer; transition: color 0.3s ease, transform 0.3s ease; }
.faq-question:hover { color: var(--gold); transform: translateX(2px); }
.faq-open { color: var(--gold); }
.faq-toggle { font-size: 20px; color: var(--ember); line-height: 1; transition: transform 0.3s ease; }
.faq-item:hover .faq-toggle { transform: rotate(90deg); }
.faq-answer { padding: 0 22px 20px; color: var(--smoke); line-height: 1.7; font-size: 15px; animation: faq-answer-in 0.3s ease; }
@keyframes faq-answer-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

.footer { background: linear-gradient(180deg, rgba(39, 26, 107, 0.7) 0%, rgba(255, 255, 255, 0.1) 100%); border-top: 1px solid var(--line); padding: 80px 8vw 30px; }
.footer-panel { display: grid; grid-template-columns: 1.1fr 0.8fr 1fr; gap: 24px; align-items: stretch; }
.footer-intro, .footer-details, .footer-map { background: rgba(245,237,227,0.03); border: 1px solid var(--line); border-radius: 20px; padding: 28px; position: relative; overflow: hidden; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
.footer-intro:hover, .footer-details:hover, .footer-map:hover { transform: translateY(-3px); border-color: rgba(186, 128, 96, 0.35); box-shadow: 0 18px 36px rgba(0,0,0,0.18); }
.footer-intro::before, .footer-details::before, .footer-map::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(39,26,107,0.16), transparent 60%); pointer-events: none; transition: opacity 0.35s ease; }
.footer-intro:hover::before, .footer-details:hover::before, .footer-map:hover::before { opacity: 0.8; }
.footer-wordmark { margin-bottom: 10px; }
.footer-title { font-family: 'Fraunces', serif; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.2; margin: 0 0 12px; color: var(--cream); max-width: 16ch; }
.footer h4 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 16px; color: var(--cream); margin: 0 0 16px; }
.footer-card { display: flex; flex-direction: column; gap: 8px; height: 100%; justify-content: center; }
.footer-line { display: flex; align-items: center; gap: 10px; color: var(--smoke); font-size: 14px; margin: 0; }
.footer-line svg { color: var(--ember); flex-shrink: 0; }
.socials { display: flex; gap: 12px; margin-top: 18px; }
.socials a { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--cream); transition: all 0.3s ease; }
.socials a:hover { border-color: var(--ember); color: var(--ember); transform: translateY(-2px); }
.footer-map iframe { width: 100%; height: 100%; min-height: 320px; border: 0; border-radius: 12px; filter: none; }
.footer-map { min-width: 0; }
.footer-brand-strip { margin-top: 28px; padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); text-align: center; }
.brand-strip-title { text-transform: uppercase; letter-spacing: 0.22em; font-size: 11px; color: var(--gold); margin: 0 0 14px; }
.brand-logos { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.brand-logo-card { position: relative; width: min(140px, 24vw); aspect-ratio: 4 / 2.2; overflow: hidden; border-radius: 999px; border: 1px solid var(--line); background: rgba(245,237,227,0.06); }
.brand-logo-card img { object-fit: cover; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 22px; padding-top: 16px; color: var(--smoke); font-size: 12.5px; }
.footer-soho-link { display: flex; align-items: center; transition: transform 0.3s ease; }
.footer-soho-link:hover { transform: scale(1.04); }
.footer-soho-logo { opacity: 0.8; transition: opacity 0.3s ease; filter: brightness(1.2); }
.footer-soho-link:hover .footer-soho-logo { opacity: 1; }
@media (max-width: 960px) { .footer-panel { grid-template-columns: 1fr; } }
`;
