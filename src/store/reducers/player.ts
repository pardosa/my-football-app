// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";

type TPlayer = components["schemas"]["Player"];

const RapidAPIKEY = process.env.REACT_APP_XRapidAPIKey;
const RapidAPIHOST = process.env.REACT_APP_XRapidAPIHost;
const baseURL = openapi.servers[0].url;

export interface IPlayerState {
  player: Array<TPlayer>;
  status: string;
  error?: string;
}

// initial state
const initialState: IPlayerState = {
  player: [],
  status: "idle",
  error: "",
};

type IParams = {
  id?: number;
  season?: number;
};

export const getPlayer = createAsyncThunk(
  "playerDetail/getPlayer",
  async ({ id, season }: IParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: baseURL + "/players",
        params: { id, season },
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

const playerDetailSlice = createSlice({
  name: "playerDetail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.player = action.payload.response;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default playerDetailSlice.reducer;

export const detailPlayer = (state: any) => state.player.player;
export const getPlayerError = (state: any) => state.player.error;
export const getPlayerStatus = (state: any) => state.player.status;
