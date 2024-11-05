import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logohotelmz.png'; 

const Header = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-color-white text-black shadow-lg static w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} alt="Hotel Mz" className="sizelogo" />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/#about-us" className="relative hover:text-primary menu-link">Nosotros</Link>
          <Link to="/#activities" className="relative hover:text-primary menu-link">Actividades</Link>
          <Link to="/#testimonials" className="relative hover:text-primary menu-link">Testimonios</Link>
          <Link to="/#pricing" className="relative hover:text-primary menu-link">Precios</Link>
          <Link to="/#blog" className="relative hover:text-primary menu-link">Blog</Link>
          <Link to="/#contact" className="relative hover:text-primary menu-link">Contacto</Link>
          <Link to="/rooms" className="relative hover:text-primary menu-link">Habitaciones</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin/rooms" className="relative hover:text-primary menu-link">Admin</Link>
              <button onClick={handleLogout} className="relative hover:text-primary menu-link">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="relative hover:text-primary menu-link">Iniciar Sesión</Link>
          )}
        </nav>

        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-black border-black hover:text-secondary hover:border-secondary"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-primary text-white`}>
        <Link to="/#about-us" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Nosotros</Link>
        <Link to="/#activities" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Actividades</Link>
        <Link to="/#testimonials" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Testimonios</Link>
        <Link to="/#pricing" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Precios</Link>
        <Link to="/#blog" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Blog</Link>
        <Link to="/#contact" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Contacto</Link>
        <Link to="/rooms" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Habitaciones</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin/rooms" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Admin</Link>
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>Iniciar Sesión</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
