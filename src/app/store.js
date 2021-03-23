import { configureStore } from '@reduxjs/toolkit';
import dataInboxReducer from '../features/dataInbox/dataInboxSlice';

export default configureStore({
  reducer: {
    inboxData: dataInboxReducer,
  },
});
