"use client";
import Coingraph from "@/components/CoinGraph/Coingraph";
import CoinInfo from "@/components/CoinInfo/CoinInfo";
import CoinPerformanceBar from "@/components/CoinPerformanceBar/CoinPeformanceBar";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const CoinDetail = ({ params }: Props) => {
  const [coinData, setCoinData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch coin information
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.slug}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoinData(data);

        // Fetch historical data
        const historicalResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.slug}/market_chart?vs_currency=usd&days=365`
        );
        if (!historicalResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const historicalData = await historicalResponse.json();
        setHistoricalData(historicalData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!coinData || !historicalData) {
    return null;
  }

  // Extract price data
  const prices = historicalData.prices || [];
  const low24h = coinData.market_data?.low_24h?.usd || 0;
  const high24h = coinData.market_data?.high_24h?.usd || 0;

  // Calculate 52-week low and high
  const priceValues = prices.map((price: number[]) => price[1]);
  const low52w = Math.min(...priceValues);
  const high52w = Math.max(...priceValues);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%,60%] gap-4 p-4">
      <div>
        <CoinInfo coinData={coinData} />
      </div>
      <div className="flex flex-col justify-between">
        <Coingraph id={params.slug} />
        <CoinPerformanceBar
          low24h={low24h}
          high24h={high24h}
          low52w={low52w}
          high52w={high52w}
        />
      </div>
    </div>
  );
};

export default CoinDetail;
