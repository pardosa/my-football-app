// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";

type TFixtures = components["schemas"]["Fixtures"];

const RapidAPIKEY = process.env.REACT_APP_XRapidAPIKey;
const RapidAPIHOST = process.env.REACT_APP_XRapidAPIHost;
const baseURL = openapi.servers[0].url;

export interface IFixturesState {
  fixtures: Array<TFixtures>;
  status: string;
  error?: string;
}

// initial state
const initialState: IFixturesState = {
  fixtures: [],
  status: "idle",
  error: "",
};

type IParams = {
  teamId?: number;
  leagueId?: number;
  season: number;
};

export const getFixtures = createAsyncThunk(
  "fixturesList/getFixtures",
  async ({ teamId, season }: IParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: baseURL + "/fixtures",
        params: { team: teamId, season: season },
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

const fixturesSlice = createSlice({
  name: "fixturesList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFixtures.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFixtures.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fixtures = action.payload.response;
      })
      .addCase(getFixtures.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fixturesSlice.reducer;

export const selectAllFixtures = (state: any) => state.fixtures.fixtures;
export const getFixturesError = (state: any) => state.fixtures.error;
export const getFixturesStatus = (state: any) => state.fixtures.status;
