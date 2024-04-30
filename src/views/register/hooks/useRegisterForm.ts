import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface Register {
  userName: string;
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  userName: yup.string().required('Este campo es obligatorio'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo electrónico inválido')
    .required('Este campo es obligatorio'),
  password: yup
    .string()
    .required('Este campo es obligatorio')
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .max(16, 'La contraseña no puede contener más de 16 caracteres'),
});

const useRegisterForm = () => {
  const [aprovedRegister, setAprovedRegister] = React.useState(false);

  const initialValues = {
    userName: '',
    email: '',
    password: '',
  };

  const formik = useFormik<Register>({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      await handleSubmit(data);
    },
  });

  const handleSubmit = async (data: Register) => {
    const { email, password, userName } = data;
    try {
      axiosRequest(HttpMethods.POST, '/auth/register', {
        email,
        password,
        userName,
      })
        .then(() => {
          setAprovedRegister(true);
        })
        .catch((error) => {
          console.error('error', error);
        });
    } catch (error) {
      console.error('error', error);
    } finally {
      // Reset form after submission
      formik.resetForm();
    }
  };

  return { formik, aprovedRegister };
};

export default useRegisterForm;
