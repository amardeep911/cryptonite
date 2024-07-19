import React from "react";

type Props = {};

const CoinInfo = ({ coinData }: any) => {
  console.log(coinData);
  return (
    <div className="flex flex-col h-full justify-center items-center align-middle  border-gray-400 p-5 border-l m-5">
      <div className="flex flex-col justify-center items-center">
        <img
          src={coinData.image.large}
          alt={coinData?.name}
          height="200"
          className="mb-20"
        />
        <h1 className="text-5xl text-yellow-500 font-semibold ">
          {coinData.name}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-start gap-5 mt-5 p-5">
        <p>{coinData?.description.en.split(". ")[0]}.</p>
        <p className="text-xl ">Rank: {coinData.market_cap_rank}</p>
        <p className="text-xl ">
          Current Price: ${coinData.market_data.current_price.usd}
        </p>
        <p className="text-xl ">
          Market Cap: ${coinData.market_data.market_cap.usd}
        </p>
      </div>
    </div>
  );
};

export default CoinInfo;
