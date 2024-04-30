import { createAction } from '@reduxjs/toolkit';

import { Message } from '@/utils/constants';

const chargeMessages = createAction<{ messages: Message[] }>(
  'user/chargeMessage',
);

export { chargeMessages };
