import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmingPool, faDumbbell, faSpa } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Pricing = () => {
  const pricingOptions = [
    {
      id: 1,
      name: 'Basic Plan',
      originalPrice: '$25 / mes',
      discountPrice: '$20 / mes',
      features: ['Acceso a piscina', 'Clases grupales', 'Vestuario y duchas'],
      icon: faSwimmingPool,
    },
    {
      id: 2,
      name: 'Premium Plan',
      originalPrice: '$45 / mes',
      discountPrice: '$35 / mes',
      features: ['Acceso a piscina y gimnasio', 'Clases grupales', 'Entrenamiento personal', 'Sauna y spa'],
      icon: faDumbbell,
    },
    {
      id: 3,
      name: 'Elite Plan',
      originalPrice: '$60 / mes',
      discountPrice: '$50 / mes',
      features: ['Acceso ilimitado', 'Entrenamiento personal', 'Clases exclusivas', 'Spa y masajes'],
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
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Planes y Precios
          {/* Subrayado con olas */}
          <div className="absolute left-0 bottom-0 w-full h-2">
            <div className="wave" style={{ animation: 'wave 6s linear infinite' }}></div>
          </div>
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
                <FontAwesomeIcon icon={option.icon} className="text-6xl text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{option.name}</h3>
              
              <p className="text-gray-500 font-medium mb-4">
                <span className="line-through text-red-500">{option.originalPrice}</span> 
                <span className="text-green-600 font-bold ml-2">{option.discountPrice}</span>
              </p>
              
              <ul className="text-gray-600 mb-4">
                {option.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className='bg-blue-500 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300'>
                Elegir Plan
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;