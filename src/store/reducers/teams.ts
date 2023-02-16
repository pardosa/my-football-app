// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
type TTeams = components["schemas"]["Teams"];

export interface ITeamsState {
  teams: Array<TTeams>;
  status: string;
  error?: string;
}

// initial state
const initialState: ITeamsState = {
  teams: [],
  status: "idle",
  error: "",
};

type IParams = {
  teamId: number;
  season: number;
};

export const getTeams = createAsyncThunk(
  "teamList/getTeams",
  async ({ teamId, season }: IParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://api-football-beta.p.rapidapi.com/teams",
        params: { league: teamId, season: season },
        headers: {
          "X-RapidAPI-Key":
            "e4619ea8d8msh4dbe6fbda4fa1fdp16420ejsn87b49c43813a",
          "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const teamSlice = createSlice({
  name: "teamList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload.response;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;

export const selectAllTeams = (state: any) => state.teams.teams;
export const getTeamsError = (state: any) => state.teams.error;
export const getTeamsStatus = (state: any) => state.teams.status;
