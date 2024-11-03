import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmingPool, faLifeRing, faWater, faSwimmer } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: 'Beneficios de la Natación para la Salud',
      description: 'Descubre cómo la natación puede mejorar tu salud física y mental.',
      icon: faSwimmingPool,
      link: 'https://popularenlinea.com/Personas/blog/Pages/Cuales-son-los-beneficios-de-la-natacion.aspx#:~:text=Al%20nadar%2C%20consumes%20hasta%20un,aumento%20en%20la%20resistencia%20cardiorrespiratoria.',
    },
    {
      id: 2,
      title: 'Curiosidades sobre la Natación en los Juegos Olímpicos',
      description: 'Explora datos interesantes sobre la natación olímpica.',
      icon: faLifeRing,
      link: 'https://www.olympic.org/swimming',
    },
    {
      id: 3,
      title: 'Consejos para Mejorar tu Técnica de Natación',
      description: 'Aprende cómo puedes mejorar tu estilo y rendimiento en el agua.',
      icon: faWater,
      link: 'https://triatlon.org/blog/tecnica-de-natacion-aspectos-mejorar-tiempos-agua/',
    },
    {
      id: 4,
      title: 'Los Mejores Lugares para Practicar Natación en el Mundo',
      description: 'Conoce los lugares más impresionantes para nadar alrededor del mundo.',
      icon: faSwimmer,
      link: 'https://www.orca.com/es-int/blog/top-10-best-places-to-swim-openwater-swimming?srsltid=AfmBOorGQzCf2imM7HXTD9n8GVHAXQZ4Rzulmq1XnHpTbHbt5OZgKdNx',
    },
  ];

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCards, inViewCards] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="blog" className="py-16 bg-gray-200 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Blog
          <div className="absolute left-0 bottom-0 w-full h-2">
            <div className="wave" style={{ animation: 'wave 2s linear infinite' }}></div>
          </div>
        </motion.h2>

        <motion.div
          ref={refCards}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={inViewCards ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * blog.id }}
            >
              <div className="flex justify-center mb-4">
                <FontAwesomeIcon icon={blog.icon} className="text-6xl text-[#720A6A]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-[#EF792B] hover:bg-[#D13449] text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Leer más
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;