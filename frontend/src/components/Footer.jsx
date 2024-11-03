import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logohotelmz.png'; 

const Footer = () => {
  return (
    <footer className="relative text-white py-12">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://cdn.pixabay.com/video/2021/09/11/88186-602895358_large.mp4" 
        autoPlay
        loop
        muted
        style={{ filter: 'brightness(40%)' }}
      />

      <div className="relative z-20 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Columna 1: Logo y Descripción */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Aguagym Logo" className="h-24 mb-4 sizelogo" />
          <p className="text-sm md:text-base">
            Aguagym es el club de natación líder en la región, ofreciendo entrenamientos acuáticos de alta calidad para todos los niveles.
          </p>
        </div>

        {/* Columna 2: Enlaces del Menú */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 item mr-4">Enlaces</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#about-us" className="relative hover:text-orange-500 menu-link">
              Nosotros
            </a>
            <a href="#activities" className="relative hover:text-orange-500 menu-link">
              Actividades
            </a>
            <a href="#testimonials" className="relative hover:text-orange-500 menu-link">
              Testimonios
            </a>
            <a href="#pricing" className="relative hover:text-orange-500 menu-link">
              Precios
            </a>
            <a href="#blog" className="relative hover:text-orange-500 menu-link">
              Blog
            </a>
            <a href="#contact" className="relative hover:text-orange-500 menu-link">
              Contacto
            </a>
          </nav>
        </div>

        {/* Columna 3: Información de Contacto */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4">Ponte en Contacto</h3>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>Aguagym, Calle Principal, Ciudad Valera, Estado Trujillo</p>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>contacto@aguagym.com</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>+58 424 123 4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;