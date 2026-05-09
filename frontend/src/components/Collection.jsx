import React from 'react';
import { motion } from 'framer-motion';

const items = [
  {
    id: 1,
    title: 'Ivory Heritage',
    category: 'Hand-Embroidered',
    image: '/item1.png',
  },
  {
    id: 2,
    title: 'Charcoal Elegance',
    category: 'Sozni Collection',
    image: '/item2.png',
  },
  {
    id: 3,
    title: 'Midnight Sozni',
    category: 'Premium Pashmina',
    image: '/item1.png', // Reusing for placeholder
  }
];

const CollectionItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden mb-6 bg-brand-black/5 aspect-[4/5]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 block mb-2">
        {item.category}
      </span>
      <h3 className="text-2xl font-serif mb-1">{item.title}</h3>
      <div className="w-0 group-hover:w-full h-[1px] bg-brand-gold transition-all duration-500" />
    </motion.div>
  );
};

const Collection = () => {
  return (
    <section className="py-32 px-6 bg-brand-cream">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">The Lookbook Collection</h2>
          </div>
          <a href="#" className="text-xs uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors mt-8 md:mt-0">
            View All Pieces
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {items.map((item, index) => (
            <CollectionItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
