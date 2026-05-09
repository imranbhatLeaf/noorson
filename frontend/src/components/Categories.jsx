import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import c1 from '../assets/images/c1.jpeg';
import c2 from '../assets/images/c2.jpeg';
import c3 from '../assets/images/c3.jpeg';
import c4 from '../assets/images/c4.jpeg';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: 1,
    title: "Kani Weaves",
    desc: "Woven using eyeless wooden bobbins.",
    image: c1,
    tint: "#fdf8f0",
  },
  {
    id: 2,
    title: "Sozni Embroidery",
    desc: "Microscopic needlework by master artisans.",
    image: c2,
    tint: "#f0f4fd",
  },
  {
    id: 3,
    title: "Solid Pashmina",
    desc: "The pure, unadorned elegance of fine pashm.",
    image: c3,
    tint: "#fdf0f0",
  },
  {
    id: 4,
    title: "Reversible Magic",
    desc: "Akreksi weave, dual colors, one masterwork.",
    image: c4,
    tint: "#f0fdf4",
  }
];

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    // Reveal image
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out"
    });
    // Invert text color if needed, or just change to white to stand out against the dark image
    gsap.to(textRef.current, {
      color: "#ffffff",
      y: -10,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    // Hide image partially
    gsap.to(imageRef.current, {
      opacity: 0.15,
      scale: 1.15,
      duration: 0.5,
      ease: "power2.inOut"
    });
    // Restore text color
    gsap.to(textRef.current, {
      color: "#1a1714",
      y: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  return (
    <div 
      ref={cardRef}
      className="category-card relative w-full aspect-[4/5] md:aspect-square flex flex-col justify-end p-8 md:p-12 overflow-hidden border border-[#e4dfd6]/50 cursor-pointer"
      style={{ backgroundColor: category.tint }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Image Overlay */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 opacity-[0.15] scale-110 pointer-events-none"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Placeholder subtle gradient over the image so text is always readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-[#1a1714]">
        <h3 className="text-3xl md:text-5xl font-['Helvetica_Neue',Helvetica,sans-serif] font-light tracking-tight mb-4">
          {category.title}
        </h3>
        <p className="text-sm md:text-base font-['Helvetica_Neue',Helvetica,sans-serif] font-light opacity-80 max-w-[80%]">
          {category.desc}
        </p>
      </div>

      {/* Top right numbering */}
      <div className="absolute top-8 right-8 z-10 mix-blend-difference text-white">
        <span className="text-xs tracking-[0.2em] font-['Helvetica_Neue',Helvetica,sans-serif]">
          0{index + 1}
        </span>
      </div>
    </div>
  );
};

const Categories = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.category-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-[#faf9f6]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <h2 className="text-5xl md:text-7xl font-['Helvetica_Neue',Helvetica,sans-serif] font-light tracking-tighter text-[#1a1714]">
            The Collections.
          </h2>
          <p className="max-w-xs text-sm font-['Helvetica_Neue',Helvetica,sans-serif] text-[#6a5a4a] leading-relaxed">
            Discover our curated categories, each representing the pinnacle of Kashmiri craftsmanship and heritage.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
