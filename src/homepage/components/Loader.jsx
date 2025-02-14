import React from 'react';

const Loader = () => {
  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
    width: '100vw', // Full screen width
    position: 'fixed', // Ensures it stays centered even when scrolling
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Optional: Light overlay effect
  };

  const loaderStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframes}</style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
