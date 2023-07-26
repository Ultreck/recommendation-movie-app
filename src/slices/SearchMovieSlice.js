import { createSlice } from '@reduxjs/toolkit';

const SearchMovieSlice = createSlice({
      initialState: [],
      name:"searchMovie",
      reducers: {
            getSearchMovie : (state, {payload}) => {
                  state =  payload;
                  return state;
            }
      }
})
export const searchMovieReducer =SearchMovieSlice.reducer;
export const {getSearchMovie} = SearchMovieSlice.actions;
