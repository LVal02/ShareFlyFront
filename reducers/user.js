import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
  flight: null,
  date: null,
  photos: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateFlight: (state, action) => {
        state.Flight = action.payload;
    },
    updateDate: (state, action) => {
        state.date = action.payload;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((data) => data !== action.payload);
    },
  },
});

export const { updateUsername, updateToken,updateFlight,updateDate, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
