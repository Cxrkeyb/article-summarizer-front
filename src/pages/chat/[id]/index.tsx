import { GetServerSideProps } from 'next';

import { Head } from '@/components';
import getServerSideSharedProps from '@/lib/next';
import ChatArticleView from '@/views/chat/chatArticle';

export default function ChatArticle() {
  return (
    <>
      <Head title="ChatArticle" />
      <ChatArticleView />
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
