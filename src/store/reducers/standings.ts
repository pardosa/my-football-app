// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";

type TStandings = components["schemas"]["Standings"];

const RapidAPIKEY = process.env.REACT_APP_XRapidAPIKey;
const RapidAPIHOST = process.env.REACT_APP_XRapidAPIHost;
const baseURL = openapi.servers[0].url;

export interface IStandingsState {
  standings: Array<TStandings>;
  status: string;
  error?: string;
}

// initial state
const initialState: IStandingsState = {
  standings: [],
  status: "idle",
  error: "",
};

type IParams = {
  teamId?: number;
  leagueId?: number;
  season: number;
};

export const getStandings = createAsyncThunk(
  "standingsList/getStandings",
  async ({ leagueId, season }: IParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: baseURL + "/standings",
        params: { league: leagueId, season: season },
        headers: {
          "X-RapidAPI-Key": RapidAPIKEY,
          "X-RapidAPI-Host": RapidAPIHOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const standingsSlice = createSlice({
  name: "standingsList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getStandings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getStandings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.standings = action.payload.response;
      })
      .addCase(getStandings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default standingsSlice.reducer;

export const selectAllStandings = (state: any) => state.standings.standings;
export const getStandingsError = (state: any) => state.standings.error;
export const getStandingsStatus = (state: any) => state.standings.status;
