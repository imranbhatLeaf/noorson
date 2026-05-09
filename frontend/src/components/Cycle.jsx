import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import goatImg from "../assets/images/goat.jpeg";
import img2 from "../assets/images/2.jpeg";
import img3 from "../assets/images/3.jpeg";
import img4 from "../assets/images/4.jpeg";
import img5 from "../assets/images/5.jpeg";
import img6 from "../assets/images/6.jpeg";
import shawlImg from "../assets/images/shawl.jpeg";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const STAGES = [
  {
    id: 0,
    label: "Changthangi Goat",
    sub: "High-altitude Ladakh, 4500m+",
    detail:
      "The Changthangi goat lives on the Changthang plateau. In winter, it grows a dense inner fleece — pashm — to survive temperatures of −40°C.",
    angle: 0,
    accent: "#8b6b52",
    image: goatImg,
  },
  {
    id: 1,
    label: "Spring Combing",
    sub: "Hand-combed, not shorn",
    detail:
      "Each spring, nomads gently comb — never shear — the fleece. One goat yields just 80–170 g of raw pashm. It takes 3–4 goats for a single shawl.",
    angle: 51.4,
    accent: "#9b7820",
    image: img2,
  },
  {
    id: 2,
    label: "Raw Sorting",
    sub: "Coarse guard hair removed",
    detail:
      "Raw pashm is sorted by hand to remove coarse guard hairs. Only the finest fibers — under 12–16 microns — make the cut. This is the first quality gate.",
    angle: 102.8,
    accent: "#4e7248",
    image: img3,
  },
  {
    id: 3,
    label: "Spinning",
    sub: "Spindle-spun by women artisans",
    detail:
      "Women in Kashmir spin pashm on a simple wooden spindle called a yinder. No machine can replicate this. The thread produced is gossamer-thin and incredibly strong.",
    angle: 154.2,
    accent: "#3e6080",
    image: img4,
  },
  {
    id: 4,
    label: "Dyeing",
    sub: "Natural & vegetable dyes",
    detail:
      "Spun yarn is dyed using traditional plant-based dyes — walnut husk, marigold, indigo, saffron. Master dyers (rangrez) work from generational memory.",
    angle: 205.7,
    accent: "#7e3e60",
    image: img5,
  },
  {
    id: 5,
    label: "Warping",
    sub: "Loom preparation",
    detail:
      "Dyed threads are carefully wound onto the loom — a precise, meditative process that sets the foundation for the weave. A single shawl loom takes days to warp.",
    angle: 257.1,
    accent: "#5e3e7e",
    image: img6,
  },
  {
    id: 6,
    label: "Hand Weaving",
    sub: "Kani or Twill on the loom",
    detail:
      "Master weavers (karkana) spend months at the loom. Kani shawls use tiny wooden bobbins for each color. A 2×1 m shawl may take 18 months to complete.",
    angle: 308.5,
    accent: "#3e4e7e",
    image: shawlImg,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const R        = 195;
const CX       = 280;
const CY       = 280;
const NODE_R   = 32;   // inactive radius
const NODE_R_A = 50;   // active radius (zoom)
const N        = STAGES.length;
const DEG_STEP = 360 / N;

function polarToXY(angleDeg, r = R) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

// ─── Placeholder node ────────────────────────────────────────────────────────

function PlaceholderNode({ stage, active }) {
  const pos  = polarToXY(stage.angle);
  const r    = active ? NODE_R_A : NODE_R;
  const sq   = (r - 8) * 2;

  return (
    <g
      className="orbit-node"
      data-id={stage.id}
      style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
    >
      {/* glow halo when active */}
      <circle
        cx={pos.x} cy={pos.y} r={r + 8}
        fill="none"
        stroke={stage.accent}
        strokeWidth={active ? 1 : 0}
        opacity={active ? 0.25 : 0}
        style={{ transition: "all 0.6s ease" }}
      />

      {/* white circle card */}
      <circle
        cx={pos.x} cy={pos.y} r={r}
        fill="#ffffff"
        stroke={active ? stage.accent : "#e2dbd2"}
        strokeWidth={active ? 1.5 : 0.8}
        style={{ transition: "r 0.5s ease, stroke 0.4s ease, stroke-width 0.4s ease" }}
      />

      {/* node image */}
      <clipPath id={`clip-${stage.id}`}>
        <circle cx={pos.x} cy={pos.y} r={r - 2} />
      </clipPath>
      <image
        href={stage.image}
        x={pos.x - r}
        y={pos.y - r}
        width={r * 2}
        height={r * 2}
        clipPath={`url(#clip-${stage.id})`}
        preserveAspectRatio="xMidYMid slice"
        style={{ 
          opacity: active ? 1 : 0.7,
          transition: "all 0.5s ease" 
        }}
      />

      {/* number badge */}
      <text
        x={pos.x} y={pos.y + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={active ? 15 : 10}
        fontFamily="'Helvetica Neue', sans-serif"
        fontWeight={active ? "600" : "400"}
        fill={active ? stage.accent : "#9a9088"}
        style={{ transition: "font-size 0.4s ease, fill 0.4s ease" }}
      >
        {String(stage.id + 1).padStart(2, "0")}
      </text>

      {/* label text — counter-rotated by JS */}
      <text
        className="node-label"
        x={pos.x}
        y={pos.y + r + 18}
        textAnchor="middle"
        fontSize={window.innerWidth < 768 ? (active ? 13 : 11) : (active ? 10.5 : 9)}
        fontFamily="Georgia, serif"
        fill={active ? stage.accent : "#a09080"}
        fontWeight={active ? "600" : "400"}
        style={{ transition: "fill 0.4s ease, font-size 0.4s ease" }}
      >
        {stage.label}
      </text>
    </g>
  );
}

// ─── Detail panel with Framer Motion ─────────────────────────────────────────

const variants = {
  enter:  { opacity: 0, y: 28, filter: "blur(6px)" },
  center: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit:   {
    opacity: 0, y: -18, filter: "blur(4px)",
    transition: { duration: 0.28, ease: "easeIn" },
  },
};

function DetailPanel({ stage, index }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        style={{ 
          position: window.innerWidth < 1024 ? "relative" : "absolute", 
          inset: 0 
        }}
      >
        {/* Background visual with Framer Motion animation */}
        <motion.div
          key={`bg-${stage.id}`}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: "-20%",
            zIndex: -1,
            backgroundImage: `url(${stage.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
            pointerEvents: "none",
          }}
        />
        {/* ghost number */}
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "100px",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            color: "#f2ede6",
            lineHeight: 1,
            margin: "0 0 -30px",
            userSelect: "none",
            letterSpacing: "-0.03em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.p>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            color: stage.accent,
            margin: "0 0 10px",
            lineHeight: 1.1,
          }}
        >
          {stage.label}
        </motion.h2>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a09080",
            margin: "0 0 24px",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          {stage.sub}
        </motion.p>

        {/* animated rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "left center",
            width: "52px",
            height: "1px",
            background: stage.accent,
            marginBottom: "24px",
            opacity: 0.55,
          }}
        />

        {/* body */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "15px",
            color: "#584838",
            lineHeight: "1.9",
            fontFamily: "Georgia, serif",
            maxWidth: "390px",
            margin: 0,
          }}
        >
          {stage.detail}
        </motion.p>

        {/* pill bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          style={{ display: "flex", gap: "5px", marginTop: "40px" }}
        >
          {STAGES.map((_, j) => (
            <div
              key={j}
              style={{
                height: "4px",
                borderRadius: "2px",
                background: j === index ? stage.accent : "#ddd8d0",
                width: j === index ? "32px" : "4px",
                transition: "width 0.45s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function PashminaLifecycle() {
  const sectionRef = useRef(null);
  const wheelRef   = useRef(null);
  const needleRef  = useRef(null);
  const activeRef  = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const totalDeg = DEG_STEP * (N - 1);
  const active   = STAGES[activeIdx];

  useEffect(() => {
    const section = sectionRef.current;
    const wheel   = wheelRef.current;

    // entry animation
    gsap.fromTo(wheel,
      { opacity: 0, scale: 0.88, rotation: 12 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.3, ease: "expo.out", delay: 0.1 }
    );

    // scroll-pinned rotation
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${N * (window.innerWidth < 768 ? 160 : 310)}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate(self) {
        const progress = self.progress;
        const deg = progress * totalDeg;

        gsap.set(wheel, { rotation: -deg, transformOrigin: "50% 50%" });

        // keep labels upright
        section.querySelectorAll(".node-label").forEach((el) => {
          gsap.set(el, { rotation: deg, transformOrigin: "50% 50%" });
        });

        const next = Math.min(Math.round(progress * (N - 1)), N - 1);
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActiveIdx(next);

          // pop the newly active node
          const nodes = section.querySelectorAll(".orbit-node");
          nodes.forEach((el, i) => {
            if (i === next) {
              gsap.timeline()
                .to(el, { scale: 0.8, duration: 0.12, ease: "power2.in",  transformOrigin: "50% 50%" })
                .to(el, { scale: 1,   duration: 0.6,  ease: "elastic.out(1, 0.55)", transformOrigin: "50% 50%" });
            } else {
              gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out", transformOrigin: "50% 50%" });
            }
          });
        }
      },
    });

    // needle heartbeat
    gsap.to(needleRef.current, {
      scale: 1.15,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 100%",
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white font-serif overflow-hidden relative"
    >
      {/* top accent bar — changes color with stage */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: active.accent,
        transition: "background 0.7s cubic-bezier(0.22,1,0.36,1)",
        opacity: 0.6,
      }} />

      {/* bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "#ede8e0",
      }} />

      {/* layout */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14 max-w-[1120px] w-full px-6 md:px-12 relative z-10 pt-20 lg:pt-0">

        {/* ── Wheel ── */}
        <div className="shrink-0 relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-[560px] aspect-square">

          {/* scroll label */}
          <div style={{
            position: "absolute", top: -44, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{ width: "24px", height: "1px", background: "#d0c8be" }} />
            <span style={{
              fontSize: "8.5px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#b0a090",
              fontFamily: "'Helvetica Neue', sans-serif",
              whiteSpace: "nowrap",
            }}>
              scroll to explore
            </span>
            <div style={{ width: "24px", height: "1px", background: "#d0c8be" }} />
          </div>

          <svg
            ref={wheelRef}
            viewBox="0 0 560 560"
            className="w-full h-full overflow-visible opacity-0"
          >
            {/* outer dashed track */}
            <circle cx={CX} cy={CY} r={R + 34} fill="none" stroke="#ede8e0" strokeWidth="1" strokeDasharray="2 10" />

            {/* orbit track */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e8e2d8" strokeWidth="0.8" />

            {/* inner ring */}
            <circle cx={CX} cy={CY} r={R - 60} fill="none" stroke="#f2ede6" strokeWidth="0.5" />

            {/* spokes */}
            {STAGES.map((s) => {
              const a = polarToXY(s.angle, 72);
              const b = polarToXY(s.angle, R - 36);
              return (
                <line key={s.id}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#e8e2d8" strokeWidth="0.5"
                />
              );
            })}

            {/* nodes */}
            {STAGES.map((s, i) => (
              <PlaceholderNode key={s.id} stage={s} active={i === activeIdx} />
            ))}

            {/* hub */}
            <circle cx={CX} cy={CY} r={60} fill="#ffffff" stroke="#ede8e0" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={52} fill="#fafaf8" stroke="#f0ebe3" strokeWidth="0.5" />
            <text x={CX} y={CY - 7} textAnchor="middle" fontSize="10" fill="#8a7060"
              fontFamily="Georgia, serif" letterSpacing="0.12em">PASHMINA</text>
            <text x={CX} y={CY + 9} textAnchor="middle" fontSize="7" fill="#b0a090"
              fontFamily="'Helvetica Neue', sans-serif" letterSpacing="0.22em">LIFECYCLE</text>

            {/* needle */}
            <g ref={needleRef}>
              <polygon
                points={`${CX},${CY - R - 16} ${CX - 5},${CY - R + 5} ${CX + 5},${CY - R + 5}`}
                fill={active.accent}
                opacity="0.92"
                style={{ transition: "fill 0.6s ease" }}
              />
              <circle cx={CX} cy={CY - R + 5} r={3} fill={active.accent} opacity="0.45"
                style={{ transition: "fill 0.6s ease" }} />
            </g>
          </svg>
        </div>

        {/* ── Detail panel ── */}
        <div className="flex-1 w-full relative min-h-[280px] lg:min-h-[340px] mt-12 lg:mt-0 flex flex-col items-center text-center lg:items-start lg:text-left">
          <p style={{
            fontSize: "8.5px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#c0b0a0",
            marginBottom: "28px",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}>
            Life cycle of Pashmina · {activeIdx + 1} / {N}
          </p>

          <DetailPanel stage={active} index={activeIdx} />
        </div>
      </div>
    </section>
  );
}