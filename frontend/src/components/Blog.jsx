import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faHiking, faBed, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: 'Rutas de mochilero en Latinoamérica que superan a Europa',
      description: 'Descubre rutas de mochilero en Latinoamérica que ofrecen experiencias únicas y superan a las de Europa.',
      icon: faMapMarkedAlt,
      link: 'https://culturacolectiva.com/estilo-de-vida/viajes/rutas-de-mochileros-en-latinoamerica-que-son-mejores-que-en-europa/',
    },
    {
      id: 2,
      title: 'Consejos para viajar con un presupuesto limitado',
      description: 'Aprende estrategias para viajar por el mundo sin gastar una fortuna.',
      icon: faHiking,
      link: 'https://thegreenvoyage.com/es/trucos-para-viajes-econ%C3%B3micos/',
    },
    {
      id: 3,
      title: 'Los 10 mejores destinos mochileros de Sudamérica',
      description: 'Explora los destinos más populares entre mochileros en Sudamérica.',
      icon: faBed,
      link: 'https://elmundoenlamochila.com/10-mejores-destinos-mochileros-sudamerica/',
    },
    {
      id: 4,
      title: 'Cómo viajar con poco dinero: 10 tips para lograrlo',
      description: 'Descubre consejos prácticos para viajar con un presupuesto ajustado.',
      icon: faWallet,
      link: 'https://experienciajoven.com/como-viajar-con-poco-dinero/',
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
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block text-[#c49c7c]"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Nuestro Blog
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
                <FontAwesomeIcon icon={blog.icon} className="text-6xl text-[#c49c7c]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-[#c49c7c] hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
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
