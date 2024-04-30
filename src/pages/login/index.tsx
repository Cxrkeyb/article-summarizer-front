import { GetServerSideProps } from 'next';

import { Head } from '@/components';
import getServerSideSharedProps from '@/lib/next';
import LoginView from '@/views/login';

export default function Login() {
  return (
    <>
      <Head title="Login" />
      <LoginView />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};
