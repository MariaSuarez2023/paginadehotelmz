import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUserGraduate, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ana Rodríguez',
      role: 'Empresaria',
      icon: faUserTie,
      text: 'HotelMZ es sin duda mi lugar favorito para escapar de la rutina. Las habitaciones son impecables y el servicio es de primera clase. ¡Volveré pronto!',
    },
    {
      id: 2,
      name: 'Javier López',
      role: 'Turista',
      icon: faUserGraduate,
      text: 'La experiencia en HotelMZ fue increíble. Las instalaciones son maravillosas y el personal siempre estuvo dispuesto a ayudarme en todo momento.',
    },
    {
      id: 3,
      name: 'Dr. María González',
      role: 'Doctora',
      icon: faUserMd,
      text: 'Me encantó mi estancia en HotelMZ. Es un lugar perfecto para relajarse y desconectar. Definitivamente, recomiendo este hotel a mis colegas.',
    },
  ];

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCards, inViewCards] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="testimonials" className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 text-[#c49c7c]"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Opiniones de Nuestros Huéspedes
        </motion.h2>

        <motion.div
          ref={refCards}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inViewCards ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-[#f3e9e4] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * testimonial.id }}
            >
              <div className="flex justify-center mb-4">
                <FontAwesomeIcon icon={testimonial.icon} className="text-6xl text-[#c49c7c]" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{testimonial.name}</h3>
              <p className="text-[#c49c7c] font-medium mb-4">{testimonial.role}</p>
              <p className="text-gray-700">{testimonial.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
