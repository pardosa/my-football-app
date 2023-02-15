// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TLeagues } from "../types";

export interface ILeaguesState {
  leagues: Array<TLeagues>;
  status: string;
  error?: string;
}

// initial state
const initialState: ILeaguesState = {
  leagues: [],
  status: "idle",
  error: "",
};

// ==============================|| SLICE - leagues ||============================== //
const options = {
  method: "GET",
  url: "https://api-football-beta.p.rapidapi.com/leagues",
  headers: {
    "X-RapidAPI-Key": "e4619ea8d8msh4dbe6fbda4fa1fdp16420ejsn87b49c43813a",
    "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
  },
};

export const getLeagues = createAsyncThunk(
  "leagueList/getLeagues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const leagueSlice = createSlice({
  name: "leagueList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLeagues.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getLeagues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leagues = action.payload.response;
      })
      .addCase(getLeagues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leagueSlice.reducer;

export const selectAllLeagues = (state: any) => state.leagues.leagues;
export const getLeaguesError = (state: any) => state.leagues.error;
export const getLeaguesStatus = (state: any) => state.leagues.status;
