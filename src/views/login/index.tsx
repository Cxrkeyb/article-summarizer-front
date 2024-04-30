import { Field, Form, FormikProvider } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import SuccessModal from './components/SuccessModal';
import useLoginForm from './hooks/useLoginForm';

export default function LoginView() {
  const { formik, aprovedLogin } = useLoginForm();
  const router = useRouter();

  useEffect(() => {
    if (aprovedLogin) {
      setTimeout(() => {
        router.push('/chat');
      }, 2000);
    }
  }, [aprovedLogin]);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col w-full items-center justify-center max-w-[1200px] gap-8 ">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-8">
          Inicio de sesión
        </h2>
        <FormikProvider value={formik}>
          <Form className="flex flex-col gap-4 w-full items-center">
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
              Ingresar
            </button>
            <Link href="/register">
              <span className="text-primary text-sm hover:underline cursor-pointer">
                ¿No tienes cuenta? Regístrate
              </span>
            </Link>
          </Form>
        </FormikProvider>
      </div>
      {aprovedLogin && <SuccessModal />}
    </div>
  );
}
