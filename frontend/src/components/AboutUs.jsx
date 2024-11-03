import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer, faDumbbell, faMedal } from '@fortawesome/free-solid-svg-icons';
import sergiofoto from '../assets/fotosergio.jpg'
import luisfoto from '../assets/luisfoto.jpg'

const AboutUs = () => {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refMission, inViewMission] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refVision, inViewVision] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refValues, inViewValues] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refTeam1, inViewTeam1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refTeam2, inViewTeam2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about-us" className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 text-center">
        {/* Título */}
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Sobre Nosotros
          {/* Subrayado con olas */}
          <div className="absolute left-0 bottom-0 w-full h-2">
            <div className="wave" style={{ animation: 'wave 6s linear infinite' }}></div>
          </div>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          ref={refSubtitle}
          className="text-lg md:text-xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Descubre quiénes somos y qué hacemos mejor en Aguagym, el principal destino de fitness acuático.
        </motion.p>

        {/* Misión, Visión y Valores */}
        <div className="md:flex md:space-x-8 text-left">
          {/* Misión */}
          <motion.div
            ref={refMission}
            className="md:w-1/3 mb-8 md:mb-0 bg-[#58ade1] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inViewMission ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <FontAwesomeIcon icon={faSwimmer} className="text-6xl text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestra misión</h3>
            <p className="text-base">
              En Aguagym, nuestra misión es promover la salud y el bienestar a través de programas de entrenamiento acuático de alta calidad. Nos esforzamos por proporcionar un ambiente seguro, inclusivo e inspirador para que todos puedan alcanzar sus objetivos de fitness.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            ref={refVision}
            className="md:w-1/3 mb-8 md:mb-0 bg-[#58ade1] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewVision ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <FontAwesomeIcon icon={faDumbbell} className="text-6xl text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestra visión</h3>
            <p className="text-base">
              Imaginamos una comunidad en la que todo el mundo tenga acceso a un entrenamiento físico de alta calidad, centrado en los beneficios de los ejercicios acuáticos. Nuestra visión es convertirnos en el centro de fitness acuático líder de la región, reconocido por su excelencia e innovación.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            ref={refValues}
            className="md:w-1/3 bg-[#58ade1] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewValues ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <FontAwesomeIcon icon={faMedal} className="text-6xl text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Nuestros valores</h3>
            <p className="text-base">
              Valoramos la integridad, la dedicación y la excelencia. Nuestro equipo se compromete a ayudarle a conseguir lo mejor de sí mismo, tanto dentro como fuera del agua. Creemos en la mejora continua y en el fomento de un entorno alentador y de apoyo.
            </p>
          </motion.div>
        </div>

        {/* Equipo */}
        <div className="md:flex md:space-x-8 mt-12 text-left">
          {/* Miembro del Equipo 1 */}
          <motion.div
            ref={refTeam1}
            className="md:w-1/2 mb-8 md:mb-0 bg-[#58ade1] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewTeam1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <img
              src={sergiofoto}
              alt="Team Member 1"
              className="rounded-full w-32 h-32 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">Sergio González</h3>
            <p className="text-center text-base">
              Fundador de Aguagym, - Sergio se especializa en entrenamientos acuáticos de alta intensidad, garantizando que cada miembro obtenga lo mejor de sus sesiones de entrenamiento.
            </p>
          </motion.div>

          {/* Miembro del Equipo 2 */}
          <motion.div
            ref={refTeam2}
            className="md:w-1/2 bg-[#58ade1] text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewTeam2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <img
              src={luisfoto}
              alt="Team Member 2"
              className="rounded-full w-32 h-32 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">Luis Martinez</h3>
            <p className="text-center text-base">
              Experto en Fitness Acuático - Luis tiene más de 10 años de experiencia en fitness acuático, aportando una gran riqueza de conocimientos y experiencia a nuestro equipo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;