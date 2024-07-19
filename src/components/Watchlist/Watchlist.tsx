"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { AppDispatch, RootState } from "@/lib/store/store";
import { addWatchListCoin } from "@/lib/store/features/watchlist/watchListCoins";

type Props = {};

const Watchlist = (props: Props) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const WatchlistArray = useAppSelector(
    (state: RootState) => state.watchListCoin.watchListCoins
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const coinData = event.dataTransfer.getData("coin");
    const coin = JSON.parse(coinData);
    dispatch(addWatchListCoin(coin));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="p-4 border-2 rounded-lg shadow-lg overflow-x-auto bg-white"
    >
      <h2 className="text-sm font-semibold mb-2">Watchlist</h2>
      {WatchlistArray.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500 text-center">
            Drag and drop to add to your watchlist
          </p>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="border-b-2 border-r-black">
              <tr>
                <th className="w-1/4 text-left py-3 px-4 font-semibold text-xs">
                  Coin
                </th>
                <th className="w-1/4 text-left py-3 px-4 font-semibold text-xs">
                  Name
                </th>
                <th className="w-1/12 text-left py-3 px-4 font-semibold text-xs">
                  Last Price
                </th>
                <th className="w-1/6 text-left py-3 font-semibold text-xs">
                  24h Change
                </th>
              </tr>
            </thead>

            <tbody>
              {WatchlistArray.slice(0, 5).map((coin: any) => (
                <tr key={coin.id} className="hover:bg-gray-100">
                  <td className="w-1/4 text-left py-3 px-4 text-xs">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-5 h-5 rounded-full"
                    />
                  </td>
                  <td className="w-1/4 text-left py-3 px-4 text-xs">
                    {coin.name}
                  </td>
                  <td className="w-1/6 text-left py-3 px-4 text-xs">
                    ${coin.current_price.toFixed(2)}
                  </td>
                  <td className="w-1/6 text-left py-3 px-4 text-xs">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
