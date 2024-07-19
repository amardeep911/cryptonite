"use client";
import CoinInfo from "@/components/CoinInfo/CoinInfo";
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-[60%,40%]">
      <div>Coin graph</div>
      <div>
        <CoinInfo coinData={coinData} />
      </div>
    </div>
  );
};

export default CoinDetail;
