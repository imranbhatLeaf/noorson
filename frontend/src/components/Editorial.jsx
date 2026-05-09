import React from 'react';
import { motion } from 'framer-motion';

const Editorial = () => {
  return (
    <section className="py-32 bg-brand-black text-brand-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-6 block">
              The Craftsmanship
            </span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              A Thousand Stitches <br /> of Pure Luxury
            </h2>
            <p className="text-lg font-light leading-relaxed mb-12 text-brand-cream/70 max-w-lg">
              Each Noorson shawl is a masterpiece that takes months of meticulous hand-embroidery. 
              Our artisans use techniques passed down through generations to create the 
              intricate Sozni patterns that define Kashmiri excellence.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-2">400+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Hours per Piece</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-2">100%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Pure Pashmina</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="order-1 lg:order-2 relative aspect-[4/5]"
          >
            <img 
              src="/item2.png" 
              alt="Detail of Sozni Embroidery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[20px] border-brand-black/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
