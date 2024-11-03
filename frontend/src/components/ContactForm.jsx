import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cedula: '',
    phone: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    postalCode: '',
    membership: 'Basic Plan',
    message: '',
  });

  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    setEmailError('');

    try {
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      alert('Formulario enviado con éxito.');
      console.log(response.data);
      
      // Vaciar las casillas del formulario
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        cedula: '',
        phone: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        postalCode: '',
        membership: 'Basic Plan',
        message: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refForm, inViewForm] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refContact, inViewContact] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-16 bg-[#EF792B] text-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={refTitle}
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Formulario de Contacto
        </motion.h2>
        <motion.p
          ref={refTitle}
          className="text-xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Adquiere una membresía ahora mismo
        </motion.p>
        <motion.form
          ref={refForm}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inViewForm ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombres</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${emailError ? 'border-red-500' : ''}`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
              <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Dirección 1</label>
              <input type="text" id="address1" name="address1" value={formData.address1} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Dirección 2</label>
              <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
              <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="membership" className="block text-sm font-medium text-gray-700">Membresía</label>
            <select id="membership" name="membership" value={formData.membership} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md">
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Elite Plan">Elite Plan</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md"></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="bg-blue-500 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Enviar
          </motion.button>
        </motion.form>

        {/* Sección de "Ponte en Contacto" */}
        <motion.div
          ref={refContact}
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewContact ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Ponte en Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl mb-4" />
              <h4 className="text-2xl font-semibold mb-2">Ubicación</h4>
              <p>Aguagym, Calle Principal, Ciudad Valera, Estado Trujillo</p>
            </div>
            <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-4" />
              <h4 className="text-2xl font-semibold mb-2">Correo Electrónico</h4>
              <p>contacto@aguagym.com</p>
            </div>
            <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-center">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-4xl mb-4" />
              <h4 className="text-2xl font-semibold mb-2">Teléfono</h4>
              <p>+58 424 123 4567</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;