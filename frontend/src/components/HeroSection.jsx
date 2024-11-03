import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-[98vh] flex items-center justify-center text-center text-white"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.pixabay.com/video/2024/02/29/202392-918066367_large.mp4" 
        type="video/mp4"
        autoPlay
        loop
        muted
        style={{ filter: 'brightness(40%)' }} 
      />


      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 contenedorhero">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Su Refugio de Lujo en el Corazón del Paraíso
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          Descubra una experiencia única en HotelMZ, donde la elegancia se encuentra con la comodidad. Disfrute de nuestras instalaciones de primera clase, vistas espectaculares y un servicio dedicado a hacer que su estadía sea inolvidable. 
        </motion.p>
        <motion.a
          href="#contact"
          className="inline-block bg-white text-black font-bold py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
        >
          Reservar
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;