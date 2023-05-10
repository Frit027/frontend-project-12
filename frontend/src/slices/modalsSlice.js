/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channel: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.channel = payload.channel;
    },
    hideModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
