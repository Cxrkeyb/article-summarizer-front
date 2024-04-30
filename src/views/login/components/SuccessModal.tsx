import Link from 'next/link';
import React, { useEffect } from 'react';

const LoginSuccessModal = () => {
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
    window.location.href = '/chat';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md max-w-sm modal-content">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Inicio de sesión exitoso!
        </h2>
        <p className="text-gray-700 mb-4">
          Has iniciado sesión correctamente. Redirigiendo a tu dashboard...
        </p>
        <Link
          href="/chat"
          className="block text-primary text-sm hover:underline"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
};

export default LoginSuccessModal;
