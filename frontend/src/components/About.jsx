import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-40 bg-brand-cream text-brand-black text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-8 block">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-10 italic">
            "Preserving the timeless beauty of Kashmiri heritage for the modern world."
          </h2>
          <p className="text-lg leading-relaxed text-brand-black/60 font-light">
            Founded in the heart of Srinagar, Noorson is dedicated to the revival 
            and promotion of authentic Kashmiri crafts. We collaborate directly with 
            master weavers and embroiderers to bring you the finest Pashmina shawls, 
            each telling a unique story of tradition and luxury.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
