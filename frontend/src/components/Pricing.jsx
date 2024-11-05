import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmingPool, faDumbbell, faSpa } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Pricing = () => {
  const pricingOptions = [
    {
      id: 1,
      name: 'Plan Relax',
      originalPrice: '$150 / noche',
      discountPrice: '$120 / noche',
      features: ['Acceso a piscina', 'Desayuno incluido', 'WiFi gratuito'],
      icon: faSwimmingPool,
    },
    {
      id: 2,
      name: 'Plan Confort',
      originalPrice: '$200 / noche',
      discountPrice: '$170 / noche',
      features: ['Acceso a piscina y gimnasio', 'Desayuno y cena incluidos', 'WiFi y estacionamiento gratuito', 'Sauna y spa'],
      icon: faDumbbell,
    },
    {
      id: 3,
      name: 'Plan Lujo',
      originalPrice: '$300 / noche',
      discountPrice: '$250 / noche',
      features: ['Suite de lujo', 'Servicio de habitación 24h', 'Acceso a spa y masajes', 'Desayuno, almuerzo y cena incluidos'],
      icon: faSpa,
    },
  ];

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCards, inViewCards] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="pricing" className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 text-[#c49c7c]"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Planes y Tarifas
          {/* Subrayado con olas */}
        </motion.h2>

        <motion.div
          ref={refCards}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inViewCards ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * option.id }}
            >
              <div className="flex justify-center mb-4">
                <FontAwesomeIcon icon={option.icon} className="text-6xl text-[#c49c7c]" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{option.name}</h3>
              
              <p className="text-gray-600 font-medium mb-4">
                <span className="line-through text-red-500">{option.originalPrice}</span> 
                <span className="text-[#c49c7c] font-bold ml-2">{option.discountPrice}</span>
              </p>
              
              <ul className="text-gray-600 mb-4">
                {option.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="bg-[#c49c7c] hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                Reservar Plan
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
