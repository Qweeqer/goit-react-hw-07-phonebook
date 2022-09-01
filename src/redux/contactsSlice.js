import { createSlice } from '@reduxjs/toolkit';
import initContacts from '../contacts.json';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contacts = createSlice({
  name: 'contacts',
  initialState: {
    items: initContacts,
  },

  reducers: {
    addNewContact(state, action) {
      state.items = [...state.items, action.payload];
    },
    deleteContact(state, action) {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const contactsReducer = persistReducer(persistConfig, contacts.reducer);

export const { addNewContact, deleteContact } = contacts.actions;
