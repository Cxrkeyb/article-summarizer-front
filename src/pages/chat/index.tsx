import { GetServerSideProps } from 'next';

import { Head } from '@/components';
import getServerSideSharedProps from '@/lib/next';
import ChatView from '@/views/chat';

export default function Chat() {
  return (
    <>
      <Head title="Chat" />
      <ChatView />
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
