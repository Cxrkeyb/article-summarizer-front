import { useRouter } from 'next/router';
import React from 'react';
import { FaPenToSquare } from 'react-icons/fa6';

const NewChat = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-row justify-between items-center text-white text-sm px-6 py-2 rounded-xl mt-4 hover:bg-neutral-800 cursor-pointer hover:scale-95 transition-transform duration-300 ease-in-out"
      onClick={() => {
        router.push(`/chat/`);
      }}
    >
      <span>New chat</span>
      <FaPenToSquare />
    </div>
  );
};

export default NewChat;
