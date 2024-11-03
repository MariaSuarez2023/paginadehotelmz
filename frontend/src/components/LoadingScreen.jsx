import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="swimmer-container">
        <div className="swimmer"></div>
        <div className="bubbles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h2 className="loading-text">Cargando...</h2>
    </div>
  );
};

export default LoadingScreen;