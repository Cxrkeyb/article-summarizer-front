import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { chargeMessages } from '@/store';
import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface AskAI {
  question: string;
}

const validationSchema = yup.object().shape({
  question: yup.string().required('Este campo es obligatorio'),
});

const useAskAI = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    question: '',
  };

  const formik = useFormik<AskAI>({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      await handleSubmit(data);
    },
  });

  const handleSubmit = async (data: AskAI) => {
    const { question } = data;
    try {
      // Set loading state to true before making the request
      setIsLoading(true);
      const response = await axiosRequest(HttpMethods.POST, '/chat/message', {
        message: question,
        chatId: router.query.id,
      });
      dispatch(
        chargeMessages({
          messages: response.chatSummary.messages,
        }),
      );
    } catch (error) {
      console.error('error', error);
    } finally {
      // Reset loading state to false after the request is completed
      setIsLoading(false);
      // Reset form after submission
      formik.resetForm();
    }
  };

  return { formik, isLoading };
};

export default useAskAI;
