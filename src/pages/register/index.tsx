import { GetServerSideProps } from 'next';

import { Head } from '@/components';
import getServerSideSharedProps from '@/lib/next';
import RegisterView from '@/views/register';

export default function Register() {
  return (
    <>
      <Head title="Register" />
      <RegisterView />
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
