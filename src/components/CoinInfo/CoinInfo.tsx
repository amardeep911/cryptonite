import React from "react";

type Props = {
  coinData: any; // You might want to replace `any` with the specific type for `coinData` if available
  error: string | null;
};

const CoinInfo: React.FC<Props> = ({ coinData, error }) => {
  console.log(error);
  if (error) {
    return (
      <div className="flex flex-col h-fit justify-center items-center align-middle border-gray-400 sm:p-5 sm:border-r sm:m-5 m-1">
        <div className="text-center text-red-500">
          {error.includes("rate limit")
            ? "You've exceeded the API rate limit. Please wait a few minutes before trying again."
            : `Error: ${error}`}
        </div>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="flex flex-col h-fit justify-center items-center align-middle border-gray-400 sm:p-5 sm:border-r sm:m-5 m-1">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-fit justify-center items-center align-middle border-gray-400 sm:p-5 sm:border-r sm:m-5 m-1">
      <div className="flex flex-col justify-center items-center">
        <img
          src={coinData.image.large}
          alt={coinData.name}
          height="200"
          className="mb-20"
        />
        <h1 className="text-5xl text-yellow-500 font-semibold">
          {coinData.name}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-start gap-5 mt-5 p-5">
        <p>{coinData.description.en.split(". ")[0]}.</p>
        <p className="text-xl">Rank: {coinData.market_cap_rank}</p>
        <p className="text-xl">
          Current Price: ${coinData.market_data.current_price.usd}
        </p>
        <p className="text-xl">
          Market Cap: ${coinData.market_data.market_cap.usd}
        </p>
      </div>
    </div>
  );
};

export default CoinInfo;
