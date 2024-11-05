import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logohotelmz.png'; 

const Header = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtiene la ruta actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleNavClick = (anchor) => {
    if (location.pathname !== '/') {
      navigate('/'); // Navega a la página de inicio si no estamos en ella
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Espera un momento para que la navegación a la página de inicio complete
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Cierra el menú en dispositivos móviles
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
          <button onClick={() => handleNavClick('about-us')} className="relative hover:text-secondary menu-link">
            Nosotros
          </button>
          <button onClick={() => handleNavClick('activities')} className="relative hover:text-secondary menu-link">
            Actividades
          </button>
          <button onClick={() => handleNavClick('testimonials')} className="relative hover:text-secondary menu-link">
            Testimonios
          </button>
          <button onClick={() => handleNavClick('pricing')} className="relative hover:text-secondary menu-link">
            Precios
          </button>
          <button onClick={() => handleNavClick('blog')} className="relative hover:text-secondary menu-link">
            Blog
          </button>
          <button onClick={() => handleNavClick('contact')} className="relative hover:text-secondary menu-link">
            Contacto
          </button>
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
        <button
          onClick={() => handleNavClick('about-us')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Nosotros
        </button>
        <button
          onClick={() => handleNavClick('activities')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Actividades
        </button>
        <button
          onClick={() => handleNavClick('testimonials')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Testimonios
        </button>
        <button
          onClick={() => handleNavClick('pricing')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Precios
        </button>
        <button
          onClick={() => handleNavClick('blog')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Blog
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
        >
          Contacto
        </button>
        <Link to="/rooms" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>
          Habitaciones
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin/rooms" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>
              Admin
            </Link>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-white" onClick={toggleMenu}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
