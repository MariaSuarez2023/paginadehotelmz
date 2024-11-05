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
        src="https://cdn.pixabay.com/video/2019/07/30/25640-351374271_large.mp4" 
        autoPlay
        loop
        muted
        style={{ filter: 'brightness(40%)' }}
      />

      <div className="relative z-20 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Columna 1: Logo y Descripción */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="HotelMZ Logo" className="h-24 mb-4 sizelogo" />
          <p className="text-sm md:text-base">
            HotelMZ ofrece una experiencia de lujo en cada estancia. Ubicado en un entorno espectacular, nuestro hotel es el lugar perfecto para relajarse y disfrutar de una atención inigualable.
          </p>
        </div>

        {/* Columna 2: Enlaces del Menú */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 item mr-50">Enlaces</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#about-us" className="relative hover:text-[#c49c7c] menu-link">
              Sobre Nosotros
            </a>
            <a href="#activities" className="relative hover:text-[#c49c7c] menu-link">
              Actividades
            </a>
            <a href="#testimonials" className="relative hover:text-[#c49c7c] menu-link">
              Opiniones
            </a>
            <a href="#pricing" className="relative hover:text-[#c49c7c] menu-link">
              Tarifas
            </a>
            <a href="#blog" className="relative hover:text-[#c49c7c] menu-link">
              Blog
            </a>
            <a href="#contact" className="relative hover:text-[#c49c7c] menu-link">
              Contáctenos
            </a>
          </nav>
        </div>

        {/* Columna 3: Información de Contacto */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4">Contáctenos</h3>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>HotelMZ, Avenida Principal, Ciudad de Destino</p>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>reservas@hotelMz.com</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="text-3xl mb-2 md:mb-0 md:mr-2" />
            <p>+1 234 567 890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
