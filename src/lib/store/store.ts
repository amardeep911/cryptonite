import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./features/coins/coinSlice";
import watchLIstCoinReducer from "./features/watchlist/watchListCoins";
import recenetListCoinReducer from "./features/recentCoins/recentCoins";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coin: coinReducer,
      watchListCoin: watchLIstCoinReducer,
      recentListCoin: recenetListCoinReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
