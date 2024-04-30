import { Field, Form, FormikProvider } from 'formik'; // Importa Formik, Form y Field
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

import Loading from '@/components/common/Loading';

import MessageHistory from './components/MessageHistory';
import useAskAI from './hooks/useAskAI';

export default function ChatView() {
  const { formik, isLoading } = useAskAI();
  return (
    <FormikProvider value={formik}>
      <Form className="flex flex-col items-center justify-center w-full h-screen">
        <div className="h-[90%] w-full max-w-[800px] pt-[5%]">
          <MessageHistory />
          {isLoading && <Loading />}
        </div>
        <div className="h-[10%] w-full max-w-[800px]">
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <div className="w-full bg-neutral-800 px-4 py-2 border border-gray-300 rounded-xl flex items-center">
              <Field
                type="text"
                name="question"
                className={`w-full bg-transparent text-white outline-none border-none `}
                placeholder="Escribe aquí tu pregunta..."
              />
              <button
                type="submit"
                className={` ${formik.values.question.length === 0 ? 'bg-neutral-500' : 'bg-primary-foreground'} text-white p-2 rounded-2xl`}
                disabled={formik.values.question.length === 0}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
