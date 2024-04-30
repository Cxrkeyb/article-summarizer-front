import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';

import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface UrlChat {
  url: string;
}

const validationSchema = yup.object().shape({
  url: yup
    .string()
    .url('Debe ser una URL válida')
    .required('Este campo es obligatorio'),
});

const useUrlChat = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    url: '',
  };

  const formik = useFormik<UrlChat>({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      await handleSubmit(data);
    },
  });

  const handleSubmit = async (data: UrlChat) => {
    const { url } = data;
    try {
      setIsLoading(true);
      axiosRequest(HttpMethods.POST, '/chat/summary', {
        url,
      })
        .then((response) => {
          router.push(`/chat/${response.chatId.id}`);
        })
        .catch((error) => {
          console.error('error', error);
        })
        .finally(() => {
          // This will be executed regardless of success or failure
          setIsLoading(false);
          // Reset form after submission
          formik.resetForm();
        });
    } catch (error) {
      console.error('error', error);
      setIsLoading(false); // In case of any error, also need to set isLoading to false
    }
  };

  return { formik, isLoading };
};

export default useUrlChat;
