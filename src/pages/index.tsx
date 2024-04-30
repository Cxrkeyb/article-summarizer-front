import { GetServerSideProps } from 'next';

import { Head } from '@/components';
import getServerSideSharedProps from '@/lib/next';
import HomeView from '@/views/home';

export default function Home() {
  return (
    <>
      <Head title="Summarizer" />
      <HomeView />
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
