import { createSlice } from '@reduxjs/toolkit';

export const filter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredContacts(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filteredContacts } = filter.actions;
