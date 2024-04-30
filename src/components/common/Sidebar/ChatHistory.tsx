import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface ChatInterface {
  chatId: string;
  articleSummary: string;
}

const ChatHistory = () => {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosRequest(HttpMethods.GET, '/chat/history')
      .then((data) => {
        setChats(data.chatSummary);
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [router.pathname]);

  return (
    <div className="overflow-y-auto max-h-[85%] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-full">
      {/* Estilos para el scroll */}
      {chats.map((chat: ChatInterface) => (
        <div
          key={chat.chatId}
          className="flex flex-row justify-between items-center text-white text-sm px-6 py-2 rounded-xl mt-4 hover:bg-neutral-800 cursor-pointer hover:scale-95 transition-transform duration-300 ease-in-out"
          onClick={() => {
            router.push(`/chat/${chat.chatId}`);
          }}
        >
          <span>
            {chat.articleSummary.split(' ').slice(0, 10).join(' ')}...
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
