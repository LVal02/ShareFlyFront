import { createSlice } from '@reduxjs/toolkit';
//La valeur est directement stocké dans state.user 
const initialState = {
  username: null,
  token: null,
  flyNumber: null,
  date: null,
  photos: [],
  flightObjectId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    updateFlyNumber: (state, action) => {
        state.flyNumber = action.payload;
    },
    updateFlightObjectId: (state, action) => {
      state.flightObjectId = action.payload;
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

export const { updateUsername, addToken, updateFlyNumber, updateFlightObjectId, updateDate, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
