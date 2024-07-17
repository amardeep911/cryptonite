import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

export interface CoinsState {
  coins: Coin[];
}

const initialState: CoinsState = {
  coins: [],
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    addCoin(state, action: PayloadAction<Coin>) {
      state.coins = [...state.coins, action.payload];
    },
  },
});

export const { addCoin } = coinSlice.actions;
export default coinSlice.reducer;
