import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LuxSection from '../components/LuxSection';
import About from '../components/About';
import Footer from '../components/Footer';
import TextSection from '../components/TextSection';  
import PashminaLifecycle from '../components/Cycle';
import Works from '../components/Works';
import Categories from '../components/Categories';
import Connections from '../components/Connections';


const Home = () => {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Navbar />
      <main>
        <Hero />
        <LuxSection />
        <TextSection /> 
        <PashminaLifecycle />
        <Works />  
        <Categories />
        <Connections />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
