import { configureStore } from '@reduxjs/toolkit';
// import { contactsReducer } from './contactsSlice';
import { filter } from './filterSlice';

import { contactsApi } from './contactsApi';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filter.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
