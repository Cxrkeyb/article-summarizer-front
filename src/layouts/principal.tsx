'use client';

import { Poppins } from 'next/font/google';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatHistory from '@/components/common/Sidebar/ChatHistory';
import NewChat from '@/components/common/Sidebar/NewChat';
import UserData from '@/components/common/Sidebar/UserData';
import { chargeUser } from '@/store';
import { selectUser } from '@/store/selectors/user';
import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from '@/utils/constants';

interface Props {
  children: JSX.Element;
  className?: string;
}

const righteous = Poppins({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return <div className="pb-0 relative w-full">{children}</div>;
});

const MainContent = ({ children }: Props) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectUser);

  const checkToken = async () => {
    if (loginState.isLoggedIn) return;
    axiosRequest(HttpMethods.POST, '/auth/regenerate-token', {})
      .then((response) => {
        // Save the token in the local storage
        localStorage.setItem('token', response.token);
        dispatch(chargeUser({ user: response.user }));
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  };

  React.useEffect(() => {
    checkToken();
  }, []);
  return (
    <div className="mt-0 pb-0 min-h-[80vh] items-center flex flex-col justify-center w-full">
      <MemoizedChildren>{children}</MemoizedChildren>
    </div>
  );
};

function PrincipalLayout({ children, className }: Props) {
  return (
    <div className={`${className} ${righteous.className} w-full`}>
      <div className="flex items-center justify-center flex-col gap-4 w-full">
        <MainContent>
          <div className="flex items-center justify-center w-full">
            <div className="max-w-[280px] w-full bg-neutral-900 h-screen flex flex-col justify-between p-2">
              <NewChat />
              <ChatHistory />
              <UserData />
            </div>
            <div className="h-screen bg-neutral-800 w-full">{children}</div>
          </div>
        </MainContent>
      </div>
    </div>
  );
}

export default PrincipalLayout;
