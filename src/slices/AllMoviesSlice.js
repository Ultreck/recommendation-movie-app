import { createSlice } from '@reduxjs/toolkit';
const AllMoviesSlice =  createSlice({
      initialState:[],
      name:"allMovies",
      reducers: {
            getMovies : (state, {payload}) =>{
                  state = payload;
                  return state;
            }
      }

})
export const allMoviesReducer = AllMoviesSlice.reducer;
export const {getMovies} = AllMoviesSlice.actions;