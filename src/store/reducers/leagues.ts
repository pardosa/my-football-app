// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";

type TLeagues = components["schemas"]["Leagues"];

const RapidAPIKEY = process.env.REACT_APP_XRapidAPIKey;
const RapidAPIHOST = process.env.REACT_APP_XRapidAPIHost;
const baseURL = openapi.servers[0].url;
console.log(RapidAPIKEY);
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
  url: baseURL + "/leagues",
  headers: {
    "X-RapidAPI-Key": RapidAPIKEY,
    "X-RapidAPI-Host": RapidAPIHOST,
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
