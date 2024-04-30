import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '@/store/selectors/user';

const UserData = () => {
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-row items-center px-4">
      <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center" />
      <div className="flex flex-col ml-4">
        <span className="text-white text-sm">{user.user.userName}</span>
        <span className="text-white text-xs">{user.user.email}</span>
      </div>
    </div>
  );
};

export default UserData;
