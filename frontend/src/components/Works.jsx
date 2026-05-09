import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { productAPI } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

// ─── Works data ───────────────────────────────────────────────────────────────
// img/imgHover are placeholder colours; swap with real <img src> when ready

const WORKS = [
  {
    id: 1,
    title: "Ivory Kani Shawl",
    tag: "Heritage Collection",
    year: "2024",
    size: "large",
    bg: "#d6cfc4",
    bgHover: "#bfb5a8",
    accent: "#7a6a58",
    pattern: "diagonal",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Midnight Sozni",
    tag: "Embroidery",
    year: "2024",
    size: "small",
    bg: "#2a2824",
    bgHover: "#1a1816",
    accent: "#c8a870",
    pattern: "dots",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Celestial Sozni",
    tag: "New Arrival",
    year: "2025",
    size: "medium",
    bg: "#c8884a",
    bgHover: "#a86e38",
    accent: "#fff8ee",
    pattern: "wave",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297343/generated-image-september-13-2025---12_25pm-1-hqqfJyLM3nFBJx9m_wpq2lq.webp"
  },
  {
    id: 4,
    title: "Ethereal Bloom Wrap",
    tag: "Editorial",
    year: "2025",
    size: "medium",
    bg: "#7a8c6e",
    bgHover: "#5e6e54",
    accent: "#f0ece4",
    pattern: "grid",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297739/another_pose_drone_view_2K_202605090841_ifs6en.jpg"
  },
  {
    id: 5,
    title: "Moonlight Heritage",
    tag: "Collector's",
    year: "2025",
    size: "small",
    bg: "#c8a8a0",
    bgHover: "#a88880",
    accent: "#3a2824",
    pattern: "diagonal",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297390/make_her_turn_202604262035_ini7fa.jpg"
  },
  {
    id: 6,
    title: "Indigo Jamavar",
    tag: "Kani Loom",
    year: "2024",
    size: "large",
    bg: "#2e3a58",
    bgHover: "#1e2840",
    accent: "#c0b890",
    pattern: "wave",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297820/Slow_motion_Kashmiri_202604221512_uurvgn.jpg"
  },
  {
    id: 7,
    title: "Alabaster Plain",
    tag: "Minimal Edit",
    year: "2024",
    size: "small",
    bg: "#e8e4dc",
    bgHover: "#d4cfc4",
    accent: "#6a5a4a",
    pattern: "dots",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778298936/whatsapp-image-2026-02-24-at-12.07.13-pm-nDwkI9BqKa0ewNY5_upwcap.jpg"
  },
  {
    id: 8,
    title: "Ember Ring Shawl",
    tag: "Artisan Series",
    year: "2023",
    size: "medium",
    bg: "#8a3a28",
    bgHover: "#6e2c1e",
    accent: "#f0d8c0",
    pattern: "grid",
    image: "https://res.cloudinary.com/dy9t52cl1/image/upload/v1778298984/make_her_pose_202604261800_d6fxml.jpg"
  },
];

// ─── SVG patterns for placeholder texture ────────────────────────────────────

function PatternDef({ id, type, color }) {
  const c = color || "rgba(255,255,255,0.08)";
  if (type === "diagonal") return (
    <pattern id={id} patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="24" stroke={c} strokeWidth="1" />
    </pattern>
  );
  if (type === "dots") return (
    <pattern id={id} patternUnits="userSpaceOnUse" width="16" height="16">
      <circle cx="8" cy="8" r="1.5" fill={c} />
    </pattern>
  );
  if (type === "wave") return (
    <pattern id={id} patternUnits="userSpaceOnUse" width="40" height="20">
      <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke={c} strokeWidth="1" />
    </pattern>
  );
  // grid
  return (
    <pattern id={id} patternUnits="userSpaceOnUse" width="20" height="20">
      <path d="M20 0 L0 0 0 20" fill="none" stroke={c} strokeWidth="0.5" />
    </pattern>
  );
}

