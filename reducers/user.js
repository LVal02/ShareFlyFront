const { createSlice, PayloadAction } = require('@reduxjs/toolkit');

const initialState = {
  username: null,
  token: null,
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
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter(data => data !== action.payload);
    },
  },
});

const { updateUsername, updateToken, addPhoto, removePhoto } = userSlice.actions;
module.exports = { updateUsername, addPhoto, removePhoto, updateToken };
