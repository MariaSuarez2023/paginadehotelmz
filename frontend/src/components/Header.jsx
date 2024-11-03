import React, { useState } from 'react';
import logo from '../assets/logohotelmz.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-color-white text-black shadow-lg static w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#hero">
            <img src={logo} alt="Hotel Mz" className="sizelogo" />
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#about-us" className="relative hover:text-primary menu-link">
            Nosotros
          </a>
          <a href="#activities" className="relative hover:text-primary menu-link">
            Actividades
          </a>
          <a href="#testimonials" className="relative hover:text-primary menu-link">
            Testimonios
          </a>
          <a href="#pricing" className="relative hover:text-primary menu-link">
            Precios
          </a>
          <a href="#blog" className="relative hover:text-primary menu-link">
            Blog
          </a>
          <a href="#contact" className="relative hover:text-primary menu-link">
            Contacto
          </a>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-secondary hover:border-secondary"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-primary text-white`}
      >
        <a
          href="#about-us"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          About Us
        </a>
        <a
          href="#activities"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          Activities
        </a>
        <a
          href="#testimonials"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          Testimonials
        </a>
        <a
          href="#pricing"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          Pricing
        </a>
        <a
          href="#blog"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          Blog
        </a>
        <a
          href="#contact"
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
          onClick={toggleMenu}
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default Header;