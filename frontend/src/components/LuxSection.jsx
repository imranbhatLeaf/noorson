import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import shawlImg from "../assets/images/shawl.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LuxSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  const desktopTextRef = useRef(null);
  const mobileTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================
      // 💻 DESKTOP
      // =========================
      mm.add("(min-width: 1024px)", () => {

        // subtle image zoom
        gsap.fromTo(
          imageRef.current,
          { scale: 1.05 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );

        // ✨ SplitText (lines)
        const split = new SplitText(desktopTextRef.current, {
          type: "lines",
        });

        gsap.fromTo(
          split.lines,
          {
            opacity: 0,
            y: 60,
            filter: "blur(0px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.10,
            duration: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: desktopTextRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );

        return () => split.revert();
      });

      // =========================
      // 📱 MOBILE
      // =========================
      mm.add("(max-width: 1023px)", () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            scrub: true,
            pin: true,
          },
        });

        // image fade + zoom
        tl.to(imageRef.current, {
          opacity: 0.2,
          scale: 1.05,
          ease: "none",
        });

        // white overlay rises (partially visible start)
        tl.fromTo(
          overlayRef.current,
          { y: "60%" },
          { y: "0%", ease: "none" },
          "<"
        );

        // ✨ SplitText (lines for mobile)
        const splitMobile = new SplitText(mobileTextRef.current, {
          type: "lines",
        });

        gsap.fromTo(
          splitMobile.lines,
          {
            opacity: 0,
            y: 40,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: mobileTextRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          }
        );

        return () => splitMobile.revert();
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden">

      {/* FULL WIDTH MOBILE / CONSTRAINED DESKTOP */}
      <div className="w-full lg:container lg:mx-auto lg:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] min-h-screen">

          {/* ================= IMAGE ================= */}
          <div className="relative w-full h-screen lg:h-auto md:rounded-2xl overflow-hidden">
            <img
              ref={imageRef}
              src={shawlImg}
              alt="Pashmina Shawl"
              className="w-full h-full object-cover"
            />

            {/* 📱 MOBILE OVERLAY */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-white flex items-center justify-center px-6 lg:hidden"
              style={{ transform: "translateY(60%)" }}
            >
              <div
                ref={mobileTextRef}
                className="text-center max-w-md text-3xl font-serif leading-tight"
              >
                Pure Sozni Heritage inspires timeless craftsmanship rooted in tradition
              </div>
            </div>
          </div>

          {/* ================= DESKTOP TEXT ================= */}
          <div className="hidden lg:flex items-center justify-center px-12 xl:px-20">
            <div
              ref={desktopTextRef}
              className="max-w-2xl text-5xl xl:text-6xl font-serif leading-tight"
            >
              Pure Sozni Heritage inspires timeless craftsmanship rooted in tradition
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LuxSection;