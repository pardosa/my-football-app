// types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";

type TFixtures = components["schemas"]["Fixtures"];

const RapidAPIKEY = process.env.REACT_APP_XRapidAPIKey;
const RapidAPIHOST = process.env.REACT_APP_XRapidAPIHost;
const baseURL = openapi.servers[0].url;

export interface IFixtureState {
  fixture: Array<TFixtures>;
  status: string;
  error?: string;
}

// initial state
const initialState: IFixtureState = {
  fixture: [],
  status: "idle",
  error: "",
};

type IParams = {
  id?: number;
};

export const getFixture = createAsyncThunk(
  "fixtureDetail/getFixture",
  async ({ id }: IParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: baseURL + "/fixtures",
        params: { id: id },
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

const fixtureDetailSlice = createSlice({
  name: "fixtureDetail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFixture.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFixture.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fixture = action.payload.response;
      })
      .addCase(getFixture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fixtureDetailSlice.reducer;

export const detailFixture = (state: any) => state.fixture.fixture;
export const getFixtureError = (state: any) => state.fixture.error;
export const getFixtureStatus = (state: any) => state.fixture.status;
