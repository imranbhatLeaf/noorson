import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVid1 from '../assets/videoes/herovid.mp4';
import heroVid2 from '../assets/videoes/hero2.mp4';
import heroVid3 from '../assets/videoes/hero3.mp4';
import heroVid4 from '../assets/videoes/hero4.mp4';

const HERO_VIDEOS = [heroVid1, heroVid2, heroVid3, heroVid4];

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const leftTitleRef = useRef(null);
  const rightTitleRef = useRef(null);
  const linesRef = useRef([]);
  const [videoIndex, setVideoIndex] = React.useState(0);

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // Animation 1: Video shrinks
      const isMobile = window.innerWidth < 768;
      tl.to(videoContainerRef.current, {
        width: isMobile ? "85vw" : "45vw",
        height: isMobile ? "40vh" : "55vh",
        borderRadius: "2px",
        ease: "power2.inOut",
      });

      // Animation 2: Text and Lines fade in
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
      }, "<");

      // Animation 3: Title parts sliding in
      tl.fromTo(leftTitleRef.current, 
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.5"
      );

      tl.fromTo(rightTitleRef.current, 
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "<"
      );

      // Animation 4: Luxurious Lines scaling
      linesRef.current.forEach((line, i) => {
        tl.fromTo(line, 
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-brand-cream overflow-hidden">
      {/* Background/Initial State: Fullscreen Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={videoContainerRef} 
          className="relative w-screen h-screen overflow-hidden z-10 will-change-transform shadow-2xl"
        >
          <video
            ref={videoRef}
            key={HERO_VIDEOS[videoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Frame Elements & Typography */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 flex items-center justify-center"
      >
        <div className="relative w-[70vw] h-[75vh] flex items-center justify-center">
          
          {/* Luxurious Lines */}
          <div ref={el => linesRef.current[0] = el} className="absolute top-0 left-0 w-full h-[1px] bg-brand-gold/40 origin-left" />
          <div ref={el => linesRef.current[1] = el} className="absolute bottom-0 right-0 w-full h-[1px] bg-brand-gold/40 origin-right" />
          <div ref={el => linesRef.current[2] = el} className="absolute left-10 top-0 h-full w-[1px] bg-brand-gold/20 origin-top hidden md:block" />
          <div ref={el => linesRef.current[3] = el} className="absolute right-10 top-0 h-full w-[1px] bg-brand-gold/20 origin-bottom hidden md:block" />

          {/* NOORSON text - positioned left and higher than CASHMERE */}
          <div className="absolute top-[12%] md:top-[20%] left-[-2%] z-30">
            <h2 ref={leftTitleRef} className="text-4xl md:text-8xl font-serif text-brand-black tracking-tighter opacity-80">
              NOORSON
            </h2>
          </div>

          {/* CASHMERE text - smaller size as requested */}
          <div className="absolute bottom-[12%] md:bottom-[20%] right-[-2%] z-30 text-right">
            <h2 ref={rightTitleRef} className="text-3xl md:text-7xl font-serif text-brand-black tracking-tighter">
              CASHMERE
            </h2>
            <p className="text-[7px] md:text-[9px] uppercase tracking-[0.5em] text-brand-gold mt-2">
              Heritage Sozni Artistry
            </p>
          </div>

          {/* Secondary Details */}
          <div className="absolute top-4 right-4 text-right hidden md:block">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold/60">Established</span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-black">Srinagar — 1978</p>
          </div>

          <div className="absolute bottom-4 left-4 hidden md:block">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold/60">Collection</span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-black">Winter Lookbook 24/25</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 mix-blend-difference text-white">
        <span className="text-[9px] uppercase tracking-[0.3em] opacity-60">Scroll to Reveal</span>
        <div className="w-[1px] h-12 bg-white/30" />
      </div>
    </section>
  );
};

export default Hero;
