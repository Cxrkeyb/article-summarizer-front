import Link from 'next/link';
import React, { useEffect } from 'react';

const SuccessModal = () => {
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest('.modal-content')) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleCloseModal = () => {
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md max-w-sm modal-content">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-700 mb-4">
          Tu registro se ha completado con éxito. Por favor, inicia sesión para
          continuar.
        </p>
        <Link
          href="/login"
          className="block text-primary text-sm hover:underline"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
