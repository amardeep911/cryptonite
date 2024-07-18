"use client";
// CoinList.tsx

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { addCoin } from "@/lib/store/features/coins/coinSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { Coin } from "@/lib/store/features/coins/coinSlice";
import Pagination from "../Elements/Pagination"; // Import Pagination component

type Props = {};

const CoinList: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const coins = useAppSelector(
    (state: RootState) => state.coin.coins
  ) as Coin[];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pageNo, setPageNo] = useState(1);

  const Table_Head = [
    { label: "Name", className: "lg:w-1/4" },
    { label: "Symbol", className: "lg:w-1/6 hidden lg:table-cell" },
    { label: "Image", className: "lg:w-1/12 hidden lg:table-cell" },
    { label: "Current Price", className: "lg:w-1/6" },
    { label: "Market Cap", className: "lg:w-1/6 hidden lg:table-cell" },
    { label: "Market Cap Rank", className: "lg:w-1/12 hidden lg:table-cell" },
  ];

  const Table_Body = coins.map((coin: Coin) => {
    return [
      coin.name,
      coin.symbol,
      coin.image,
      coin.current_price.toFixed(2),
      `$${coin.market_cap.toLocaleString()}`,
      coin.market_cap_rank.toString(),
    ];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/coins?pageNo=${pageNo}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        dispatch(addCoin(result.coins));
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNo, dispatch]);

  if (loading) {
    // Skeleton loading UI
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              {Table_Head.map((head, index) => (
                <th
                  key={index}
                  className={`py-3 px-6 text-left ${head.className}`}
                >
                  {head.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {[...Array(5)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {Table_Head.map((_, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-3 px-6 text-left ${Table_Head[cellIndex].className}`}
                  >
                    <div className="animate-pulse flex space-x-4">
                      {cellIndex === 2 ? (
                        <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                      ) : (
                        <div className="rounded bg-gray-300 h-4 w-24"></div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Use Pagination component */}
        <Pagination pageNo={pageNo} setPageNo={setPageNo} />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            {Table_Head.map((head, index) => (
              <th
                key={index}
                className={`py-3 px-6 text-left ${head.className}`}
              >
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Table_Body.map((row, rowIndex) => (
            <tr
              draggable="true"
              key={rowIndex}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-3 px-6 text-left ${Table_Head[cellIndex].className}`}
                >
                  {cellIndex === 2 ? (
                    <img
                      src={cell}
                      alt={row[0]}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Use Pagination component */}
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
};

export default CoinList;
