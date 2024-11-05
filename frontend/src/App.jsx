import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Activities from './components/Activities';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import RoomsList from './components/RoomsList';
import RoomDetails from './components/RoomDetails';
import Login from './components/Login';
import AdminRoomForm from './components/AdminRoomForm';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulamos un tiempo de carga
    setTimeout(() => setLoading(false), 3000); // 3 segundos de tiempo de carga simulado

    // Verificar si el usuario ya ha iniciado sesión
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="App">
          {/* Header Section */}
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

          {/* Main Content */}
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <section id="about-us">
                      <AboutUs />
                    </section>
                    <section id="activities">
                      <Activities />
                    </section>
                    <section id="testimonials">
                      <Testimonials />
                    </section>
                    <section id="pricing">
                      <Pricing />
                    </section>
                    <section id="blog">
                      <Blog />
                    </section>
                    <section id="contact">
                      <ContactForm />
                    </section>
                  </>
                }
              />
              <Route path="/rooms" element={<RoomsList />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/admin/rooms"
                element={
                  isAuthenticated ? <AdminRoomForm /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
