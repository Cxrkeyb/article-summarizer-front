import { Field, Form, FormikProvider } from 'formik'; // Importa Formik, Form y Field
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

import Loading from '@/components/common/Loading';

import useUrlChat from './hooks/useUrlChat';

export default function ChatView() {
  const { formik, isLoading } = useUrlChat();
  return (
    <FormikProvider value={formik}>
      <Form className="flex flex-col items-center justify-center w-full h-screen">
        <div className="h-[90%] w-full max-w-[800px] pt-[10%]"></div>
        <div className="h-[10%] w-full max-w-[800px]">
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <div className="w-full bg-neutral-800 px-4 py-2 border border-gray-300 rounded-xl flex items-center">
              <Field
                type="text"
                name="url"
                className={`w-full bg-transparent text-white outline-none border-none `}
                placeholder="Escribe la url de un articulo..."
              />
              <button
                type="submit"
                className={` ${formik.values.url.length === 0 ? 'bg-neutral-500' : 'bg-primary-foreground'} text-white p-2 rounded-2xl`}
                disabled={formik.values.url.length === 0}
              >
                <FaArrowUp />
              </button>
            </div>
            {formik.errors.url && formik.touched.url && (
              <div className="text-red-500 w-full">{formik.errors.url}</div>
            )}
          </div>
        </div>
        {isLoading && <Loading />}
      </Form>
    </FormikProvider>
  );
}
