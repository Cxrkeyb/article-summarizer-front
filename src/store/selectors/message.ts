import { AppState } from '@/store/wrapper';

const selectMessages = (state: AppState) => state.message;

export { selectMessages };
