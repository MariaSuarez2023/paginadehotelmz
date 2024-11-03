import React, { useState, useEffect } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga
    setTimeout(() => setLoading(false), 3000); // 3 segundos de tiempo de carga simulado
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="App">
          {/* Header Section */}
          <Header />

          {/* Hero Section */}
          <main>
            <HeroSection />

            {/* About Us Section */}
            <section id="about-us">
              <AboutUs />
            </section>

            {/* Activities Section */}
            <section id="activities">
              <Activities />
            </section>

            {/* Testimonials Section */}
            <section id="testimonials">
              <Testimonials />
            </section>

            {/* Pricing Section */}
            <section id="pricing">
              <Pricing />
            </section>

            {/* Blog Section */}
            <section id="blog">
              <Blog />
            </section>

            {/* Contact Form Section */}
            <section id="contact">
              <ContactForm />
            </section>
          </main>
          
          {/* Footer Section */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;