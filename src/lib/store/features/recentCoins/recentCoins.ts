import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecentCoinList {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface RecentCoinListState {
  RecentListCoins: RecentCoinList[];
}

const initialState: RecentCoinListState = {
  RecentListCoins: [],
};

const watchListSlice = createSlice({
  name: "recentCoinList",
  initialState,
  reducers: {
    addRecenetListCoin(state, action: PayloadAction<RecentCoinList>) {
      const recentCoin = action.payload;
      if (!state.RecentListCoins.find((c) => c.id === recentCoin.id)) {
        state.RecentListCoins.push(recentCoin);
      }
    },
  },
});

export const { addRecenetListCoin } = watchListSlice.actions;
export default watchListSlice.reducer;
