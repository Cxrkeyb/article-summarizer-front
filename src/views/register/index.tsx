import { Field, Form, FormikProvider } from 'formik';
import Link from 'next/link';
import React, { useEffect } from 'react';

import SuccessModal from './components/SuccessModal';
import useRegisterForm from './hooks/useRegisterForm';

export default function RegisterView() {
  const { formik, aprovedRegister } = useRegisterForm();
  useEffect(() => {
    if (aprovedRegister) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [aprovedRegister]);

  useEffect(() => {}, []);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col w-full items-center justify-center max-w-[1200px] gap-8 ">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-8">
          Crear cuenta
        </h2>
        <FormikProvider value={formik}>
          <Form className="flex flex-col gap-4 w-full items-center">
            <div className="w-full max-w-[500px]">
              <Field
                className="w-full p-2 border border-gray-300 rounded-md"
                name="userName"
                placeholder="Nombre de usuario"
              />
              {/* show the error */}
              <div className="text-red-500">
                {formik.errors.userName &&
                  formik.touched.userName &&
                  formik.errors.userName}
              </div>
            </div>

            <div className="w-full max-w-[500px]">
              <Field
                className="w-full p-2 border border-gray-300 rounded-md"
                name="email"
                placeholder="Email"
              />
              {/* show the error */}
              <div className="text-red-500">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </div>
            </div>

            <div className="w-full max-w-[500px]">
              <Field
                className="w-full p-2 border border-gray-300 rounded-md"
                name="password"
                type="password"
                placeholder="Contraseña"
              />
              {/* show the error */}
              <div className="text-red-500">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </div>
            </div>
            <button
              className="w-36 bg-primary-foreground text-white p-2 rounded-2xl mt-8"
              type="submit"
            >
              Registrarse
            </button>
            <Link href="/login">
              <span className="text-primary text-sm hover:underline cursor-pointer">
                ¿Ya tienes una cuenta? Inicia sesión
              </span>
            </Link>
          </Form>
        </FormikProvider>
      </div>
      {aprovedRegister && <SuccessModal />}
    </div>
  );
}
