import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Benifits from './Benifits';
import Card1 from './Card1';
import Card2 from './Card2';
import Footer from './Footer';
import Hero from './Hero';
import Info from './Info';
import Navbar from './Navbar';
import Testimonials from './Testimonials';
import About1 from './AboutUs/About1';

function Home() {
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const benifitsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: -50,
        duration: 2,
        ease: 'power3.out',
      });

      gsap.from(infoRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 1.5,
      });

      gsap.from(card1Ref.current, {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        delay: 2,
      });

      gsap.from(card2Ref.current, {
        opacity: 0,
        x: 100,
        duration: 2,
        delay: 2.5,
      });

      gsap.from(benifitsRef.current, {
        opacity: 0,
        y: 100,
        duration: 2,
        delay: 3.5,
      });

      gsap.from(testimonialsRef.current, {
        opacity: 0,
        y: -50,
        duration: 2,
        delay: 4,
      });

      gsap.from(footerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        delay: 4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="hero_content" ref={heroRef}>
        <Navbar />
        <Hero />
      </div>
      <div className='info' ref={infoRef}>
        <Info />
      </div>
      <div className='card1' ref={card1Ref}>
        <Card1 />
      </div>
      <div className="card2" ref={card2Ref}>
        <Card2 />
      </div>
      <div className="benifit" ref={benifitsRef}>
        <Benifits />
      </div>
      <div className="testimonials" ref={testimonialsRef}>
        <Testimonials />
      </div>
      <div className="footer" ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}

export default Home;