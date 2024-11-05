import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConciergeBell, faGlassMartiniAlt, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const API_KEY = '31ea8bf1ae5ca7854e8e6bc99187b9fd'; 
const CITY_ID = '3625542'; 

const Activities = () => {
  const [activities] = useState([
    {
      id: 1,
      name: 'Bienvenida con Cóctel',
      description: 'Disfrute de un cóctel de bienvenida al iniciar su estancia.',
      date: '2024-11-05',
      icon: faGlassMartiniAlt,
      location: 'Lobby del HotelMZ',
    },
    {
      id: 2,
      name: 'Tarde en la Piscina',
      description: 'Relájese y disfrute de una tarde junto a nuestra piscina.',
      date: '2024-11-06',
      icon: faUmbrellaBeach,
      location: 'Área de la Piscina, HotelMZ',
    },
    {
      id: 3,
      name: 'Cena Exclusiva',
      description: 'Disfrute de una cena exclusiva preparada por nuestro chef.',
      date: '2024-11-07',
      icon: faConciergeBell,
      location: 'Restaurante Principal, HotelMZ',
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
    <section id="activities" className="py-16 bg-[#c49c7c] text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          ref={refTitle}
          className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Actividades Exclusivas
        </motion.h2>

        <motion.p
          ref={refSubtitle}
          className="text-lg md:text-xl mb-12 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={inViewSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Sumérjase en una variedad de actividades diseñadas para hacer su estancia inolvidable. Disfrute de cada momento en HotelMZ.
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
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inViewCards ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 * activity.id }}
              >
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon icon={activity.icon} className="text-4xl text-[#c49c7c]" />
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
