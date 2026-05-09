import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      gsap.to(navRef.current, {
        top: isMobile ? "1.5rem" : "2.5rem", 
        y: 0,
        scale: isMobile ? 0.45 : 0.6,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "400px",
          scrub: 1,
        }
      });

      gsap.to(menuBtnRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: "body",
          start: "200px top",
          end: "400px top",
          scrub: 1,
        }
      });

      // Detect when footer enters viewport to change navbar colors
      ScrollTrigger.create({
        trigger: "footer",
        start: "top 5rem",
        onEnter: () => setIsFooterVisible(true),
        onLeaveBack: () => setIsFooterVisible(false)
      });
    });

    return () => ctx.revert();
  }, []);

  const boxVariants = {
    closed: {
      opacity: 0,
      y: -15,
      scale: 0.98,
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeIn"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <div 
        ref={navRef}
        className="fixed top-1/2 left-0 w-full z-[100] -translate-y-1/2 flex justify-center items-center pointer-events-none"
      >
        <div 
          ref={containerRef}
          className="w-full flex justify-center items-center pointer-events-auto bg-transparent relative px-6 md:px-12"
        >
          <h1 className={`text-4xl md:text-7xl font-serif tracking-[0.4em] cursor-pointer mix-blend-difference z-10 transition-colors duration-500 ${isFooterVisible ? 'text-white mix-blend-normal' : 'text-brand-black'}`}>
            NOORSON
          </h1>

          <button 
            ref={menuBtnRef}
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 md:right-6 opacity-0 pointer-events-none flex items-center group z-[110] p-2"
          >
            {/* Hamburger Icon Only */}
            <div className="w-8 h-[14px] relative">
              <span className={`absolute right-0 h-[1.5px] transition-all duration-300 ${isFooterVisible ? 'bg-white' : 'bg-black'} ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45 w-full' : 'top-0 w-full'}`}></span>
              <span className={`absolute right-0 h-[1.5px] transition-all duration-300 ${isFooterVisible ? 'bg-white' : 'bg-black'} ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45 w-full' : 'bottom-0 w-5 group-hover:w-full'}`}></span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={boxVariants}
            className="fixed top-24 right-6 md:right-12 w-56 md:w-64 bg-[#0a0a0a] z-[105] flex flex-col shadow-2xl"
          >
            <div className="flex flex-col py-6 px-8 gap-5">
              {['Our Works', 'Heritage', 'Journal', 'Connect'].map((item, i) => (
                <div key={item} className="overflow-hidden">
                  <motion.a 
                    href="#"
                    custom={i}
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className="font-helvetica text-sm md:text-base tracking-wide text-white/80 hover:text-white transition-colors block"
                  >
                    {item}
                  </motion.a>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 px-8 py-4">
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-helvetica">Srinagar — 1978</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
