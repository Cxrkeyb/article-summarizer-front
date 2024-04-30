import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="text-white text-2xl flex flex-col items-center">
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16 animate-spin"
          >
            <circle cx="12" cy="12" r="10" className="opacity-25" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <p className="mt-2 animate-pulse">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
