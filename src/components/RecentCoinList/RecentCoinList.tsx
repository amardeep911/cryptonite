import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { RootState, AppDispatch } from "@/lib/store/store";
import { addRecenetListCoin } from "@/lib/store/features/recentCoins/recentCoins";
import { useRouter } from "next/navigation";

type Props = {};

const RecentCoinList = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const recentCoins = useAppSelector(
    (state: RootState) => state.recentListCoin.RecentListCoins
  );
  console.log(recentCoins);
  return (
    <div className="p-4 border-2 rounded-lg shadow-lg overflow-x-auto bg-white">
      <h2 className="text-sm font-semibold mb-2">Recent Coin</h2>
      {recentCoins.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-center">No Recent visit</p>
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
              {recentCoins.slice(0, 5).map((coin: any) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    router.push(`/coinDetail/${coin.id}`, undefined)
                  }
                >
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
                    ${coin.current_price}
                  </td>
                  <td className="w-1/6 text-left py-3 px-4 text-xs">
                    {coin.price_change_percentage_24h}%
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

export default RecentCoinList;
