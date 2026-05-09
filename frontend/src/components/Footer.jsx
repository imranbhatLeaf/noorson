import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-cream pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Inquire About a Piece</h2>
          <p className="text-brand-cream/60 mb-12 max-w-md">
            Our collection consists of one-of-a-kind heritage pieces. 
            Contact us for pricing and international shipping details.
          </p>
          <a
            href="https://wa.me/910000000000?text=I%20am%20interested%20in%20learning%20more%20about%20your%20Pashmina%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-12 py-5 bg-brand-gold text-brand-black uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white transition-colors group"
          >
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            Contact on WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-brand-cream/10 pt-12 text-sm opacity-60 font-light">
          <div>
            <h4 className="text-white uppercase tracking-widest mb-6">Noorson</h4>
            <p>Srinagar, Kashmir <br /> India</p>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Collection</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Process</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest mb-6">Client Service</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Inquiries</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest mb-6">Social</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-brand-cream/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <p>© 2024 Noorson Luxury. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
