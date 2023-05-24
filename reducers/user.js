import { createSlice } from '@reduxjs/toolkit';
//La valeur est directement stocké dans state.user 
const initialState = {
  username: null,
  token: null,
  photos: [],
  flights: [{
    flightObjectId: null,
    flyNumber: null,
    date: null,
  }],
  lastname:null,
  firstname:null,
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
    updateFlights: (state, action) => {
      action.payload.data.forEach((flight, index) => {
        state.flights[index] = {
          flightObjectId: flight._id,
          flyNumber: flight.flyNumber,
          date: flight.date,
        };
      });
    },
    //   updateFlightObjectId: (state, action) => {
    //     state.flightObjectId.push(action.payload);
    // },
    // updateFlyNumber: (state, action) => {
    //     state.flyNumber = action.payload;
    // },
    // updateDate: (state, action) => {
    //     state.date = action.payload;
    // },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((data) => data !== action.payload);
    },
    updateFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    updateLastname: (state, action) => {
      state.lastname = action.payload;
    },
  },
});

export const { updateUsername, addToken, addPhoto, removePhoto, updateLastname, updateFirstname,updateFlights } = userSlice.actions;
export default userSlice.reducer;
