import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConciergeBell, faBed, faSpa } from '@fortawesome/free-solid-svg-icons';
import managerPhoto from '../assets/maria3.jpg';
import chefPhoto from '../assets/donpollo.jpg';

const AboutUs = () => {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refMission, inViewMission] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refVision, inViewVision] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refValues, inViewValues] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refTeam1, inViewTeam1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refTeam2, inViewTeam2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about-us" className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        {/* Título */}
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 text-[#c49c7c]"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Sobre HotelMZ
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          ref={refSubtitle}
          className="text-lg md:text-xl mb-12 text-[#c49c7c]"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Experiencia de lujo y comodidad en cada estancia
        </motion.p>

        {/* Misión, Visión y Valores */}
        <div className="md:flex md:space-x-8 text-left">
          {/* Misión */}
          <motion.div
            ref={refMission}
            className="md:w-1/3 mb-8 md:mb-0 bg-[#c49c7c] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inViewMission ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <FontAwesomeIcon icon={faConciergeBell} className="text-6xl text-white-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
            <p className="text-base">
              En HotelMZ, nuestra misión es ofrecer una experiencia inolvidable a nuestros huéspedes, 
              donde el lujo y el confort se combinan con un servicio excepcional y personalizado.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            ref={refVision}
            className="md:w-1/3 mb-8 md:mb-0 bg-[#c49c7c] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewVision ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <FontAwesomeIcon icon={faBed} className="text-6xl text-white-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
            <p className="text-base">
              Aspiramos a ser reconocidos como el hotel líder en la región, ofreciendo no solo un lugar 
              donde alojarse, sino un refugio de tranquilidad y lujo.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            ref={refValues}
            className="md:w-1/3 bg-[#c49c7c] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewValues ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <FontAwesomeIcon icon={faSpa} className="text-6xl text-white-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestros Valores</h3>
            <p className="text-base">
              Valoramos la hospitalidad, la excelencia y el respeto. En HotelMZ, cada detalle importa, y 
              trabajamos para superar las expectativas de nuestros huéspedes.
            </p>
          </motion.div>
        </div>

        {/* Equipo */}
        <div className="md:flex md:space-x-8 mt-12 text-left">
          {/* Miembro del Equipo 1 */}
          <motion.div
            ref={refTeam1}
            className="md:w-1/2 mb-8 md:mb-0 bg-[#c49c7c] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewTeam1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <img
              src={managerPhoto}
              alt="Gerente"
              className="rounded-full w-32 h-45 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">María Suarez</h3>
            <p className="text-center text-base">
              Gerente General - María lidera nuestro equipo con más de 15 años de experiencia en la industria de la hospitalidad, asegurando la excelencia en cada detalle.
            </p>
          </motion.div>

          {/* Miembro del Equipo 2 */}
          <motion.div
            ref={refTeam2}
            className="md:w-1/2 bg-[#c49c7c] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewTeam2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <img
              src={chefPhoto}
              alt="Chef"
              className="rounded-full w-32 h-32 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">Agustín Calderón</h3>
            <p className="text-center text-base">
              Chef Ejecutivo - Con una pasión por la gastronomía, Agustín Calderón crea experiencias culinarias inolvidables, combinando sabores locales e internacionales.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
