import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { chargeUser } from '@/store';
import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface Login {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
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

const useLoginForm = () => {
  const [aprovedLogin, setAprovedLogin] = React.useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik<Login>({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      await handleSubmit(data);
    },
  });

  const handleSubmit = async (data: Login) => {
    const { email, password } = data;
    try {
      axiosRequest(HttpMethods.POST, '/auth/login', {
        email,
        password,
      })
        .then((response) => {
          // Save the token in the local storage
          localStorage.setItem('token', response.token);
          setAprovedLogin(true);
          dispatch(chargeUser({ user: response.user }));
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

  return { formik, aprovedLogin };
};

export default useLoginForm;
