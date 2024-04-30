import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { chargeMessages } from '@/store';
import { selectMessages } from '@/store/selectors/message';
import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods, Message } from '@/utils/constants';

const MessageHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    axiosRequest(HttpMethods.GET, `/chat/history/${router.query.id}`)
      .then((data) => {
        dispatch(
          chargeMessages({
            messages: data.chatSummary.messages,
          }),
        );
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [router.query.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full w-full overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {messages.messages.map((message: Message, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-1 justify-between items-start text-white text-sm px-6 py-2 rounded-xl"
        >
          <span className="text-primary font-bold">
            {message.isUser ? 'You' : 'Bot'}
          </span>
          <div className="flex flex-col gap-2">
            {message.message.split('\n').map((line, indexM) => (
              <React.Fragment key={indexM}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>{' '}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageHistory;
