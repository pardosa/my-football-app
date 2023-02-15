// types
import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  openItem?: Array<string>;
  openComponent?: string;
  drawerOpen?: boolean;
  componentDrawerOpen?: boolean;
}

export interface IAction {
  payload: IState;
}

// initial state
const initialState: IState = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state: IState, action: IAction) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state: IState, action: IAction) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state: IState, action: IAction) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state: IState, action: IAction) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
  },
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } =
  menu.actions;
