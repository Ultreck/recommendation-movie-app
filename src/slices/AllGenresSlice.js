
import { createSlice } from '@reduxjs/toolkit';

const AllGenresSlice = createSlice({
      initialState:[], 
      name: "allGenres",
      reducers: {
            getGenres : (state, {payload}) => {
                  state = payload;
                  return state;
            }
      }
})
export const allGenresReducer = AllGenresSlice.reducer;
export const {getGenres} = AllGenresSlice.actions;
