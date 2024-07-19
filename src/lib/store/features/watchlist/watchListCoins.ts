import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WatchListCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface WatchListCoinsState {
  watchListCoins: WatchListCoin[];
}

const initialState: WatchListCoinsState = {
  watchListCoins: [],
};

const watchListSlice = createSlice({
  name: "watchListCoin",
  initialState,
  reducers: {
    addWatchListCoin(state, action: PayloadAction<WatchListCoin>) {
      state.watchListCoins.push(action.payload);
    },
  },
});

export const { addWatchListCoin } = watchListSlice.actions;
export default watchListSlice.reducer;