// ─── Single work card ────────────────────────────────────────────────────────

function WorkCard({ work, index }) {
  const cardRef   = useRef(null);
  const imageRef  = useRef(null);
  const overlayRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  // size → css dimensions
  const sizeMap = {
    large:  { aspectRatio: "3/4",    minWidth: "0" },
    medium: { aspectRatio: "4/5",    minWidth: "0" },
    small:  { aspectRatio: "1/1",    minWidth: "0" },
  };
  const dims = sizeMap[work.size];

  // hover: GSAP image scale + color morph
  const handleEnter = () => {
    setHovered(true);
    gsap.to(imageRef.current, {
      scale: 1.06,
      duration: 0.7,
      ease: "power3.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    setHovered(false);
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  // mouse parallax inside card
  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width  - 0.5;
    const my = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(imageRef.current, {
      x: mx * 12,
      y: my * 8,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMoveLeave = () => {
    gsap.to(imageRef.current, {
      x: 0, y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
    });
  };

  const patternId = `pat-${work.id}`;
  const patternIdH = `pat-h-${work.id}`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={() => { handleLeave(); handleMoveLeave(); }}
      onMouseMove={handleMove}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "crosshair",
        borderRadius: "4px",
        ...dims,
      }}
    >
      {/* ── base image (placeholder SVG) ── */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: "-6%",
          willChange: "transform",
        }}
      >
        {work.image ? (
          <img 
            src={work.image} 
            alt={work.title} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block" 
            }} 
          />
        ) : (
          <svg width="100%" height="100%" style={{ display: "block" }}>
            <defs>
              <PatternDef id={patternId} type={work.pattern} />
            </defs>
            <rect width="100%" height="100%" fill={work.bg} />
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>
        )}

        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            background: work.image ? "rgba(0,0,0,0.2)" : "transparent",
          }}
        >
          {!work.image && (
            <svg width="100%" height="100%" style={{ display: "block" }}>
              <defs>
                <PatternDef id={patternIdH} type={work.pattern} color="rgba(255,255,255,0.13)" />
              </defs>
              <rect width="100%" height="100%" fill={work.bgHover} />
              <rect width="100%" height="100%" fill={`url(#${patternIdH})`} />
            </svg>
          )}
        </div>
      </div>

      {/* ── bottom gradient ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "60%",
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ── tag top-left ── */}
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.07 + 0.4, duration: 0.5 }}
        style={{
          position: "absolute",
          top: 14, left: 14,
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <span style={{
          fontSize: "8.5px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'Helvetica Neue', sans-serif",
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(6px)",
          padding: "3px 8px",
          borderRadius: "20px",
        }}>
          {work.tag}
        </span>
      </motion.div>

      {/* ── year top-right ── */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        fontSize: "9px",
        color: "rgba(255,255,255,0.35)",
        fontFamily: "'Helvetica Neue', sans-serif",
        letterSpacing: "0.1em",
      }}>
        {work.year}
      </div>

      {/* ── title bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.07 + 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: work.size === "large" ? "22px" : work.size === "medium" ? "18px" : "15px",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {work.title}
        </motion.p>

        {/* hover arrow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "8px",
              }}
            >
              <span style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: work.accent,
                fontFamily: "'Helvetica Neue', sans-serif",
              }}>
                View piece
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M0 4h10M7 1l3 3-3 3" stroke={work.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Animated heading word split ─────────────────────────────────────────────

function SplitHeading({ text, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.28em", ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            display="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

// ─── Main OurWorks component ──────────────────────────────────────────────────

export default function OurWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const lineRef   = useRef(null);
  const countRef  = useRef(null);
  const isHeaderView = useInView(headerRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts();
        const data = response.data.data;
        
        // Map API data to Works format
        const mappedWorks = data.map((product, index) => ({
          id: product._id,
          title: product.name,
          tag: product.category,
          year: new Date(product.createdAt).getFullYear().toString(),
          image: product.media_urls[0],
          size: index === 0 || index === 5 ? "large" : index % 2 === 0 ? "medium" : "small",
          bg: product.bg || "#d6cfc4",
          bgHover: product.bgHover || "#bfb5a8",
          accent: product.accent || "#c8a870",
          pattern: product.pattern || "diagonal"
        }));

        setWorks(mappedWorks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to static data if API fails
        setWorks(WORKS);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isHeaderView && !loading) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.1, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(countRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.55 }
      );
    }
  }, [isHeaderView]);

  return (
    <section className="bg-[#faf9f6] min-h-screen pt-16 pb-20 px-6 md:pt-24 md:pb-32 md:px-12 font-serif relative overflow-hidden">

      {/* ── background watermark ── */}
      <div style={{
        position: "absolute",
        top: "8%",
        right: "-4%",
        fontSize: "clamp(60px, 16vw, 200px)",
        fontFamily: "Georgia, serif",
        fontWeight: 400,
        color: "#f0ece4",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        zIndex: 0,
        textAlign: "right",
        width: "100%",
      }}>
        Works
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-12 md:mb-20">

          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={isHeaderView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#a09080",
              fontFamily: "'Helvetica Neue', sans-serif",
              marginBottom: "20px",
            }}
          >
            Selected pieces · Kashmir, India
          </motion.p>

          {/* split headline */}
          <SplitHeading
            text="Our Works"
            style={{
              fontSize: "clamp(42px, 8vw, 100px)",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "#1a1714",
              margin: "0 0 24px",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          />

          {/* rule + count row */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 mt-3">
            <div
              ref={lineRef}
              style={{
                flex: 1,
                height: "1px",
                background: "#d4cec4",
                transformOrigin: "left center",
              }}
            />
            <p
              ref={countRef}
              style={{
                fontSize: "11px",
                color: "#a09080",
                fontFamily: "'Helvetica Neue', sans-serif",
                letterSpacing: "0.12em",
                opacity: 0,
              }}
            >
              {works.length} pieces
            </p>

            {/* sub copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: "13px",
                color: "#6a5a4a",
                fontFamily: "Georgia, serif",
                maxWidth: "280px",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Each piece is hand-woven in Kashmir from the world's finest pashm — a craft unchanged for five centuries.
            </motion.p>
          </div>
        </div>

        {/* ── Asymmetric grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-min gap-4 md:gap-3">
          {works.map((work, index) => {
            // Define grid spans based on index to maintain asymmetric layout
            const gridClasses = [
              "lg:col-span-5 lg:col-start-1 lg:row-span-7 lg:row-start-1",
              "lg:col-span-3 lg:col-start-6 lg:row-span-4 lg:row-start-1",
              "lg:col-span-4 lg:col-start-9 lg:row-span-5 lg:row-start-1",
              "lg:col-span-4 lg:col-start-6 lg:row-span-5 lg:row-start-5",
              "lg:col-span-3 lg:col-start-10 lg:row-span-4 lg:row-start-6",
              "lg:col-span-4 lg:col-start-1 lg:row-span-7 lg:row-start-9",
              "lg:col-span-3 lg:col-start-5 lg:row-span-4 lg:row-start-10",
              "lg:col-span-5 lg:col-start-8 lg:row-span-6 lg:row-start-10"
            ];
            
            return (
              <div key={work.id} className={`col-span-1 ${gridClasses[index % gridClasses.length]}`}>
                <WorkCard work={work} index={index} />
              </div>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            paddingTop: "32px",
            borderTop: "1px solid #e4dfd6",
          }}
        >
          <p style={{
            fontSize: "13px",
            color: "#7a6a5a",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            margin: 0,
          }}>
            Each shawl is a unique piece — no two are identical.
          </p>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#1a1714",
              fontFamily: "'Helvetica Neue', sans-serif",
              textDecoration: "none",
              borderBottom: "1px solid #1a1714",
              paddingBottom: "2px",
            }}
          >
            View full collection
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5h12M8 1l4 4-4 4" stroke="#1a1714" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}