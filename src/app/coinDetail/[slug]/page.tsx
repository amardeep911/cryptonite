"use client";
import Coingraph from "@/components/CoinGraph/Coingraph";
import CoinInfo from "@/components/CoinInfo/CoinInfo";
import CoinPeformanceBar from "@/components/CoinPerformanceBar/CoinPeformanceBar";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const CoinDetail = ({ params }: Props) => {
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.slug}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoinData(data);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%,60%] gap-4 p-4">
      <div>
        <CoinInfo coinData={coinData} />

        <CoinPeformanceBar />
      </div>
      <div>
        <Coingraph id={params.slug} />
      </div>
    </div>
  );
};

export default CoinDetail;
