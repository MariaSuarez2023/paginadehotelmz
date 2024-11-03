import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer, faRunning, faBiking } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const API_KEY = '31ea8bf1ae5ca7854e8e6bc99187b9fd'; 
const CITY_ID = '3625542'; 

const Activities = () => {
  const [activities] = useState([
    {
      id: 1,
      name: 'Baño matinal',
      description: 'Comience el día con un baño energizante.',
      date: '2024-08-25',
      icon: faSwimmer,
      location: 'Country Club, Ciudad Valera, Estado Trujillo.',
    },
    {
      id: 2,
      name: 'Aeróbic acuático',
      description: 'Participe en nuestra enérgica sesión de aeróbic acuático.',
      date: '2024-08-26',
      icon: faRunning,
      location: 'El Italven, Ciudad Valera, Estado Trujillo.',
    },
    {
      id: 3,
      name: 'Clase de ciclismo',
      description: 'Experimente la emoción de nuestra clase de ciclismo indoor.',
      date: '2024-08-27',
      icon: faBiking,
      location: 'Parque los ilustres, Ciudad Valera, Estado Trujillo.',
    },
  ]);

  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&id=${CITY_ID}&units=metric&lang=es`
        );
        console.log(response.data); // Ver qué datos estamos recibiendo
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherForDate = (date) => {
    if (!weather.list) return null;
    const forecast = weather.list.find((entry) =>
      entry.dt_txt.startsWith(date) // Esto compara solo la parte de la fecha "YYYY-MM-DD"
    );
    return forecast ? forecast.weather[0] : null;
  };

  // Uso de useInView para desencadenar animaciones en scroll
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCards, inViewCards] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="activities" className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Próximas Actividades
          <div className="absolute left-0 bottom-0 w-full h-2">
            <div className="wave" style={{ animation: 'wave 6s linear infinite' }}></div>
          </div>
        </motion.h2>

        <motion.p
          ref={refSubtitle}
          className="text-lg md:text-xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Únete a nuestras emocionantes actividades y aprovecha al máximo tu tiempo en Aguagym.
          Mantente actualizado con el pronóstico del clima para cada evento.
        </motion.p>

        <motion.div
          ref={refCards}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inViewCards ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {activities.map((activity) => {
            const weatherInfo = getWeatherForDate(activity.date);

            return (
              <motion.div
                key={activity.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 * activity.id }}
              >
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon icon={activity.icon} className="text-4xl text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{activity.name}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <p className="text-gray-500 mb-2">Fecha: {activity.date}</p>
                <p className="text-gray-500 mb-2">Lugar: {activity.location}</p>

                {weatherInfo ? (
                  <div className="mt-4">
                    <p className="text-lg font-medium mb-2">El pronóstico para esa fecha es:</p>
                    <div className="flex items-center justify-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                        alt={weatherInfo.description}
                        className="w-12 h-12"
                      />
                      <p className="text-lg font-medium ml-2">
                        {weatherInfo.main} - {weatherInfo.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Pronóstico del clima no disponible</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;