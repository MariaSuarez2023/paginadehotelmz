import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUserGraduate, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Méndez',
      role: 'Empresario',
      icon: faUserTie,
      text: 'Aguagym me ha ayudado a mantener un estilo de vida saludable. Los entrenadores son excelentes y las instalaciones son de primera clase. ¡Recomendaría Aguagym a todos!',
    },
    {
      id: 2,
      name: 'Laura González',
      role: 'Estudiante',
      icon: faUserGraduate,
      text: 'Las clases de natación en Aguagym son increíbles. He mejorado muchísimo desde que empecé. Además, el ambiente es muy acogedor y siempre me siento bienvenida.',
    },
    {
      id: 3,
      name: 'Dr. Martín Pérez',
      role: 'Médico',
      icon: faUserMd,
      text: 'El enfoque en la salud y el bienestar que tienen en Aguagym es impresionante. Recomiendo las clases de aquafitness para cualquier persona que busque una forma divertida y efectiva de ejercitarse.',
    },
  ];

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCards, inViewCards] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="testimonials" className="py-16 bg-[#720A6A] text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Testimonios
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
              className="bg-[#A81454] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * testimonial.id }}
            >
              <div className="flex justify-center mb-4">
                <FontAwesomeIcon icon={testimonial.icon} className="text-6xl text-[#edf2f4]" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-[#a2d2ff] font-medium mb-4">{testimonial.role}</p>
              <p className="text-gray-100">{testimonial.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;