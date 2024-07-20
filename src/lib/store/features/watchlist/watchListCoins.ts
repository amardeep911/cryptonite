import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WatchListCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

interface WatchListCoinsState {
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
      const coin = action.payload;
      if (!state.watchListCoins.find((c) => c.id === coin.id)) {
        state.watchListCoins.push(coin);
      }
    },
  },
});

export const { addWatchListCoin } = watchListSlice.actions;
export default watchListSlice.reducer;
