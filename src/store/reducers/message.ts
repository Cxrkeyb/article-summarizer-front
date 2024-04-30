/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createReducer } from '@reduxjs/toolkit';

import { chargeMessages } from '@/store';
import { Message } from '@/utils/constants';
interface MessageState {
  messages: Message[];
}

const emptyUser: MessageState = {
  messages: [],
};

export const initialState: MessageState = {
  messages: emptyUser.messages,
};

export const messageReducer = createReducer(initialState, (builder) => {
  builder.addCase(chargeMessages, (state, action) => {
    state.messages = action.payload.messages;
  });
});
