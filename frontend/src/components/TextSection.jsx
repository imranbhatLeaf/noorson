import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, {
        type: "words",
      });

      const mm = gsap.matchMedia();

      // ======================
      // 💻 DESKTOP
      // ======================
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          split.words,
          {
            opacity: 0,
            filter: "blur(10px)",
            y: 40,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });

      // ======================
      // 📱 MOBILE
      // ======================
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          split.words,
          {
            opacity: 0,
            filter: "blur(6px)",
            y: 30,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 95%",   // 🔥 earlier trigger
              end: "top 60%",     // 🔥 bigger range
              scrub: 0.5,         // 🔥 smoother feel
            },
          }
        );
      });

      return () => {
        split.revert();
        mm.revert();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 sm:py-32">
      <div className="px-4 sm:px-6 lg:container lg:mx-auto">
        <h2
          ref={textRef}
          className="font-helvetica text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-black/80 leading-tight"
        >
          Premium Quality Pashmina for the world to see.
        </h2>
      </div>
    </section>
  );
};

export default TextSection;